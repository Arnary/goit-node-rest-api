import { addUser, getUser, loginUser, logoutUser, resendVerifyEmail, updateUserAvatar, updateUserSubscription, verifyUser } from "../services/authServices.js";
import fs from "node:fs/promises";
import path from "node:path";

const avatarsPath = path.resolve("public", "avatars");

export const register = async (req, res) => {
    const result = await addUser(req.body);

    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription
        }
    });
};

export const verify = async (req, res) => {
    const { verificationToken } = req.params;

    await verifyUser(verificationToken);

    res.json({
        message: "Email verified successfully"
    })
}; 

export const resendVerify = async (req, res) => {
    const { email } = req.body;

    await resendVerifyEmail(email)

    res.json({
        message: "Verification email sent"
    })
}

export const login = async (req, res) => {
    const result = await loginUser(req.body)

    res.json({
        token: result.token,
        user: {
            email: result.email,
            subscription: result.subscription,
        }
    })
}

export const logout = async (req, res) => {
    const { id } = req.user;
    await logoutUser({id});

    res.status(204).json({
        message: "No Content"
    });
}

export const getCurrentUser = async (req, res) => {
    const { email } = req.user;
    const result = await getUser({ email });

    res.json({
        email: result.email,
        subscription: result.subscription
    })
} 

export const updateSubscription = async (req, res) => {
    const { email } = req.user;
    const result = await updateUserSubscription({email}, req.body);

    res.json({
        email: result.email,
        subscription: result.subscription
    });
}

export const updateAvatar = async (req, res) => {
    const { email } = req.user;
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsPath, filename);
    await fs.rename(oldPath, newPath);
    const avatar = path.join("avatars", filename);

    const result = await updateUserAvatar({ email }, avatar);

    res.json({
        avatarURL: result.avatarURL
    });
}
