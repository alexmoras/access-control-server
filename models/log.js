let mongoose = require('mongoose');
import { v4 as uuidv4 } from 'uuid';

// Records all card swipes in an immutable format

let logSchema = mongoose.Schema({
    uuid: {
        type: String,
        unique: true,
        default: () => {
            return uuid.v4()
        }
    },
    card: {
        type: String
    },
    user: {
        type: String
    },
    client: {
        type: String
    },
    access: {
        type: Boolean
    },
    online: {
        type: Boolean
    },
    timestamp: {
        type: Date
    },
}, { _id : false });

module.exports = mongoose.model("Log", logSchema);