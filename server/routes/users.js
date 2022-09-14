const express = require('express');
const Users = require('../models/Users');
const checkAuth = require('../middleware/check-auth');
const { cloudinary } = require('../config/cloudinary');
const passportConfig = require('../passport/passport');
const passport = require('passport')

const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}), (req, res) => {
    console.log("hereee");
    res.header("Access-Control-Allow-Origin", "*");
    res.send('login with google')
})

router.get('/google/callback',
    passport.authenticate('google'), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(req.user);

});

// router.get('/google', passport.authenticate('google', {
//     scope: ['profile', 'email']
// }), (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.send('register with google')
// })

// router.get('/google/callback',
//     passport.authenticate('google'), (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.send(req.user);
// });

router.get('/:id', checkAuth, (req, res) => {
    Users.findOne({ _id: req.params.id }).then(user => {
        res.json({ user, success: true })
    }).catch(er => {
        res.json({ success: false, message: er.message });
    })
})

router.post('/upload-image', checkAuth, async(req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr);
        Users.findOne({ _id: req.body._id }).then(user => {
            user.avatar = { url: uploadedResponse.url, publicId: uploadedResponse.public_id };
            user.save();
            if (user.images) {
                user.images.push({ url: uploadedResponse.url, publicId: uploadedResponse.public_id });
            } else {
                user.images = [];
                user.images.push({ url: uploadedResponse.url, publicId: uploadedResponse.public_id })
            }
            res.json({ success: true });
        })
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: 'Something went wrong, try again.' })
    }
})

module.exports = router;