const {mongoose,Schema} = require('mongoose')


const details = new mongoose.Schema({

    userId: String,
    password: String,
    roll:String,
    class:String,
    fees:String,
    imgPath: String,
    res: String,
    name:String,
    stream: String,
    address: String,
    exp: String,
    college: String,
    

    
});

const Details = mongoose.model('Details', details);
module.exports = Details;