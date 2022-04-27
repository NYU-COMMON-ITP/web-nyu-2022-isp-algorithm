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

                  contains: "(Available)"
                }
              },
              {
                mo12_price: {
                  gt: 0,
                  
                  // lt: userSelection.variables.budget * userSelection.weight.price_factor != 0 ? userSelection.variables.budget : undefined

                }
              },
              {
                date_available:{
                  lt: new Date("3000-01-01")
                }
              }
            ]
          }
        }
      },
      include: {
        spaces: {
          where: {
            AND: [
              {
                status: {
                  contains: "Available"
                }
            },
              {
                date_available:{
                  lt: new Date("3000-01-01")
                }
              }
            ]
          }
        }
      }
    });
    const propList = [];
    for (const prop of resData) {
      const spaceMap = new Map<Number, any[]>();
      // for (const [key, space_value] of Object.entries(prop.spaces)) {
      for (const space_value of Array.from(prop.spaces)) {
        if (space_value.status.includes("Available")) {
          //time
          const timeMoveIn = new Date(userSelection.variables.move_in);
          let diffTime = Math.abs(Math.floor((timeMoveIn.getTime() - space_value.date_available.getTime()) / (1000 * 60 * 60 * 24)));
          if (diffTime > 500) {
            diffTime = 500;
          }
          
          //price
          let diffPrice = 0;
          if (userSelection.variables.budget != null && userSelection.variables.budget != 0) {
            diffPrice = Math.abs(space_value.mo12_price - userSelection.variables.budget);
          }
          //market
          const market_wf = Math.abs(Math.floor(parseInt(String(prop.wf_market))));
          //sum
          const sum = new Number(diffTime + diffPrice + market_wf);
          spaceMap.set(space_value.space_id, [space_value, [parseInt(String(sum)), diffPrice, diffTime, market_wf]]);
        }
      }
      //space排序
      const spaceSort = Array.from(spaceMap);

      spaceSort.sort(function(a, b) {
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
        // distance_values: spaceSort[0][1][1][X],
        diff_price: spaceSort[0][1][1][1],
        diff_time: spaceSort[0][1][1][2],
        market_weight: spaceSort[0][1][1][3],
        scores_sum: spaceSort[0][1][1][0],
        space: [spaceSort[0][1][0]]
      });
    }
    //prop 排序
    const propSort = Array.from(propList);

    propSort.sort(function(a, b) {
      return b.scores_sum - a.scores_sum;
    });
    console.log("Search condition :");
    console.log(userSelection.variables);
    console.log("best result :");
    console.log(propSort);
    return propSort;
  } else {
    return await prisma.properties.findMany({
        include: {
          spaces: true
        }
      }

    );
  }
}