import Users from "../db/models/Users.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const addUser = async data => {
    const { email, password } = data;
    const user = await Users.findOne({
        where: {
            email
        }
    });
    if (user) {
        throw HttpError(409, "Email in use");
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({...data, password: hashedPassword});
    return newUser;
};

export const loginUser = async data => {
    const { email, password } = data;
    const user = await Users.findOne({
        where: {
            email
        }
    });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    };

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw HttpError(401, "Email or password is wrong");
    };

    const token = jwt.sign(email, JWT_SECRET, {expiresIn: "1d"})

    return user;
}
