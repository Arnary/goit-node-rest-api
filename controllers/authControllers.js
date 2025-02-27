import { addUser, loginUser } from "../services/authServices.js";

export const registerUser = async (req, res) => {
    const result = await addUser(req.body);

    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription
        }
    });
};

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
