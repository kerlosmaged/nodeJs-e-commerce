const { validationResult } = require('express-validator')

const checkMiddleware= (req, res, next) => {
    let result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(400).json({ message: result.array() })
    }
    next()
}

module.exports = {checkMiddleware}