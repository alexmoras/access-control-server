const express = require('express');
const router = express.Router();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');
const User = require('../models/user');

/* GET OAuth create/login user */
router.get('/login', (req, res, next) => {
    let session = {};
    axios({
        method: "post",
        url: config.oauth.token_url,
        data: {
            client_id: config.oauth.client_id,
            client_secret: config.oauth.client_secret,
            code: req.query.code,
            grant_type: "authorization_code",
            redirect_uri: config.oauth.redirect_url
        }
    })
        .then(msg => {
            return axios({
                method: "post",
                url: config.oauth.userinfo_url,
                headers: {
                    Authorization: "Bearer " + msg.data.access_token
                }
            });
        })
        .then(msg => {
            session.username = msg.data.nickname;
            session.offline = false;
            msg.data.groups.forEach(group => {
                if(config.offline_groups[group]){
                    session.offline = true;
                }
            })
            return User.findOne({username: session.username});
        })
        .then(user => {
            if(!user){
                // User does not exist, create it!
                user = User({
                    _id: uuidv4(),
                    username: session.username,
                    cards: [],
                    offline: session.offline,
                });
            }
            return user.save();
        })
        .then(user => {
            session.loggedIn = true;
            session.user_id = user.id;
            res.status(200).send({
                success: true,
                message: "User is logged in.",
                data: user
            })
        })
        .catch(error => {
            res.status(error.status || 500).send({
                success: false,
                message: error.message
            })
        });
});

module.exports = router;