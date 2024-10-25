const cors = require("cors");

const corsConfig = cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-version"],
    credentials: true,
});

module.exports = corsConfig;