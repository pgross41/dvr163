import dotenv from "dotenv";

// Load .env file into process.env
dotenv.config();

const required = [
    "NVR_HOST",
    "NVR_USERNAME",
    "NVR_PASSWORD"
];

required.forEach((key) => {
    if (!process.env[key]) {
        const error = `Missing required environment variable: ${key}`;
        throw Error(error);
    }
});

export default {
    nvrHost: process.env.NVR_HOST,
    nvrPassword: process.env.NVR_PASSWORD,
    nvrUsername: process.env.NVR_USERNAME,
    port: process.env.PORT || 5000,
};
