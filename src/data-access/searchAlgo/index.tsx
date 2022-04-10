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
        spaces: true,
      }
    })
    console.log("result: ")
    // console.log(data)
    return data
  } else {
    return await prisma.properties.findMany()
  }
}