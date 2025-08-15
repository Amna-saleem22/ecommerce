import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    confirmEmail: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    username: '',
    dateOfBirth: '',
    verificationCode: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationField, setShowVerificationField] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';

    if (!validateEmail(formData.email))
      newErrors.email = 'Please enter a valid email address';

    if (formData.email !== formData.confirmEmail)
      newErrors.confirmEmail = 'Emails do not match';

    if (!validatePassword(formData.password))
      newErrors.password =
        'Password must be at least 8 characters with uppercase, lowercase, and a number';

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate()))
        age--;

      if (age < 13) newErrors.dateOfBirth = 'You must be at least 13 years old';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendVerificationEmail = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    alert(
      `In a real app, a verification code would be sent to ${formData.email}. For demo purposes, use: ${code}`
    );
    setShowVerificationField(true);
  };

  const verifyEmailCode = () => {
    if (verificationCode && verificationCode === formData.verificationCode) {
      setEmailVerified(true);
      return true;
    }
    setErrors({ ...errors, verificationCode: 'Invalid verification code' });
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!emailVerified) {
      if (!showVerificationField) {
        sendVerificationEmail();
      } else {
        verifyEmailCode();
      }
      return;
    }

    setIsSubmitting(true);

    // Save user in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      username: formData.username,
      dateOfBirth: formData.dateOfBirth
    };

    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

    setTimeout(() => {
      setIsSubmitting(false);
      alert('Registration successful! Redirecting to login...');
      navigate('/');
    }, 1500);
  };

  return (
    <div className="registration-container">
      <h2 className="text-center fw-bold fw-italic">Create Your Account</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        {/* Full Name */}
        <div className="form-group">
          <label>Full Name*</label>
          <input name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <span>{errors.fullName}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email*</label>
          <input name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>}
        </div>

        {/* Confirm Email */}
        <div className="form-group">
          <label>Confirm Email*</label>
          <input name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} />
          {errors.confirmEmail && <span>{errors.confirmEmail}</span>}
        </div>

        {/* Verification */}
        {showVerificationField && !emailVerified && (
          <div className="form-group">
            <label>Verification Code*</label>
            <input
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleChange}
            />
            <button type="button" onClick={sendVerificationEmail}>
              Resend Code
            </button>
            {errors.verificationCode && <span>{errors.verificationCode}</span>}
          </div>
        )}

        {/* Phone Number */}
        <div className="form-group">
          <label>Phone Number</label>
          <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password*</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <span>{errors.password}</span>}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label>Confirm Password*</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        </div>

        {/* Username */}
        <div className="form-group">
          <label>Username</label>
          <input name="username" value={formData.username} onChange={handleChange} />
        </div>

        {/* DOB */}
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
          {errors.dateOfBirth && <span>{errors.dateOfBirth}</span>}
        </div>

        {/* Actions */}
        <div className="form-actions">
          {emailVerified ? (
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Complete Registration'}
            </button>
          ) : showVerificationField ? (
            <button type="button" onClick={verifyEmailCode}>
              Verify Email
            </button>
          ) : (
            <button type="submit">Send Verification Code</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUp;






