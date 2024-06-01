import React, { useState } from 'react';
import { PropertyType } from '../graphql/types/PropertyArgs';

const SearchBar = ({onSearch}: {onSearch: any}) => {
  const [type, setType] = useState<PropertyType | ''>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [minArea, setMinArea] = useState<number>(0);
  const [maxArea, setMaxArea] = useState<number>(0);
  const [bedrooms, setBedrooms] = useState<number>(0);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value as PropertyType);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(parseInt(event.target.value));
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(parseInt(event.target.value));
  };

  const handleMinAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinArea(parseFloat(event.target.value));
  };

  const handleMaxAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxArea(parseFloat(event.target.value));
  };

  const handleBedroomsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBedrooms(parseInt(event.target.value));
  };

  const getFilterArgs = () => {
    const filterArgs: any = {};

    if (type) {
      filterArgs.type = type;
    }
    if (minPrice) {
      filterArgs.minPrice = minPrice;
    }
    if(maxPrice) {
      filterArgs.maxPrice = maxPrice;
    }
    if(bedrooms) {
      filterArgs.bedrooms = bedrooms;
    }
    if(minArea) {
      filterArgs.minArea = minArea;
    }
    if(maxArea) {
      filterArgs.maxArea = maxArea;
    }

    return filterArgs;
  }

  const handleSearch = (e: any) => {
    e.preventDefault();
    const filterArgs = getFilterArgs();
    onSearch(filterArgs);
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-md">
      <div className="flex items-center">
        <label htmlFor="type" className="mr-2 font-semibold">
          Type:
        </label>
        <select
          id="type"
          value={type}
          onChange={handleTypeChange}
          className="px-2 py-1 border border-gray-300 rounded"
        >
          <option value="">All</option>
          <option value={PropertyType.SALE}>Sale</option>
          <option value={PropertyType.RENT}>Rent</option>
        </select>
      </div>

      <div className="flex items-center">
        <label htmlFor="minPrice" className="mr-2 font-semibold">
          Min Price:
        </label>
        <input
          id="minPrice"
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="px-2 py-1 border border-gray-300 rounded"
        />
      </div>

      <div className="flex items-center">
        <label htmlFor="maxPrice" className="mr-2 font-semibold">
          Max Price:
        </label>
        <input
          id="maxPrice"
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="px-2 py-1 border border-gray-300 rounded"
        />
      </div>

      <div className="flex items-center">
        <label htmlFor="minArea" className="mr-2 font-semibold">
          Min Area:
        </label>
        <input
          id="minArea"
          type="number"
          step="0.01"
          value={minArea}
          onChange={handleMinAreaChange}
          className="px-2 py-1 border border-gray-300 rounded"
        />
      </div>

      <div className="flex items-center">
        <label htmlFor="maxArea" className="mr-2 font-semibold">
          Max Area:
        </label>
        <input
          id="maxArea"
          type="number"
          step="0.01"
          value={maxArea}
          onChange={handleMaxAreaChange}
          className="px-2 py-1 border border-gray-300 rounded"
        />
      </div>

      <div className="flex items-center">
        <label htmlFor="bedrooms" className="mr-2 font-semibold">
          Bedrooms:
        </label>
        <input
          id="bedrooms"
          type="number"
          value={bedrooms}
          onChange={handleBedroomsChange}
          className="px-2 py-1 border border-gray-300 rounded"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSearch}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
