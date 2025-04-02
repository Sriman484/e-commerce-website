import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black p-4">
            <div className="container-fluid">
                <Link className="navbar-brand text-white" to="/"><h1>TrenzZ</h1></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 text-center">
                        <li className="nav-item">
                            <Link className="nav-link active text-white" to="/"><h5>Home</h5></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/products"><h5>Products</h5></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/cart"><h5>Cart</h5></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/help"><h5>Helpdesk</h5></Link>
                        </li>
                    </ul>
                </div>
                <div className="d-flex justify-content-center">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2 text-black border-white" type="search" placeholder="Search" />
                        <button className="btn btn-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
