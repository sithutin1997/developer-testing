import prisma from "@/app/lib/prisma";
import { PropertyArgs } from "./types/PropertyArgs";

export const resolvers = {
  Query: {
    /**
     * Searches for properties based on the provided filter arguments.
     *
     * @returns An object containing the total count of matching properties and the properties themselves.
     */
    propertiesSearch: async (_: any, propertyArgs: PropertyArgs) => {
      const {
        type,
        minPrice = 0,
        maxPrice,
        bedrooms,
        minArea = 0,
        maxArea,
        skip = 0,
        take = 10,
      } = propertyArgs;

      /**
       * whereClause for prisma query based on the filter value
       */
      const whereClause: any = {
        price: {
          gte: minPrice,
        },
        area: {
          gte: minArea,
        },
      }
      /**
       * to prevent the undefined or null value error in prisma query
       */
      if (type) whereClause.propertyCategory = { equals: type };
      if (bedrooms !== undefined) whereClause.bedrooms = bedrooms;
      if (maxPrice) whereClause.price.lte = maxPrice;
      if (maxArea) whereClause.area.lte = maxArea;

      /**
       * totalCount is for number of records for pagination
       */
      const totalCount = await prisma.property.count({
        where: whereClause,
      });

      const properties = await prisma.property.findMany({
        where: whereClause,
        include: {
          images: true,
        },
        skip,
        take,
      })
      return { totalCount, properties };
    },
  },
};