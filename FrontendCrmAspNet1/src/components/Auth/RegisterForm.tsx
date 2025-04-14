import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import apiClient from '../../services/apiClient';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setIsLoading(false);
      setError("Lösenorden matchar inte!");
      return;
    }
    if (formData.password.length < 6) {
      setIsLoading(false);
      setError("Lösenordet måste vara minst 6 tecken långt.");
      return;
    }

    if (!formData.termsAccepted) {
      setIsLoading(false);
      setError("Du måste godkänna villkoren.");
      return;
    }

    try {
      await apiClient.post("/users", formData);
      
      setMessage("Kontot har skapats! Du skickas till login...");
      localStorage.setItem("registerSuccess", "true");
      setTimeout(() => {navigate("/login");}, 1500);
      } 
      catch
      {
      setError("Kunde inte skapa konto. E-post kan redan vara registrerad.");
      } 
      finally 
      {
       setIsLoading(false);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-center mb-5 subline" style={{ fontSize: "2rem", marginTop: "-5px" }}>Create Account</h3>

      <div className="mb-4">
        <label className="form-label subLine">First Name</label>
        <input type="text" name="firstname" className="form-control form-control-lg rounded-3" value={formData.firstname} onChange={handleChange} required placeholder="Enter your first name"/>
      </div>

      <div className="mb-4">
        <label className="form-label subLine">Last Name</label>
        <input type="text" name="lastname" className="form-control form-control-lg rounded-3" value={formData.lastname} onChange={handleChange} required placeholder="Enter your last name"/>
      </div>

      <div className="mb-4">
        <label className="form-label subLine">Email</label>
        <input type="email" name="email" className="form-control form-control-lg rounded-3" value={formData.email} onChange={handleChange} required placeholder="Enter your email address"/>
      </div>

      <div className="mb-4">
        <label className="form-label subLine">Password</label>
        <input type="password" name="password" className="form-control form-control-lg rounded-3" value={formData.password} onChange={handleChange} required placeholder="Enter your password"/>
      </div>

      <div className="mb-4">
        <label className="form-label subLine">Confirm Password</label>
        <input type="password" name="confirmPassword" className="form-control form-control-lg rounded-3" value={formData.confirmPassword} onChange={handleChange} required placeholder="Confirm your password"/>
      </div>

      <div className="form-check mb-4">
        <input type="checkbox" className="form-check-input" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
        <label className="form-check-label">
          I accept <a href="#">Terms and Conditions</a>
        </label>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Create Account
      </button>

      <div className="text-center mt-3 subLine">
        Already have an account? <a href="/login">Login</a>
      </div>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {isLoading && <div className="text-center my-3">Creating account...</div>}
      {isLoading && <div className="spinner" />}
    </form>
  )
}

export default RegisterForm
