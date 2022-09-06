const { BadRequest } = require("http-errors");

function validate(object, schema) {
    const { error, value } = schema.validate(object, { abortEarly: false });

    if (error) {
        const errorDetails = error.details.map((detail) => {
            const { message, path } = detail;
            return { message, path };
        })
        throw new BadRequest(errorDetails);
    }
    return value;
}

module.exports = {
    validate
};