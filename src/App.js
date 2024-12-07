import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./AppNavbar"; // Navbar Component
import Home from "./Home";       // Home Page Component
import Cart from "./Cart";       // Cart Page Component
import Detail from "./Detail";
import Checkout from "./Checkout";

function App() {
    return (
        <Router>
            {/* Navbar */}
            <AppNavbar />

            {/* Routes */}
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    {/* Route untuk Detail */}
                    <Route path="/detail/:id" element={<Detail />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
