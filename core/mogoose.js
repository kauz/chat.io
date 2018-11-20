let mongoose = require('mongoose');

module.exports = () => {

    // fix console warning - DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
    mongoose.set('useFindAndModify', false);
    // connect to mongo db
    mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true});

    let db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", () => {
        console.log("Connection Succeeded");
    });

};