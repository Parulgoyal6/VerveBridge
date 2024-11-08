import signupModel from "../models/signupModel.js";
import validator from "validator";

// Function to handle message sending
export const sendEmail = async (req, res) => {
    try {
        // Extract data from request body
        const { email} = req.body;

       
        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

       
        // Create a new message entry
        const newMessage = new signupModel({
            email,
        });

        // Save message to the database
        await newMessage.save();

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};
