let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let bcrypt = require('bcryptjs');


let UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Let us know you by adding your name!']
    },
    email: {
        type: String,
        required: [true, 'Please add your email as well.']
    },
    password: String
});


let User = mongoose.model("User", UserSchema);
module.exports = User;

module.exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
       bcrypt.hash(newUser.password, salt, (error, hash) => {
           // store the hashed password
           let newUserResource = newUser;
           newUserResource.password = hash;
           newUserResource.save(callback);
       })
    });
};
