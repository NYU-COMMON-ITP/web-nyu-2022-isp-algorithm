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

export async function updateProperty(userData) {
    console.log("Property: DB111:", userData)
    const pId= userData.property_id;
Object.keys(userData).forEach((key) => {
          delete userData["property_id"];
      });

    return prisma.properties.updateMany({
        where: {
            property_id: pId,
        },
        data:userData
    })
}

export async function updateSpace(userData) {
    console.log("Property: DB111:", userData)
    const sId= userData.space_id;


Object.keys(userData).forEach((key) => {
          delete userData["space_id"];
      });

    return prisma.spaces.updateMany({
        where: {
            space_id: sId,
        },
        data:userData
    })
}