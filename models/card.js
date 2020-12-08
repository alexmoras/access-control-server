let mongoose = require('mongoose');
import { v4 as uuidv4 } from 'uuid';

// Main auth section for the access system

let cardSchema = mongoose.Schema({
    uuid: {
        type: String,
        unique: true,
        default: () => {
            return uuid.v4()
        }
    },
    description: {
        type: String
    }
}, { _id : false });

module.exports = mongoose.model("Card", cardSchema);