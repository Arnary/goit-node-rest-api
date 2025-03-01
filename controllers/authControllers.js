import { addUser, getUser, loginUser, logoutUser, updateUserSubscription } from "../services/authServices.js";

export const register = async (req, res) => {
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
