import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCarPage = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [renter, setRenter] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const navigate = useNavigate();

  const addCar = async (newCar) => {
    try {
      console.log("Adding car:", newCar);
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCar),
      });
      if (!res.ok) {
        throw new Error("Failed to add car");
      }
      return true;
    } catch (error) {
      console.error("Error adding car:", error);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const newCar = {
      make,
      model,
      availability: {
        isAvailable,
        renter,
      },
    };

    const success = await addCar(newCar);
    if (success) {
      console.log("Car Added Successfully");
      navigate("/");
    } else {
      console.error("Failed to add the car");
    }
  };

  const handleAvailabilityChange = (e) => {
    setIsAvailable(e.target.value === "Yes");
  };

  return (
    <div className="create">
      <h2>Add a New Car</h2>
      <form onSubmit={submitForm}>
        <label>Car Make:</label>
        <input
          type="text"
          required
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
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
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCarPage;
