// models/Registrar.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IRegistrar extends Document {
  username: string;
  password: string;
  students: mongoose.Types.ObjectId[];
}

const registrarSchema = new Schema<IRegistrar>({
  username: {
    type: String,
    lowercase: true,
    required: [true, 'username is required'],
    minlength: [3, 'username must be at least 3 characters long'],
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }]
}, {
  timestamps: true
});

const Registrar = mongoose.models.Registrar || mongoose.model<IRegistrar>("Registrar", registrarSchema);

export default Registrar;
