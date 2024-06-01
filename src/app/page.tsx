"use client"

import PropertyCard from "@/components/PropertyCard";
import { useQuery } from "@apollo/client";
import { GET_PROPERTIES } from "@/graphql/query";
import client from "./lib/graphql/apollo-client";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { PropertyArgs } from "@/graphql/types/PropertyArgs";

export default function Home() {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [filterArgs, setFilterArgs] = useState({});

  const handleSearch = (filterArgs: PropertyArgs) => {
    setFilterArgs(filterArgs);
  }
  /**
   * Fetching data using useQuery hook for graphql
   */
  const { data, loading, error } = useQuery(
    GET_PROPERTIES,
    {
      client,
      variables : {
        ...filterArgs,
        skip,
        take,
      }
    }
  );

  if (loading) {
    return (<div>Loading...</div>);
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <main className="flex flex-col items-center justify-between">
      <SearchBar onSearch={handleSearch} />
      {
        data?.propertiesSearch?.properties?.map((e: any) => {
          return (
            <PropertyCard 
              key={e.id}
              title={e.title} 
              name={e.name} 
              price={e.price} 
              bedrooms={e.bedrooms} 
              area={e.area} 
              description={e.description}
              category={e.propertyCategory}
              image={e.images} />
        )
        })
      }
      {/* div for pagination */}
      <div className="flex justify-center mt-4">
        <div className="mb-6">
          <select
            className="px-4 py-2 mr-2 bg-gray-200 rounded"
            value={take}
            onChange={(e) => setTake(parseInt(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <select
            className="px-4 py-2 mr-2 bg-gray-200 rounded"
            value={Math.floor(skip / take) + 1}
            onChange={(e) => setSkip((parseInt(e.target.value) - 1) * take)}
          >
            {Array.from(Array(Math.ceil(data?.propertiesSearch?.totalCount / take)), (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <button
            className="px-4 py-2 mr-2 bg-gray-200 rounded"
            onClick={() => setSkip(skip - take)}
            disabled={skip === 0}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setSkip(skip + take)}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
