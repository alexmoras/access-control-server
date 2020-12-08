let mongoose = require('mongoose');
import { v4 as uuidv4 } from 'uuid';

// Allows clients to authorise and gives a description for the log

let clientSchema = mongoose.Schema({
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

module.exports = mongoose.model("Client", clientSchema);