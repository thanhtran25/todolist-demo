const bcrypt = require('bcrypt');
const { BadRequest, Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../core/database');
const { ROUNDS_NUMBER } = require('../core/constant');


async function register(user) {
    const duplicatedUser = await User.findOne({
        where: {
            email: user.email
        }
    });
    if (duplicatedUser) {
        throw new BadRequest('Email already is invalid');
    }
    const hashPassword = await bcrypt.hash(user.password, ROUNDS_NUMBER);
    user.password = hashPassword;
    const row = await User.create(user);
    const newUser = {
        id: row.id,
        email: row.email,
    }
    return newUser;
}

async function login(email, password) {
    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if (!user) {
        throw new Unauthorized('Email or password is incorrect');
    }
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Unauthorized('Email or password is incorrect');
    }

    const payload = { id: user.id, email: user.email, role: user.role }
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRATION });

    return { success: true, accessToken };
}


module.exports = {
    register,
    login,
}