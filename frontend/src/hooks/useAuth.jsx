import { useState } from "react";

export default function useAuth(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authenticate = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let result = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        setError(result?.error || "Authentication failed");
        setIsLoading(false);
        return false;
      }

      // Save user on success (login or signup)
      localStorage.setItem("user", JSON.stringify(result));
      setIsLoading(false);
      return true;
    } catch (err) {
      setError("Network error. Please try again.");
      setIsLoading(false);
      return false;
    }
  };

  return { authenticate, isLoading, error };
}
