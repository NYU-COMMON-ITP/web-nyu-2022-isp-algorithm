import prisma from "../prisma";
import { properties } from "../searches";

export async function searchingAlgo(userSelection) {
  let resData: properties[] = [];
  if (userSelection.variables.city_name != "any") {
    // if (userSelection.variables.term == "12Mon"){}
    // if (userSelection.variables.term == "9Mon"){}
    // if (userSelection.variables.term == "6Mon"){}
    // if (userSelection.variables.term == "3on"){}
    resData = await prisma.properties.findMany({
      where: {
        city_name: userSelection.variables.city_name,
        spaces: {
          some: {
            AND: [
              {
                status: {
                  contains: "(Available)",
                },
              },
              {
                mo12_price: {
                  gt: 0,

                  // lt: userSelection.variables.budget * userSelection.weight.price_factor != 0 ? userSelection.variables.budget : undefined
                },
              },
              {
                date_available: {
                  lt: new Date("3000-01-01"),
                },
              },
            ],
          },
        },
      },
      include: {
        spaces: {
          where: {
            AND: [
              {
                status: {
                  contains: "Available",
                },
              },
              {
                date_available: {
                  lt: new Date("3000-01-01"),
                },
              },
            ],
          },
        },
      },
    });
    const propList = [];
    let timeWeight = 1;
    let priceWeight = 1;


    for (const prop of resData) {
      const spaceMap = new Map<Number, any[]>();

      // for (const [key, space_value] of Object.entries(prop.spaces)) {
      for (const space_value of Array.from(prop.spaces)) {
        if (space_value.status.includes("Available")) {
          //time
          const timeMoveIn = new Date(userSelection.variables.move_in);
          let diffTime = Math.abs(
            Math.floor(
              (timeMoveIn.getTime() - space_value.date_available.getTime()) /
              (1000 * 60 * 60 * 24)
            )
          );

          //price
          let diffPrice = 0;
          if (
            userSelection.variables.budget != null &&
            userSelection.variables.budget != 0
          ) {
            diffPrice = Math.abs(
              space_value.mo12_price - userSelection.variables.budget
            );
          }

          //market
          const market_wf = Math.abs(
            Math.floor(parseInt(String(prop.wf_market)))
          );
          //sum
          const sum = new Number(
            diffTime * timeWeight + diffPrice * priceWeight + market_wf
          );
          spaceMap.set(space_value.space_id, [
            space_value,
            [parseInt(String(sum)), diffPrice, diffTime, market_wf],
          ]);
        }
      }

      //distance
      var lat1 = Math.abs(userSelection.variables.longitude);
      var lon1 = Math.abs(userSelection.variables.latitude);
      var lat2 = Math.abs(prop.latitude.valueOf());
      var lon2 = Math.abs(prop.longitude.valueOf());

      var R = 6371; // Radius of the earth in km
      var dLat = (lat2 - lat1) * (Math.PI / 180);  // deg2rad below
      var dLon = (lon2 - lon1) * (Math.PI / 180);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1) * (Math.PI / 180)) * Math.cos((lat2) * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var distance = (R * c / 1.6).toFixed(1); // Distance in km

      //space Sort
      const spaceSort = Array.from(spaceMap);
      spaceSort.sort(function (a, b) {
        return b[1][1][0] - a[1][1][0];
      });

      propList.push({
        id: prop.id,
        home_name: prop.home_name,
        property_id: prop.property_id,
        brand: prop.brand,
        city_name: prop.city_name,
        neighborhood: prop.neighborhood,
        timezone: prop.timezone,
        unit_count: prop.unit_count,
        rownum: prop.rownum,
        space_id: spaceSort[0][1][0].space_id,
        room_name: spaceSort[0][1][0].room_name,
        price: spaceSort[0][1][0].mo12_price,
        wf_distance: prop.wf_distance,
        wf_price: prop.wf_price,
        wf_time: prop.wf_time,
        wf_market: prop.wf_market,
        longitude: prop.longitude,
        latitude: prop.latitude,
        distance_values: distance,
        scores_sum: spaceSort[0][1][1][0],
        diff_price: spaceSort[0][1][1][1],
        diff_time: spaceSort[0][1][1][2],
        market_weight: spaceSort[0][1][1][3],
        space: [spaceSort[0][1][0]],
      });
    }

    // normalize Price
    const priceSort = Array.from(propList);
    priceSort.sort(function (a, b) {
      return b.diff_price - a.diff_price;
    });
    let total = 0;
    priceSort.forEach((element) => {
      total += element.diff_price;
    });
    let mean = total / Object.keys(priceSort).length;

    let totalSD = 0;
    priceSort.forEach((element) => {
      totalSD += Math.pow(element.diff_price - mean, 2);
    });
    let sd = Math.sqrt(totalSD / Object.keys(priceSort).length - 1);

    priceSort.forEach((element) => {
      element.diff_price = parseFloat(
        ((element.diff_price - mean) / sd).toFixed(3)
      );
    });

    // normalize Time
    const timeSort = Array.from(propList);
    timeSort.sort(function (a, b) {
      return b.diff_time - a.diff_time;
    });
    total = 0;
    timeSort.forEach((element) => {
      total += element.diff_time;
    });
    mean = total / Object.keys(timeSort).length;

    totalSD = 0;
    timeSort.forEach((element) => {
      totalSD += Math.pow(element.diff_time - mean, 2);
    });
    sd = Math.sqrt(totalSD / Object.keys(timeSort).length - 1);

    timeSort.forEach((element) => {
      element.diff_time = parseFloat(
        ((element.diff_time - mean) / sd).toFixed(3)
      );
    });

    propList.forEach((element) => {
      element.scores_sum = (100 - (element.diff_time * timeWeight + element.diff_price * priceWeight)).toFixed(3);
    });

    //prop 排序
    const propSort = Array.from(propList);
    propSort.sort(function (a, b) {
      return b.scores_sum - a.scores_sum;
    });

    console.log("Search condition :");
    // console.log(userSelection.variables);
    console.log("best result :");
    console.log(propSort);
    return propSort;
  } else {
    return await prisma.properties.findMany({
      include: {
        spaces: true,
      },
    });
  }
}
