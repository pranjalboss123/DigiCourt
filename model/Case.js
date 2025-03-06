import mongoose from "mongoose";

const CaseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "under review", "closed"], default: "pending" },
    evidence: [{ type: mongoose.Schema.Types.ObjectId, ref: "Evidence" }],
    aiSummary: { type: String, default: "" },
    judgeId: { type: mongoose.Schema.Types.ObjectId, ref: "Judge", default: null },
    isApproved: { type: Boolean, default: false },
    judgeFeedback: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  });
  
  const Case = mongoose.models.Case || mongoose.model("Case",CaseSchema)
  export default Case;
  