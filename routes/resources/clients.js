const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const generator = require('generate-password');
const Client = require('../../models/client');

/* GET clients listing. */
router.get('/', (req, res, next) => {
    Client.find().select("-secret")
        .then(clients => {
            // Return all cards
            res.status(200).send({
                success: true,
                message: "All stored clients.",
                data: clients
            })
        })
        .catch(error => {
            // Return error
            res.status(error.status || 500).send({
                success: false,
                message: error.message
            })
        });
});

/* POST create client */
router.post('/', (req, res, next) => {
    Client({
        _id: uuidv4(),
        secret: generator.generate({
            length: 16,
            numbers: true
        }),
        description: req.body.description
    }).save()
        .then(client => {
            // Client created, return client.
            if(!client){
                let error = new Error("Client could not be created.");
                error.status = 500;
                throw error;
            }
            res.status(201).send({
                success: true,
                message: "A client was created with the UUID: " + client.id + ".",
                data: client
            })
        })
        .catch(error => {
            // Error, return error.
            console.log(error);
            res.status(error.status || 500).send({
                success: false,
                message: error.message
            })
        });
});

/* UPDATE client */
router.put('/:uuid', (req, res, next) => {

});

/* DELETE client */
router.delete('/:uuid', (req, res, next) => {

});

module.exports = router;
