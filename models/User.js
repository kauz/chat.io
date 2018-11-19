let mongoose = require('mongoose'),
    Schema = mongoose.Schema;


let UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Let us know you by adding your name!']
    },
    email: {
        type: String,
        required: [true, 'Please add your email as well.']
    }
});


let User = mongoose.model("User", UserSchema);
module.exports = User;