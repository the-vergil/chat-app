import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { userName, fullName, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            console.log(`Passwords do not match.`);
            return res.status(400).json({ message: `Passwords do not match.` });
        }

        const user = await User.findOne({ userName });

        if (user) {
            console.log(`User already exists.`);
            return res.status(400).json({ message: `User already exists `});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profilePicBoy = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const profilePicGirl = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            userName, 
            fullName, 
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? profilePicBoy : profilePicGirl
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await  newUser.save();

            return res.status(201).json({
                success: true,
                message: "user created",
                _id: newUser._id,
                fullName,
                userName,
                gender,
                profilePic: gender === "male" ? profilePicBoy : profilePicGirl
            })
        }

    } catch (error) {
        console.log(`Error in signup controller: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error"});
    }
}

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid user"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        
        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            success: true,
            message: "User logged in."
        })

    } catch (error) {
        console.log(`Error in login controller: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error"});
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        console.log(`Error in logout controller: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error"});
    }
}