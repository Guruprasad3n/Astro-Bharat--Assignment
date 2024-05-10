import { Schema, model, Document } from "mongoose";

interface IAstrologer extends Document {
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialties: string[];
  profileImageUrl: string;
}

const AstrologerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  languages: [
    {
      type: String,
    },
  ],
  specialties: [
    {
      type: String,
    },
  ],
  profileImageUrl: {
    type: String,
    required: true,
  },
});

const AstrologerModel = model<IAstrologer>("Astrologer", AstrologerSchema);

export default AstrologerModel;
