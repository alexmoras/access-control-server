let mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Links organisation user to cards

let userSchema = mongoose.Schema({
    _id: {
        type: String,
        default: () => {
            return uuidv4()
        }
    },
    username: {
        type: String,
        unique: true
    },
    cards: {
        type: [String],
        ref: "Card"
    },
    offline: {
        type: Boolean
    }
});

module.exports = mongoose.model("User", userSchema);