import dynamic from "next/dynamic";

const Hero = dynamic(() => import("../components/Hero"));
const SearchBar = dynamic(() => import("../components/SearchBar"));
const CustomFilter = dynamic(() => import("../components/CustomFilter"));
const CarCard = dynamic(() => import("../components/CarCard"));
const ShowMore = dynamic(() => import("../components/ShowMore"));
import { fuels, yearsOfProduction } from "@/constants";
import { HomeProps } from "@/types";
import { fetchCars } from "@/utils";
import Image from "next/image";

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className="overflow-hidden bg-[#041C32]">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home_text-container">
          <h1 className="text-4xl font-extrabold text-gray-200">
            Car Catalogue
          </h1>
          <p className="text-gray-300">Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, index) => (
                <CarCard car={car} key={index} />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div>
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
