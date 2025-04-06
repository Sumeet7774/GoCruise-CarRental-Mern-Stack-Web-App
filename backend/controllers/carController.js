//import { setErrorThrowerOptions } from "@clerk/clerk-react/internal";
import Car from "../models/Car.js";
import User from "../models/User.js";

export const rentCar = async (req, res) => {
    const carId = req.params.id;

    try {
        const car = await Car.findById(carId);
        const user = await User.findById(req.user._id);

        if (!car || !user) {
            return res.status(404).json({ message: "Car or user not found" });
        }

        if (!car.available) {
            return res.status(400).json({ message: "Car is already rented" });
        }
        car.rentedBy = req.user._id;
        car.available = false;
        await car.save();

        user.rentedCars.push(car._id);
        await user.save();

        res.json({ message: "Car rented successfully", car });
    } catch (err) {
        res.status(500).json({ message: "Failed to rent car", error: err.message });
    }
};

export const returnCar = async (req, res) => {
    const carId = req.params.id;

    try {
        const car = await Car.findById(carId);
        const user = await User.findById(req.user._id);

        if (!car || !user) {
            return res.status(404).json({ message: "Car or user not found" });
        }

        if (!user.rentedCars.includes(car._id)) {
            return res.status(400).json({ message: "You haven't rented this car" });
        }
        car.rentedBy = null;
        car.available = true;

        await car.save();

        user.rentedCars = user.rentedCars.filter(
            (rentedId) => rentedId.toString() !== car._id.toString()
        );
        await user.save();

        res.json({ message: "Car returned successfully", car });
    } catch (err) {
        res.status(500).json({ message: "Failed to return car", error: err.message });
    }
};



// @desc Add new car (Admin only)
export const addCar = async (req, res) => {
    try {
        const { name, brand, model, rentPerDay, image } = req.body;

        const newCar = new Car({
            name,
            brand,
            model,
            rentPerDay,
            image,
        });

        const savedCar = await newCar.save();
        res.status(201).json(savedCar);
    } catch (err) {
        res.status(500).json({ message: "Error adding car", error: err.message });
    }
};

export const rentedCars = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('rentedCars');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ rentedCars: user.rentedCars });
    } catch (error) {
        console.log("error while fetching rented cars ", error.message);
        res.status(400).json({ messsage: "error while fetching rented cars", error })

    }
}

// @desc Update car (Admin only)
export const updateCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const updates = req.body;

        const updatedCar = await Car.findByIdAndUpdate(carId, updates, {
            new: true,
        });

        if (!updatedCar) {
            return res.status(404).json({ message: "Car not found" });
        }

        res.json(updatedCar);
    } catch (err) {
        res.status(500).json({ message: "Error updating car", error: err.message });
    }
};

// @desc Delete car (Admin only)
export const deleteCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const deletedCar = await Car.findByIdAndDelete(carId);

        if (!deletedCar) {
            return res.status(404).json({ message: "Car not found" });
        }

        res.json({ message: "Car deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting car", error: err.message });
    }
};


export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch cars" });
    }
};

export const getRentersDetails = async (req, res) => {

    try {
        const rentedCars = await Car.find({ rentedBy: { $ne: null } }).populate('rentedBy', 'name email');




        const rentersMap = {};

        rentedCars.forEach(car => {
            const renter = car.rentedBy;
            if (!renter || !renter._id) return;

            if (!rentersMap[renter._id]) {
                rentersMap[renter._id] = {
                    userId: renter._id,
                    name: renter.name,
                    email: renter.email,
                    cars: [],
                };
            }

            rentersMap[renter._id].cars.push({
                name: car.name,
                brand: car.brand,
                model: car.model,
            });
        });

        res.json(Object.values(rentersMap));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get renter data' });
    }
}

export const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: "Error fetching car", error: err.message });
    }
}