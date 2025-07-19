require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8800,
    DB_CONNECT: process.env.DB_CONNECT,
    SECRET_KEY: process.env.SECRET_KEY,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS
};
