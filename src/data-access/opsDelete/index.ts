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

export async function deleteProperty(userData) {
    return prisma.properties.deleteMany({
        where: {
            property_id: {
                contains: userData.property_id,
            },
        },
    })
}

export async function deleteSpaceByPropId(userData) {
    return prisma.spaces.deleteMany({
        where: {
            property_id: {
                contains: userData.property_id,
            },
        },
    })
}

export async function deleteSpace(userData) {
    return prisma.spaces.delete({
        where: {
            space_id: userData.space_id,
        },
})
}