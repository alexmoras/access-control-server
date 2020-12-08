let mongoose = require('mongoose');
import { v4 as uuidv4 } from 'uuid';

// Links organisation user to cards

let userSchema = mongoose.Schema({
    uuid: {
        type: String,
        unique: true,
        default: () => {
            return uuid.v4()
        }
    },
    username: {
        type: String,
        unique: true
    },
    cards: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Card"
    }
}, { _id : false });

module.exports = mongoose.model("User", userSchema);