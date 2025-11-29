import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true' && username) {
      setUser({ username });
      // Load orders from localStorage (in a real app, this would come from API)
      const savedOrders = localStorage.getItem(`orders_${username}`);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={`container py-5 ${darkMode ? 'text-white' : ''}`}>
      <div className="row">
        <div className="col-md-4">
          <div className={`card ${darkMode ? 'bg-dark border-secondary' : ''}`}>
            <div className="card-body text-center">
              <div className="mb-3">
                <div 
                  className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center"
                  style={{ width: '100px', height: '100px', fontSize: '2rem' }}
                >
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </div>
              <h4>{user.username}</h4>
              <p className="text-muted">{user.email || 'No email provided'}</p>
              <hr />
              <div className="text-start">
                <p><strong>Total Orders:</strong> {orders.length}</p>
                <p><strong>Member Since:</strong> {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className={`card ${darkMode ? 'bg-dark border-secondary' : ''}`}>
            <div className="card-header">
              <h5>Order History</h5>
            </div>
            <div className="card-body">
              {orders.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">No orders yet</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/products')}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="list-group">
                  {orders.map((order, index) => (
                    <div 
                      key={index}
                      className={`list-group-item ${darkMode ? 'bg-dark border-secondary' : ''}`}
                    >
                      <div className="d-flex justify-content-between">
                        <div>
                          <h6>Order #{order.id}</h6>
                          <p className="mb-0 text-muted">
                            {order.items.length} item(s) - ₹{order.total}
                          </p>
                          <small className="text-muted">
                            {new Date(order.date).toLocaleDateString()}
                          </small>
                        </div>
                        <span className="badge bg-success">Completed</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

