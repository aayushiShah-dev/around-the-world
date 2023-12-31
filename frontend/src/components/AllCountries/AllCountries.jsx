import React, { useState, useEffect } from "react";
import SearchInput from "../Search/SearchInput";
import FilterCountry from "../Filter/FilterRegion";
import { Link } from "react-router-dom";

import pkg from "../../../package.json";

const proxy = pkg.proxy;

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getAllCountries = async () => {
    try {
      const res = await fetch(`${proxy}/api`);

      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      console.log(data);
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.log(error);
    }
  };

  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(`${proxy}/name/${countryName}`);

      if (!res.ok) throw new Error("No country found!");
      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByRegion = async (regionName) => {
    try {
      const res = await fetch(`${proxy}/region/${regionName}`);

      if (!res.ok) throw new Error("No such region found!");
      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(false);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <div className="all__country__wrapper">
      <div className="country__top">
        <div className="search">
          <SearchInput onSearch={getCountryByName} />
        </div>
        <div className="filter">
          <FilterCountry onSelect={getCountryByRegion} />
        </div>
      </div>
      <div className="country__bottom">
        {isLoading && !error && <h4>Loading.......</h4>}
        {error && !isLoading && <h4>{error}</h4>}

        {countries?.map((country) => (
          <Link to={`/country/${country.name.common}`}>
            <div className="country__card">
              <div className="country__img">
                <img src={country.flags.png} alt="" />
                <div class="layer">
                  <h3>{country.name.common}</h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCountries;
