const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Card = require('../../models/card');

/* GET all cards */
router.get('/', (req, res, next) => {
    Card.find()
        .then(cards => {
            // Return all cards
            res.status(200).send({
                success: true,
                message: "All stored cards.",
                data: cards
            })
        })
        .catch(error => {
            // Return error
            res.status(error.status || 500).send({
                success: false,
                message: error.message
            })
        });
})

/* POST create card */
router.post('/', (req, res, next) => {
    let uuid = uuidv4();
    let description = req.body.description;
    Card({
        _id: uuid,
        description: description,
        enabled: true
    }).save()
        .then(card => {
            // Card created, return card.
            if(!card){
                let error = new Error("Card could not be created.");
                error.status = 500;
                throw error;
            }
            res.status(201).send({
                success: true,
                message: "A card was created with the UUID: " + card.id + ".",
                data: card
            })
        })
        .catch(error => {
            // Error, return error.
            res.status(error.status || 500).send({
                success: false,
                message: error.message
            })
        });
});

/* UPDATE card */
router.put('/:uuid', (req, res, next) => {

});

/* DELETE card */
router.delete('/:uuid', (req, res, next) => {

});

module.exports = router;