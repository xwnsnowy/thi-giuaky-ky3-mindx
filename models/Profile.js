import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  placeOfBirth: {
    type: String,
  },
  nationality: {
    type: String,
  },
  education: [
    {
      institution: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
    },
  ],
  skills: [
    {
      type: String,
      required: true,
    },
  ],
  projects: [
    {
      projectName: {
        type: String,
        required: true,
      },
      content: {
        type: String,
      },
      role: {
        type: String,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
    },
  ],
  workExperience: [
    {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
      companyName: {
        type: String,
        required: true,
      },
      role: {
        type: String,
      },
    },
  ],
});

export default mongoose.model("Profile", profileSchema);
