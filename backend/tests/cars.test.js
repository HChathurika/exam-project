
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Car = require("../models/carModel");
const cars = [
  {
    "make": "Toyota",
    "model": "Corolla",
    "availability": {
      "isAvailable": true,
      "renter": "Renter 1"
    }
  },
  {
    "make": "Honda",
    "model": "Civic",
    "availability": {
      "isAvailable": false,
      "renter": "Renter 2"
    }
  }
];

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/users/signup")
    .send({
        name: "John Doe",
        email: "john@example.com",
        password: "Pass!#22w0d@",
        phone_number: "09-4567890",
        gender: "Female",
      }
     );
  token = result.body.token;
});

describe("Given there are initially some cars saved", () => {
  beforeEach(async () => {
    await Car.deleteMany({});
    await api
      .post("/api/cars")
      .set("Authorization", "bearer " + token)
      .send(cars[0])
      .send(cars[1]);
  });

  it("should return all cars as JSON when GET /api/cars is called", async () => {
    await api
      .get("/api/cars")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should create one car when POST /api/cars is called", async () => {
    const newCar = {
  make: "test make",
  model: "test model",
  availability: {
    isAvailable: false,
    renter: "test renter",
  },
    };
    await api
      .post("/api/cars")
      .set("Authorization", "bearer " + token)
      .send(newCar)
      .expect(201);
  });
  
  it("should return one car by ID when GET /api/cars/:id is called", async () =>  {
    const car = await Car.findOne();
    await api
      .get("/api/cars/" + car._id)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should update one car by ID when PUT /api/cars/:id is called", async () => {
    const car = await Car.findOne();
    const updatedCar = {
      make: "test make",
  model: "test model",
  availability: {
    isAvailable: false,
    renter: "test renter",
  },
    };
    await api
      .put("/api/cars/" + car._id)
      .set("Authorization", "bearer " + token)
      .send(updatedCar)
      .expect(200);
    const updatedCarCheck = await Car.findById(car._id);
    expect(updatedCarCheck.toJSON()).toEqual(expect.objectContaining(updatedCar));
  });

  it("should delete one car by ID when DELETE /api/cars/:id is called", async () => {
    const car = await Car.findOne();
    await api
      .delete("/api/cars/" + car._id)
      .set("Authorization", "bearer " + token)
      .expect(204);
    const carCheck = await Car.findById(car._id);
    expect(carCheck).toBeNull();
  });
 
});

afterAll(() => {
  mongoose.connection.close();
});
