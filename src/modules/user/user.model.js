import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        require: true
    },
    email: { 
        type: String, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);