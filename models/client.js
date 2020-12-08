let mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Allows clients to authorise and gives a description for the log

let clientSchema = mongoose.Schema({
    _id: {
        type: String,
        default: () => {
            return uuidv4()
        }
    },
    secret: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model("Client", clientSchema);