// Wrapper for prisma
// Doing this makes it easy to swap prisma with another orm or plain sql as long as
// you satisfy the interface
import prisma from "../prisma";

export async function getCities() {
    return await prisma.properties.groupBy({
        by: ['city_name'],
        _sum: {
            id: true,
        },
        orderBy: {
            'city_name': 'asc',
        }
    })
}