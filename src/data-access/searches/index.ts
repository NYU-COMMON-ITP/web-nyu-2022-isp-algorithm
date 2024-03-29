// Wrapper for prisma
// Doing this makes it easy to swap prisma with another orm or plain sql as long as
// you satisfy the interface
import prisma from "../prisma";
import { properties as _properties } from "@prisma/client";
import { spaces as _spaces } from "@prisma/client";

// Pass through types
// Doing this allows you to customize the type or even limit what keys you expose to consumers
// export type properties = _properties;
export type spaces = _spaces;
export type properties = {
// <<<<<<< with_distance
//     id: Number,
//     home_name: String,
//     property_id: String,
//     brand: String,
//     city_name: String,
//     neighborhood: String,
//     timezone: String,
//     unit_count: Number,
//     rownum: Number,
//     wf_distance?: Number,
//     wf_price?: Number,
//     wf_time?: Number,
//     wf_market?: Number,
//     longitude?: Number,
//     latitude?: Number,
//     spaces?: spaces[],
// }

// export async function getProperties() {
//     return await prisma.properties.findMany({
//         include: {
//             spaces: true,
//         },
//       }
//     );
//=======
  id: Number,
  home_name: String,
  property_id: String,
  brand: String,
  city_name: String,
  neighborhood: String,
  timezone: String,
  unit_count: Number,
  rownum: Number,
  wf_distance?: Number,
  wf_price?: Number,
  wf_time?: Number,
  wf_market?: Number,
  longitude?: Number,
  latitude?: Number,
  spaces?: spaces[],
//>>>>>>> main
}

export async function getPropertiesforManagt(userSelection) {
  const prop_id = (userSelection.variables.id != null && userSelection.variables.id != "") ? userSelection.variables.id : undefined;
  const home_name = (userSelection.variables.home_name != null && userSelection.variables.home_name != "") ? userSelection.variables.home_name : undefined;
  const space_status = userSelection.variables.space_status != "Any" ? userSelection.variables.space_status : undefined;

  const data = await prisma.properties.findMany({
    where: {
      AND: [
        { id: prop_id },
        {
          home_name: {
            contains: home_name
          }
        },
      ],
      // spaces: {
      //   some: {
      //     status: space_status,
      //   }
      // },
    },
    include: {
      spaces: {
        where: {
          status: space_status
        }
      }
    },
  });
  return data
}

export async function getSpacesforManagt(userSelection) {
  const space_id = (userSelection.variables.space_id != null && userSelection.variables.space_id != "") ? userSelection.variables.space_id : undefined;

  const data = await prisma.properties.findMany(
    {
      where: {
        spaces: {
          some: {
            space_id: space_id
          }
        }
      },
      include: {
        spaces: {
          where: {
            space_id: space_id
          }
        }
      }
    }
  );
  return data;
}

export async function getPropertiesbyCity(userSelection) {

  if (userSelection.city_name != "any") {
    const data = await prisma.properties.findMany({
      where: {
        city_name: userSelection.city_name
      }
    });
    return data;
  } else {
    return await prisma.properties.findMany();
  }
}

export async function getCities() {
  return prisma.properties.groupBy({
    by: ["city_name"],
    _sum: {
      id: true
    },
    orderBy: {
      "city_name": "asc"
    }
  });
}