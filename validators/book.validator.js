const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()),
});
//validation update payload function
const validateBookPayload = (req, res, next) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    } else {
        next();
    }
};

module.exports = {
    validateBookPayload
}