import Users from "../db/models/Users.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import sendEmail from "../helpers/sendEmail.js";

const { JWT_SECRET, BASE_URL } = process.env;

export const findUser = query => Users.findOne({
    where: query,
}); 

export const addUser = async data => {
    const { email, password } = data;
    const user = await findUser({email});
    if (user) {
        throw HttpError(409, "Email in use");
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = gravatar.url(email);

    const verificationToken = nanoid();

    const newUser = await Users.create({ ...data, password: hashedPassword, avatarURL: avatar, verificationToken });
    
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target=_blank href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`
    }

    await sendEmail(verifyEmail);

    return newUser;
};

export const verifyUser = async verificationToken => {
    const user = await findUser({verificationToken});
    if (!user) {
        throw HttpError(404, "User not found")
    };

    return user.update({ verificationToken: null, verify: true });
};

export const resendVerifyEmail = async email => {
    const user = await findUser({ email });
    if (!user) {
        throw HttpError(404, "User not found")
    };
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed")
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target=_blank href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify your email</a>`
    }

    await sendEmail(verifyEmail);
} 

export const loginUser = async data => {
    const { email, password } = data;
    const user = await findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    };
    if (!user.verify) {
        throw HttpError(401, "Email not verify");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw HttpError(401, "Email or password is wrong");
    };

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "24h" });
    return user.update({ token }, {
        returning: true,
    })
};

export const logoutUser = async id => {
    const user = await findUser(id);
    if (!user) {
        throw HttpError(401, "Not authorized");
    };

    return user.update({ token: null }, {
        returning: true,
    });
};

export const getUser = async email => {
    const user = findUser(email);
    if (!user) {
        throw HttpError(401, "Not authorized");
    };

    return user;
};

export const updateUserSubscription = async (email, data) => {
    const user = await findUser(email);
        if (!user) {
        throw HttpError(401, "Not authorized");
    };

    return user.update(data, {
        returning: true,
    })
}

export const updateUserAvatar = async (email, avatarURL) => {
    const user = await findUser(email);
        if (!user) {
        throw HttpError(401, "Not authorized");
    };

    return user.update({avatarURL}, {
        returning: true,
    })
}
