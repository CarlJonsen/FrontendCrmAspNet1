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

    if (formData.password.length < 6) {
      setError("Lösenordet måste vara minst 6 tecken.");
      setIsLoading(false);
      return;
    }

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
          <h2 className="text-center mb-4">Login</h2>

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control form-control-lg rounded-3"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control form-control-lg rounded-3"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>

          <p className="text-center mt-4 mb-0">
            Don’t have an account?{' '}
            <a href="/register" className="text-primary fw-semibold">
              Sign up
            </a>
          </p>
        </form>
     
  );
}

export default LoginForm
