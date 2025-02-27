import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";
import { emailRegex } from "../../constants/userConstants.js";

const Users = sequelize.define("user", {
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        match: emailRegex,
    },
    subscription: {
        type: DataTypes.ENUM,
        values: ["starter", "pro", "business"],
        defaultValue: "starter"
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
})

// Users.sync();

export default Users;
