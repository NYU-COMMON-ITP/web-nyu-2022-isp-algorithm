import prisma from "../prisma";

export async function searchingAlgo(userSelection) {

  if (userSelection.city_name != 'any') {
    const data = await prisma.properties.findMany({
      where: {
        city_name: userSelection.city_name,
        spaces: {
          some: {
            status: {
              contains: 'Vacant Ready',
            },
          },
        },
      },
      include: {
        spaces: true,
      }
    })
    console.log("result: ")
    console.log(data)
    return data
  } else {
    return await prisma.properties.findMany()
  }
}