import { Link } from "react-router-dom";

const CarListings = ({ cars }) => {
  return (
    <div className="car-list">
      {cars.map((car) => (

        <div className="car-preview" key={car.id}>
          <Link to={`/cars/${car.id}`}>
            <h2>{car.make} {car.model}</h2>
          </Link>
          <p>Make: {car.make}</p>
          <p>Model: {car.model}</p>
          <p>Availability: {car && car.availability ? (car.availability.isAvailable ? 'Yes' : 'No') : 'Unknown'}</p>
        </div>
      ))}
    </div>
  );
};

export default CarListings;
