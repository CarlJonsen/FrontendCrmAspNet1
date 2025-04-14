import RegisterForm from "../components/Auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card px-5 pt-5 pb-3 shadow rounded-5" style={{ width: "100%", maxWidth: "500px" }}>
        <RegisterForm />
      </div>
      <div className="mt-4 text-center">
      <h4 
      style={{
        fontSize:25, 
        fontWeight: "bold", 
        fontFamily: "'Comfortaa', sans-serif", 
        margin: 5 
        }}> 
        <img src="src/assets/Logo.svg"/>
        alpha
      </h4>
      </div>
    </div>
  )
}

export default RegisterPage
