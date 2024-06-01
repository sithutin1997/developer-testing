import Image from 'next/image';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

type Image = {
  id: string;
  url: string;
  propertyId: string;
}
export interface PropertyCardProps {
  image: Image[];
  title: string;
  name: string;
  price: number;
  bedrooms: number;
  area: number;
  description: string;
  category: string;
}

/**
 * responsive for carousel based on the breakpoint
 */
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const PropertyCard = ({title,name,image,price,bedrooms,area,description,category}: PropertyCardProps) => {
  return (
      <div className="bg-white rounded-lg shadow-md w-1/2 my-6">
        <div className="p-4 w-full">
          <h1 className="text-4xl  text-black font-bold mb-2">{name}</h1>
          <p className="text-gray-600 mb-2">{title}</p>
          <p className="text-gray-800 font-bold mb-2">$ {price}</p>
          <div className="flex items-center mb-2">
            <span className='text-gray-800'>{bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center mb-4">
            <span className='text-gray-800'>{area} sq ft</span>
          </div>
          <p className="text-gray-700 mb-4">
            {description}
          </p>
          <p className="text-gray-700 mb-4">
            {category}
          </p>
          <Carousel swipeable={true} draggable={true} infinite={true} responsive={responsive}>
            {
              image.map(img => {
                return (
                  <img
                  key={img.id}
                  className="object-cover mr-2"
                  src={img.url}
                  alt="property image"
                />
                )
              })
            }
          </Carousel>
        </div>
      </div>
  );
};

export default PropertyCard;
