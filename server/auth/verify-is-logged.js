const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.originalUrl === '/api/auth/login' || req.originalUrl === '/api/auth/logout') {
        next();
    } else {
        try {
            req.auth = jwt.verify(req.headers.authorization, process.env.login_key || 'shhhhh');

            if (req.auth.role != 66) {
            }
            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                next({statusCode: 401, message: 'Authentication is expired!'});
            } else {
                next({statusCode: 401, message: 'Not authorised!'});
            }
        }
    }
};
