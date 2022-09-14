const passportConfig = require('../passport/passport');
const passport = require('passport')

module.exports = (req, res, next) => {
    try {
        if (!req.user) {
            res.redirect("api/users/")
        }
        next();
    } catch (er) {
        return res.status(401).json({ "message": "Not authorized" });
    }
}