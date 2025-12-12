import useField from "../hooks/useField";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const name = useField("text");
  const email = useField("email");
  const password = useField("password");

  // ✅ unified auth hook for signup
  const { authenticate, error, isLoading } = useAuth("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const success = await authenticate({
      name: name.value,
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
      <h2>Sign Up</h2>

      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} />

        <label>Email address:</label>
        <input {...email} />

        <label>Password:</label>
        <input {...password} />

        <button disabled={isLoading}>Sign up</button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
