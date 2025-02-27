import sequelize from "../sequelize.js"
import { DataTypes } from "sequelize"

const Contacts = sequelize.define(
    "contact", 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },   
        owner: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
    }
)

// Contacts.sync({ force: true });

export default Contacts;
