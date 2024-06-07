import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

// JWT token üreten yardımcı fonksiyon
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        // İstekten gelen verileri alır.
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        // Şifrelerin uyuşup uyuşmadığını kontrol eder.
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match!" });
        }

        // Kullanıcı adının veritabanında mevcut olup olmadığını kontrol eder.
        const user = await User.findOne({ userName });

        if (user) {
            return res.status(400).json({ error: "Username is already exists." });
        }

        // Şifreyi hash'ler.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Profil resmini belirler.
        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?userName=${userName}`;
        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?userName=${userName}`;

        // Yeni kullanıcı nesnesi oluşturur.
        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePicture: gender === "male" ? boyProfilePicture : girlProfilePicture,
        });

        // Yeni kullanıcı kaydını yapar ve JWT token üretir.
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        // Başarı durumunda kullanıcı bilgilerini döndürür.
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePicture: newUser.profilePicture
        });

    } catch (error) {
        console.log("Error in signup controller.", error.message);
        res.status(500).json({ error: "INTERNAL SERVER ERROR!" });
    }
};

export const login = async (req, res) => {
    try {
        // İstekten gelen kullanıcı adı ve şifreyi al
        const { userName, password } = req.body;

        // Kullanıcıyı veritabanında bul
        const user = await User.findOne({ userName });

        // Kullanıcı yoksa veya şifre yanlışsa hata.
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password!" });
        }

        // Başarılı girişteJWT token üret
        generateTokenAndSetCookie(user._id, res);

        // Kullanıcı bilgilerini döndür
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
        // Cookie'yi temizler ve başarı durumunda mesaj döndürür.
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out succesfully!" });

    } catch (error) {
        console.log("Error in logout controller.", error.message);
        res.status(500).json({ error: "INTERNAL SERVER ERROR!" });
    }
};
