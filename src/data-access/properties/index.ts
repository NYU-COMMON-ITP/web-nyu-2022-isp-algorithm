// Wrapper for prisma
// Doing this makes it easy to swap prisma with another orm or plain sql as long as
// you satisfy the interface
import prisma from "../prisma";
import { properties as _properties } from "@prisma/client";

// Pass through types
// Doing this allows you to customize the type or even limit what keys you expose to consumers
export type properties = _properties;

export async function getProperties() {
  return await prisma.properties.findMany();
}

export async function getPropertiesbycity(city) {
  console.log("got here")
  console.log(city);
  if (city != 'undefined') {
    const data = await prisma.properties.findMany({
      where: {
        city_name: city,
      },
    })
    return data
  } else {
    return await prisma.properties.findMany()
  }
}