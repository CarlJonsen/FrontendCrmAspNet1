import React from 'react'
import LoginForm from "../components/Auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card px-5 py-4 shadow rounded-4" style={{ maxWidth: "500px", width: "100%" }}>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
