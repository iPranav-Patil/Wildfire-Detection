import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./pages/Map";

const AppRouter  = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter ;
