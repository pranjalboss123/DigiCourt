import mongoose from "mongoose";

const EvidenceSchema = new mongoose.Schema({
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case", // Reference to the related case
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clerk", // Only Clerks can upload evidence
    required: true,
  },
  fileType: {
    type: String,
    enum: ["image", "video", "audio", "pdf"], // Restrict file types
    required: true,
  },
  fileUrl: {
    type: String, // URL to file storage (e.g., ImageKit, Firebase, S3)
    required: true,
  },
  extractedText: {
    type: String, // For extracted text from PDFs or transcriptions
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Evidence = mongoose.models.Evidence || mongoose.model("Evidence", EvidenceSchema);
export default Evidence
