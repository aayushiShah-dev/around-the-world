import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import pkg from "../../../package.json";

const proxy = pkg.proxy;
const CountryInfo = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { countryName } = useParams();

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`${proxy}/name/${countryName}`);

        if (!res.ok) throw new Error("Country Not found!");
        const data = await res.json();
        setCountry(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, [countryName]);

  return (
    <div className="country__info__wrapper">
      <button>
        <Link to="/"> Back</Link>
      </button>
      {isLoading && !error && <h4>Loading......</h4>}
      {error && !isLoading && error}
      {country?.map((country, index) => (
        <div className="country__info__container" key={index}>
          <div className="country__info-img">
            <img src={country.flags.png} alt="" />
          </div>
          <div className="country__info">
            <h3>{country.name.common}</h3>
            <div className="country__info-left">
              <h5>
                Native Name: <span>{country.name.official}</span>
              </h5>
              <h5>
                Area: <span>{country.area} square kilometres</span>
              </h5>
              <h5>
                Population:{" "}
                <span>
                  {new Intl.NumberFormat().format(country.population)}
                </span>
              </h5>
              <h5>
                Capital: <span>{country.capital}</span>
              </h5>
              <h5>
                Region: <span>{country.region}</span>
              </h5>
              <h5>
                Sub Region: <span>{country.subregion}</span>
              </h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryInfo;
