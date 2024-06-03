import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match!" });
        }

        const user = await User.findOne({ userName });

        if (user) {
            return res.status(400).json({ error: "Username is already exists." });
        }

        //HASH PASSWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?userName=${userName}`;
        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?userName=${userName}`;


        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePicture: gender === "male" ? boyProfilePicture : girlProfilePicture,
        });

        if (newUser) {
            //Generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePicture: newUser.profilePicture
            });
            //201: succesfully created
        } else {
            res.status(400).json({ error: "Invalid user data!" });
        }

    } catch (error) {
        console.log("Error in signup controller.", error.message);
        res.status(500).json({ error: "INTERNAL SERVER ERROR!" });

    }
};

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password!" });
        }
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePicture: user.profilePicture,
        });

    } catch (error) {
        console.log("Error in login controller.", error.message);
        res.status(500).json({ error: "INTERNAL SERVER ERROR!" });
    }
};

export const logout = (req, res) => {
    try {

        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out succesfully!" });


    } catch (error) {
        console.log("Error in logout controller.", error.message);
        res.status(500).json({ error: "INTERNAL SERVER ERROR!" });
    }

};
