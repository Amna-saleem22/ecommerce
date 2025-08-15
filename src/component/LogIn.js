
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};
    if (!validateEmail(loginData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setLoginError('');

    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const user = storedUsers.find(u => u.email === loginData.email);

      if (!user) {
        setLoginError('Account not found');
        setIsSubmitting(false);
        return;
      }

      if (user.password !== loginData.password) {
        setLoginError('Invalid email or password');
        setIsSubmitting(false);
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/');
    }, 1000);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        
        {/* Left Side - Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
          <div className="card shadow-lg p-4 w-75 rounded-4">
            <h2 className="text-center mb-4">Welcome Back</h2>
            {loginError && <div className="alert alert-danger">{loginError}</div>}
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password*</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Enter your password"
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              {/* Actions */}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </div>

              <div className="text-end mt-2">
                <a href="/forgot-password" className="text-decoration-none">Forgot password?</a>
              </div>

              <div className="text-center mt-3">
                Don't have an account? <a href="/signup" className="text-decoration-none">Sign up</a>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Image */}
        { <div className="col-md-6 d-none d-md-block p-0">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
            alt="Login Visual"
            className="w-100 h-100 object-fit-cover"
          />
        </div> }
      </div>
    </div>
  );
};

export default Login;
