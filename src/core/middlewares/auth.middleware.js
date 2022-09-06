const jwt = require('jsonwebtoken');
const { Unauthorized, Forbidden } = require('http-errors');

function authorization(...roles) {
    return function (req, res, next) {
        try {
            const token = req.headers.authorization;
            if (!token || !token.startsWith('Bearer')) {
                throw new Unauthorized('Token schema is invalid or missing');
            };

            const accessToken = token.replace('Bearer ', '');

            const user = jwt.verify(accessToken, process.env.JWT_SECRET_KEY, { ignoreExpiration: false });

            if (roles.length && !roles.some((role) => role === user.role)) {
                throw new Forbidden('Forbidden accessible');
            }
            req.user = user;
            next()

        } catch (error) {
            const err = new Unauthorized(error.message)
            next(err)
        }
    }
}

module.exports = {
    authorization,
}