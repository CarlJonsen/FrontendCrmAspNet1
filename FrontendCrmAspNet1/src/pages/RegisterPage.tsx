import React from 'react'
import RegisterForm from "../components/Auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card px-5 pt-5 pb-3 shadow rounded-5" style={{ width: "100%", maxWidth: "500px" }}>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage
