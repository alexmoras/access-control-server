let mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Main auth section for the access system

let cardSchema = mongoose.Schema({
    _id: {
        type: String,
        default: () => {
            return uuidv4()
        }
    },
    description: {
        type: String
    },
    enabled: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Card", cardSchema);