const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { stringify: uuidStringify } = require('uuid');
const Client = require('../models/client');
const Card = require('../models/card');
const User = require('../models/user');

/* POST check card is authorised */
router.post('/', (req, res, next) => {
    let bytes = req.body.bytes;
    let card_id = req.body.card_id;
    let client_id = req.body.client_id;
    let client_secret = req.body.client_secret;

    Client.findOne({_id: client_id, secret: client_secret})
        .then(client => {
            if(!client){
                // Client not authorised
                let error = new Error("Client is not authorised.");
                error.status = 401;
                throw error;
            }
            return Card.findById(card_id);
        })
        .then(card => {
            if(!card){
                let error = new Error("Card was not found.");
                error.status = 404;
                throw error;
            }
            if(!card.enabled){
                let error = new Error("Card is disabled.");
                error.status = 401;
                throw error;
            }
            return User.findOne({cards: card.id})
        })
        .then(user => {
            if(!user){
                user = {};
                user.username = null;
                user.offline = false;
            }
            // Log the entry attempt.
            res.status(200).send({
                success: true,
                message: "Entry to " + client_id + " authorised using card " + card_id + ".",
                data: {
                    user: user.username,
                    client_id: client_id,
                    card_id: card_id,
                    offline: user.offline
                }
            })
        })
        .catch(error => {
            // Log the entry attempt.
            res.status(error.status || 500).send({
                success: false,
                message: error.message || "An unknown error has occurred.",
            })
        })
});

module.exports = router;