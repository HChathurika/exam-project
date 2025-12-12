import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";

const EditCarPage = () => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ useField hook used for ONE field (make)
  const make = useField("text");

  // Other fields remain unchanged
  const [model, setModel] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [renter, setRenter] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const updateCar = async (car) => {
    try {
      const res = await fetch(`/api/cars/${car.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(car),
      });

      if (!res.ok) throw new Error("Failed to update car");
      return res.ok;
    } catch (error) {
      console.error("Error updating car:", error);
      return false;
    }
  };

  // Fetch car data
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/cars/${id}`);
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        setCar(data);

        // Initialize form fields
        make.onChange({ target: { value: data.make } });
        setModel(data.model);
        setIsAvailable(data.availability.isAvailable);
        setRenter(data.availability.renter || "");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  // Submit form
  const submitForm = async (e) => {
    e.preventDefault();

    const updatedCar = {
      id,
      make: make.value, // ✅ value from useField
      model,
      availability: {
        isAvailable,
        renter,
      },
    };

    const success = await updateCar(updatedCar);
    if (success) {
      navigate(`/cars/${id}`);
    }
  };

  const handleAvailabilityChange = (e) => {
    setIsAvailable(e.target.value === "Yes");
  };

  return (
    <div className="create">
      <h2>Update Car</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={submitForm}>
          <label>Car Make:</label>
          <input required {...make} />

          <label>Car Model:</label>
          <input
            type="text"
            required
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />

          <label>Availability:</label>
          <select
            value={isAvailable ? "Yes" : "No"}
            onChange={handleAvailabilityChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <label>Renter:</label>
          <input
            type="text"
            value={renter}
            onChange={(e) => setRenter(e.target.value)}
          />

          <button>Update Car</button>
        </form>
      )}
    </div>
  );
};

export default EditCarPage;
