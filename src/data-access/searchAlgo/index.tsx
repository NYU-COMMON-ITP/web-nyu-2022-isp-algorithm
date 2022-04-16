import prisma from "../prisma";
import { properties } from "../../data-access/searches";
export async function searchingAlgo(userSelection) {

  if (userSelection.variables.city_name != 'any') {
    const resData: properties[] = await prisma.properties.findMany({
      where: {
        city_name: userSelection.variables.city_name,
        spaces: {
          some: {
            AND:[
              {
                status: {
                contains: 'Available',
              }
              },
              {
                mo12_price: {
                  gt: 0,
                  lt: userSelection.variables.budget*userSelection.weight.price_factor!=0 ? userSelection.variables.budget:undefined,
                }
              },
            ]
          },
        },
      },
      include: {
        spaces: {
          where:{
            status: {
              contains: 'Available',
            }
          }
        },
      }
    })
    const propList = []
    for(const prop of resData){
        const spaceMap = new Map<Number, any[]>();
        for (const [key, space_value] of Object.entries(prop.spaces)) {
          if(space_value.status.includes("Available")){
            //time
          const timeMoveIn = new Date(userSelection.variables.move_in);
          const diffTime = Math.abs(Math.floor((timeMoveIn.getTime()-space_value.date_available.getTime())  / (1000 * 60 * 60 * 24)));
          //price
          let diffPrice = 0;
          if ( userSelection.variables.budget != null && userSelection.variables.budget != 0){
            diffPrice = Math.abs(space_value.mo12_price-userSelection.variables.budget);
          }
          //market
          const market_wf = Math.abs(Math.floor(parseInt(String(prop.wf_market))));
          //sum
          const sum = new Number(diffTime+diffPrice+market_wf);
          spaceMap.set(space_value.space_id,[space_value,[parseInt(String(sum)),diffPrice,diffTime,market_wf]]);
        };
      };
      //space排序
      const arrayObj = Array.from(spaceMap);
      arrayObj.sort(function(a,b){
        return b[1][1][0]-a[1][1][0]
      })
      const sortedSpaceMap = new Map(arrayObj.map(i=>[i[0],[i[1][0],i[1][1]]]))
      console.log(sortedSpaceMap)
    };
    return resData
  } else {
    return await prisma.properties.findMany()
  }
}