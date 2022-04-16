import prisma from "../prisma";

export async function searchingAlgo(userSelection) {

  if (userSelection.variables.city_name != 'any') {
    console.log(userSelection.variables.budget)
    const data = await prisma.properties.findMany({
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
        // spaces: true,
      }
    })
    console.log("result: ")
    // var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24)); //gives day difference
    console.log(data)
    // console.log(userSelection.variables.move_in)
    return data
  } else {
    return await prisma.properties.findMany()
  }
}