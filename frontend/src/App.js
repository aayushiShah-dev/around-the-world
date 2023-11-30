import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllCountries from "./components/AllCountries/AllCountries";
import CountryInfo from "./components/Info/CountryInfo";

function App() {
  return (
    <>
      <header className="header">
        <div className="container">
          <h5>Explore the World</h5>
        </div>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<AllCountries />} />
          <Route path="/country/:countryName" element={<CountryInfo />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
