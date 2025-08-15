import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    billingSameAsShipping: true,
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingCountry: ""
  });

  const [savedAddresses, setSavedAddresses] = useState([]);

  // Load saved addresses on mount
  useEffect(() => {
    const storedAddresses = JSON.parse(localStorage.getItem("savedAddresses")) || [];
    setSavedAddresses(storedAddresses);

    if (storedAddresses.length > 0) {
      // Auto-fill with default address
      setFormData((prev) => ({
        ...prev,
        ...storedAddresses[0]
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save shipping address to saved addresses
    const newAddress = {
      name: formData.name,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      country: formData.country,
      phone: formData.phone
    };

    const updatedAddresses = [...savedAddresses, newAddress];
    localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));

    // Save order
    const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...oldOrders, formData];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    navigate("/confirmation");
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 mx-auto rounded-4" style={{ maxWidth: "600px" }}>
        <div className="bg-primary text-white text-center rounded-top-4 py-4">
          <h2 className="h3 fw-bold mb-1">Secure Checkout</h2>
          <p className="mb-0 small opacity-75">Please fill in your details to complete your purchase</p>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {/* Shipping Address */}
            <h5 className="mb-3">Shipping Information</h5>

            <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="form-control mb-2" required />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="form-control mb-2" required />
            <input name="address" placeholder="Street Address" value={formData.address} onChange={handleChange} className="form-control mb-2" required />
            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="form-control mb-2" required />
            <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="form-control mb-2" required />
            <input name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} className="form-control mb-2" required />
            <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="form-control mb-2" required />
            <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="form-control mb-3" required />

            {/* Saved Addresses */}
            {savedAddresses.length > 0 && (
              <div className="mb-3">
                <label className="fw-semibold">Saved Addresses:</label>
                <select
                  className="form-select"
                  onChange={(e) => {
                    const selected = savedAddresses[e.target.value];
                    setFormData((prev) => ({ ...prev, ...selected }));
                  }}
                >
                  {savedAddresses.map((addr, i) => (
                    <option key={i} value={i}>
                      {addr.name} — {addr.address}, {addr.city}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Billing Address */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="billingSameAsShipping"
                name="billingSameAsShipping"
                checked={formData.billingSameAsShipping}
                onChange={handleChange}
              />
              <label htmlFor="billingSameAsShipping" className="form-check-label">
                Billing address same as shipping
              </label>
            </div>

            {!formData.billingSameAsShipping && (
              <>
                <h5 className="mb-3">Billing Information</h5>
                <input name="billingAddress" placeholder="Billing Address" value={formData.billingAddress} onChange={handleChange} className="form-control mb-2" />
                <input name="billingCity" placeholder="City" value={formData.billingCity} onChange={handleChange} className="form-control mb-2" />
                <input name="billingState" placeholder="State" value={formData.billingState} onChange={handleChange} className="form-control mb-2" />
                <input name="billingZip" placeholder="Zip Code" value={formData.billingZip} onChange={handleChange} className="form-control mb-2" />
                <input name="billingCountry" placeholder="Country" value={formData.billingCountry} onChange={handleChange} className="form-control mb-3" />
              </>
            )}

            <button type="submit" className="btn btn-success w-100 py-2 fw-bold rounded-3 shadow-sm">
              Place Secure Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
