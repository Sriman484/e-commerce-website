import React from 'react';

function Footer() {
    return (
        <div className="bg-black text-white p-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>TrenzZ</h5>
                        <p>Your one-stop shop for the latest trends & best deals.</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white text-decoration-none">Home</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Shop</a></li>
                            <li><a href="#" className="text-white text-decoration-none">About Us</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Support</h5>
                        <ul className="list-unstyled">
                            <li>Email: trenzz@gmail.com</li>
                            <li>Phone: +91 9080345678</li>
                            <li>Address: Poonamalle-Avadi main road, Thiruverkadu, Chennai - 600077</li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p className="mb-0">&copy; 2025 TrendzZ. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
