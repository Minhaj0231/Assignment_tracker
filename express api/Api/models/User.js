const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
       
      },
      password: {
        type: String,
        required: true      

      },
      role: {
          type: String,
          enum: ['Teacher', 'Student'],
          required: true
      },
      image: {
          type:String
          
      }
     
     
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', async function(){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
});


UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
};

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
  


module.exports = mongoose.model('User',UserSchema);