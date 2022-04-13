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

export async function createProperty(userData) {
    return prisma.properties.create({
        data:{
            home_name : userData.home_name,
            property_id : userData.property_id,
            brand: userData.brand,
            city_name: userData.city_name,
            neighborhood: userData. neighborhood,
            timezone: userData. timezone,
            unit_count: userData.unit_count,
            rownum: userData.rownum
        }    
    })
}

export async function createSpace(userData) {
    return prisma.spaces.create({
 data:{   
        apartment_name   : userData.apartment_name,
        property_id      : userData.property_id,
        room_name        : userData.room_name, 
        occupancy_type   : userData.occupancy_type,
        security_deposit : userData.security_deposit,
        date_available   : userData.date_available,
        status           : userData.status,
        created_at       : userData.created_at,
        updated_at       : userData.updated_at,
        mo3_price        : userData.mo3_price,
        mo6_price        : userData.mo6_price,
        mo9_price        : userData.mo9_price,
        mo12_price       : userData.mo12_price,
        bedroom_count    : userData.bedroom_count,
        bath_count       : userData.bath_count,
        min_price        : userData.min_price,
        max_price        : userData.max_price
        }  
    })
}