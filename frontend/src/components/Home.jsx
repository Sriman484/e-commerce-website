import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 home">
      <div className="row align-items-center text-center">
        <div className="col-12 col-md-5 mb-4 mb-md-0">
          <img
            src="../../public/logo.png"
            alt="TrenzZ Logo"
            className="img-fluid"
          />
        </div>

        <div className="col-12 col-md-7">
          <p className="fs-5">
            At <strong>TrenzZ</strong>, we bring you the latest fashion trends
            with premium quality at unbeatable prices. Our collection includes
            stylish clothing, comfortable footwear, and trendy accessories to
            suit every occasion. Whether you're searching for casual wear,
            formal attire, or the perfect finishing touch, we have it all in one
            place. Explore our wide range of fashion essentials and upgrade your
            wardrobe effortlessly. Shop now at TrenzZ and stay ahead in style
            with the latest fashion trends!
          </p>
          <Link className="btn btn-success px-4 py-2 fs-5 mt-3" to="/products">
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;