let mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Records all card swipes in an immutable format

let logSchema = mongoose.Schema({
    _id: {
        type: String,
        default: () => {
            return uuidv4()
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
});

module.exports = mongoose.model("Log", logSchema);