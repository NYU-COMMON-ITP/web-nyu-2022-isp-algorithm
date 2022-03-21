// Wrapper for prisma
// Doing this makes it easy to swap prisma with another orm or plain sql as long as
// you satisfy the interface
import prisma from "../prisma";
import { spaces as _spaces } from "@prisma/client";
import { properties as _properties } from "@prisma/client";

// Pass through types
// Doing this allows you to customize the type or even limit what keys you expose to consumers
export type spaces = _spaces;
export type properties = _properties;

export async function getSpaces() {
  return await prisma.spaces.findMany();
}
export async function getProperties() {
  return await prisma.properties.findMany();
}

export async function getMenus() {
  // return await prisma.properties.findMany({
  // distinct: ['city_name'],
  // select: {
  //   city_name: true,
  // },
  // })

  // return await prisma.spaces.findMany({
  //   where: {
  //     occupancy_type: 'traditional',
  //   },
  // })

  const data = await prisma.properties.groupBy({
    by: ['city_name'],
    _sum: {
      id: true,
    },
  })
  // console.log(data)
  return data

}