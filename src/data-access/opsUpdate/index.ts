// Wrapper for prisma
// Doing this makes it easy to swap prisma with another orm or plain sql as long as
// you satisfy the interface
import prisma from "../prisma";
import { properties as _properties } from "@prisma/client";
import { spaces as _spaces } from "@prisma/client";
import UserSearchField from "../../components/UserSearch";

// Pass through types
// Doing this allows you to customize the type or even limit what keys you expose to consumers
export type properties = _properties;
export type spaces = _spaces;


// const updateUser = await prisma.user.update({
//   where: {
//     email: 'viola@prisma.io',
//   },
//   data: {
//     name: 'Viola the Magnificent',
//   },
// })

export async function updateProperty(userData) {
    console.log("Property: DB:", userData)
    // send non null params
    return prisma.properties.deleteMany({
        where: {
            property_id: {
                contains: userData.property_id,
            },
        },
    })
}

export async function updateSpace(userData) {
    console.log("Space: DB:", userData)
    // send non null params
    return prisma.spaces.delete({
        where: {
            space_id: userData.space_id,
        },
})
}