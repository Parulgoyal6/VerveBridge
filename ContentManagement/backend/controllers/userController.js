import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";

// Function to create a JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Function to handle message sending
export const sendMessage = async (req, res) => {
    try {
        // Extract data from request body
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Validate message length
        if (message.length < 10) {
            return res.status(400).json({ success: false, message: "Message must be at least 10 characters long" });
        }

        // Check if the email already exists in the database
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "Email already used. Choose a new email." });
        }

        // Create a new message entry
        const newMessage = new userModel({
            name,
            email,
            subject,
            message,
        });

        // Save message to the database
        await newMessage.save();

        // Generate JWT token
        const token = createToken(newMessage._id);

        // Send a successful response with token
        res.status(201).json({ success: true, message: "Message sent successfully!", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};
