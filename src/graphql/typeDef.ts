
export const typeDefs = `#graphql
  type Property {
    id: ID!
    name: String
    title: String
    price: Int
    bedrooms: Int
    area: Float
    description: String
    images: [Image]
    propertyCategory: String
  }
  
  type Image {
    id: ID!
    url: String
    propertyId: Int
  }

  type Query {
    propertiesSearch(
      type: String,
      minPrice: Int,
      maxPrice: Int,
      bedrooms: Int,
      minArea: Float,
      maxArea: Float,
      skip: Int,
      take: Int
    ): PropertySearchResult
  }

  type PropertySearchResult {
    totalCount: Int!
    properties: [Property]
  }
`;
