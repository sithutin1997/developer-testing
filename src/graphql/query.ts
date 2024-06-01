import { gql } from '@apollo/client';

/**
 * To use it in the useQuery for fetching properties data
 */
export const GET_PROPERTIES = gql`
query PropertiesSearch(
  $type: String
  $minPrice: Int
  $maxPrice: Int
  $bedrooms: Int
  $minArea: Float
  $maxArea: Float
  $skip: Int
  $take: Int
) {
  propertiesSearch(
    type: $type
    minPrice: $minPrice
    maxPrice: $maxPrice
    bedrooms: $bedrooms
    minArea: $minArea
    maxArea: $maxArea
    skip: $skip
    take: $take
  ) {
    properties {
      id
      name
      title
      price
      bedrooms
      area
      description
      images {
        id
        url
        propertyId
      }
      propertyCategory
    }
    totalCount
  }
}
`