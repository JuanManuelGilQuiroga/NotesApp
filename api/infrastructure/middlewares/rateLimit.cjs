const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minutos
    max: 3,
    message: JSON.stringify({status: 429, message: 'Espera 3 minutos antes de volver a intentarlo'})
});

const getLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 25,
    message: JSON.stringify({status: 429, message: 'Tasa superada'})
});

const postLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 45,
    message: JSON.stringify({status: 429, message: 'Tasa superada'})
});

const deleteLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 10,
    message: JSON.stringify({status: 429, message: 'Tasa superada'})
});

const putLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 45,
    message: JSON.stringify({status: 429, message: 'Tasa superada'})
});

module.exports = {
    loginLimiter,
    getLimiter,
    postLimiter,
    deleteLimiter,
    putLimiter
};