import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';

const LoginForm = () => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await apiClient.post("/auth/login", formData);
      const token = response.data.token;

      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch{
      setError("Fel e-post eller lösenord.");
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-center mb-4">Login</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="mb-4">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control form-control-lg rounded-3"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          className="form-control form-control-lg rounded-3"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>

      <p className="text-center mt-3"> 
          Don’t have an account?{" "}
        <a href="/register" style={{ color: "#007bff", cursor: "pointer" }}>
          Sign up
        </a>
      </p>
      {error && (
    <div className="alert alert-danger text-center">{error}</div>)}
    {isLoading && <div className="spinner" />}
    </form>
  )
}

export default LoginForm
