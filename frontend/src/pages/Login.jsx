import useField from "../hooks/useField";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const email = useField("email");
  const password = useField("password");

  // ✅ unified auth hook for login
  const { authenticate, error, isLoading } = useAuth("/api/users/login");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const success = await authenticate({
      email: email.value,
      password: password.value,
    });

    if (success) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Login</h2>

      <form onSubmit={handleFormSubmit}>
        <label>Email address:</label>
        <input {...email} />

        <label>Password:</label>
        <input {...password} />

        <button disabled={isLoading}>Login</button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
