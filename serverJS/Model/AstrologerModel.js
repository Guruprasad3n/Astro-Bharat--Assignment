const { Schema, model } = require("mongoose");

const AstrologerSchema = new Schema({
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
const AstrologerModel = model("Astrologer", AstrologerSchema);

module.exports = { AstrologerModel };
