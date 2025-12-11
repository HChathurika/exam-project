import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CarPage = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const deleteCar = async (id) => {
    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to delete car: ${errorText}`);
      }
      console.log("Car deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/cars/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const onDeleteClick = (carId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this " + carId
    );
    if (!confirm) return;

    deleteCar(carId);
  };

  return (
    <div className="car-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{car.make} {car.model}</h2>
          <p>Make: {car.make}</p>
          <p>Model: {car.model}</p>
          <p>Availability: {car && car.availability ? (car.availability.isAvailable ? 'Yes' : 'No') : 'Unknown'}</p>
          <p>Renter: {car.availability.renter}</p>


          {isAuthenticated && (
            <>
              <button onClick={() => onDeleteClick(car.id)}>delete</button>
              <button onClick={() => navigate(`/edit-car/${car.id}`)}>
                edit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CarPage;
