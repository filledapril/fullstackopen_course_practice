const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true
  },
  name: String,
  passwordHash: {
    type:String,
    minlength: 3,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returndObject) => {
    returndObject.id = returndObject._id.toString()
    delete returndObject._id
    delete returndObject.__v
    delete returndObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User