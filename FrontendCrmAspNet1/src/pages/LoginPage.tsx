import LoginForm from "../components/Auth/LoginForm";
import alphaLogo from '/src/assets/Logo.svg';

const LoginPage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card px-5 py-4 shadow rounded-4" style={{ maxWidth: "500px", width: "100%" }}>
        <LoginForm />
      </div>
      <div className="mt-4 text-center">
        <h4 
        style={{
          fontSize:25, 
          fontWeight: "bold", 
          fontFamily: "'Comfortaa', sans-serif", 
          margin: 5 
          }}> 
          <img src={alphaLogo}/>
          alpha
        </h4>
        </div>
    </div>
  )
}

export default LoginPage
