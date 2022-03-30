// Wrapper for prisma
// Doing this makes it easy to swap prisma with another orm or plain sql as long as
// you satisfy the interface
import prisma from "../prisma";
import { properties as _properties } from "@prisma/client";
import { spaces as _spaces } from "@prisma/client";

// Pass through types
// Doing this allows you to customize the type or even limit what keys you expose to consumers
export type properties = _properties;
export type spaces = _spaces;

export async function getProperties() {
    return await prisma.properties.findMany();
}

export async function getPropertiesbyUserInput(userSelection) {
    console.log(userSelection);
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

export async function getPropertiesbyId(userSelection) {
    console.log(userSelection);
    if (userSelection.id != null || userSelection.id != '') {
        const data = await prisma.properties.findMany({
            where: {
                id: parseInt(userSelection.id),
            },
            include: {
                spaces: true,
            },
        })
        return data
    } else {
        return await prisma.properties.findMany()
    }
}

export async function getPropertiesbyName(userSelection) {
    console.log(userSelection);
    if (userSelection.city_name != 'any') {
        const data = await prisma.properties.findUnique({
            where: {
                id: userSelection.home_name,
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

export async function getSpacesbyId(userSelection) {
    console.log(userSelection);
    if (userSelection.city_name != 'any') {
        const data = await prisma.spaces.findUnique({
            where: {
                space_id: userSelection.space_id,
            },
        })
        console.log("result: ")
        console.log(data)
        return data
    } else {
        return await prisma.spaces.findMany()
    }
}

export async function getPropertiesbyCity(userSelection) {
    console.log(userSelection);

    if (userSelection.city_name != 'any') {
        const data = await prisma.properties.findMany({
            where: {
                city_name: userSelection.city_name,
            },
        })
        // console.log("result: ")
        // console.log(data)
        return data
    } else {
        return await prisma.properties.findMany()
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