// Wrapper for prisma
// Doing this makes it easy to swap prisma with another orm or plain sql as long as
// you satisfy the interface
import prisma from "../prisma";
import { properties as _Properties } from "@prisma/client";

// Pass through types
// Doing this allows you to customize the type or even limit what keys you expose to consumers
export type properties = _properties;

export async function getProperties() {
    return await prisma.properties.findMany();
}

export async function getPropertiesbycity(userSelection) {
    console.log(userSelection);

    if (userSelection.city_name != 'any') {
        const data = await prisma.properties.findMany({
            select: {
                city_name: userSelection.city_name,
                spaces: {
                    select: {
                        status: 'Vacant Ready(Available)',
                    },
                },
            },
            // where: {
            //     city_name: userSelection.city_name,
            // },
        })
        console.log("result: ")
        console.log(data)
        return data
    } else {
        return await prisma.Properties.findMany()
    }
}

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