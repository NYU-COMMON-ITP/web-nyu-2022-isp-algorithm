// Wrapper for prisma
// Doing this makes it easy to swap prisma with another orm or plain sql as long as
// you satisfy the interface
import prisma from "../prisma";
import { spaces as _spaces } from "@prisma/client";

// Pass through types
// Doing this allows you to customize the type or even limit what keys you expose to consumers
export type spaces = _spaces;

export async function getSpaces() {
  return await prisma.spaces.findMany();
}