import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },

    category: {
      type: String,
      required: true
    },

    severity: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
reportSchema.index({ location: "2dsphere" });

const Report = mongoose.model("Report", reportSchema);

export default Report;