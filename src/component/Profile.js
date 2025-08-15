
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [preview, setPreview] = useState(currentUser?.profileImage || "");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      // Save profile image in localStorage so it stays after refresh
      const updatedUser = { ...currentUser, profileImage: imageUrl };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login"); // redirect to login page
  };

  if (!currentUser) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning text-center">
          Please login to see your profile.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h1 className="h4 mb-0">Profile</h1>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-danger"
              >
                Sign Out
              </button>
            </div>

            <div className="card-body">
              <div className="text-center mb-4">
                <img
                  src={preview || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="img-thumbnail rounded-circle mb-3"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />

                <div className="d-flex justify-content-center">
                  <div className="btn btn-primary btn-sm">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="d-none"
                      id="profileUpload"
                    />
                    <label htmlFor="profileUpload" className="mb-0 cursor-pointer">
                      Change Photo
                    </label>
                  </div>
                </div>
              </div>

              <div className="list-group">
                <div className="list-group-item d-flex justify-content-between">
                  <strong>Name:</strong>
                  <span>{currentUser.fullName}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between">
                  <strong>Email:</strong>
                  <span>{currentUser.email}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between">
                  <strong>Phone Number:</strong>
                  <span>{currentUser.phoneNumber}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between">
                  <strong>Username:</strong>
                  <span>{currentUser.username}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between">
                  <strong>Date of Birth:</strong>
                  <span>{currentUser.dateOfBirth}</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <button className="btn btn-outline-primary me-2">
                  Edit Profile
                </button>
                <button className="btn btn-outline-secondary">
                  Change Password
                </button>
              </div>
              <Link to="/" className="btn btn-outline-warning mt-3">
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
