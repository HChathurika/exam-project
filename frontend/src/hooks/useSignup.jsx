import { useState } from "react";

export default function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (object) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      });

      let user = null;
      try {
        user = await response.json();
      } catch (e) {
        user = null;
      }

      // ✅ handle duplicate email / backend errors safely
      if (!response.ok) {
        const message =
          user?.error ||
          user?.message ||
          "Email already in use";

        setError(message);
        setIsLoading(false);
        return;
      }

      // ✅ success
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false);

    } catch (err) {
      // ✅ network or unexpected error
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
}
