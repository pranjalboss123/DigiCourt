import mongoose from "mongoose";

const ClerkSchema = new mongoose.Schema({
     username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    secretCode:{type:String, required:true},
     evidence: [{ type: mongoose.Schema.Types.ObjectId, ref: "Evidence" }],
    approvedCases:[{type:mongoose.Schema.Types.ObjectId,ref:"Case"}],
    createdAt:{type:Date,default:Date.now()},
},{
    timestamps:true
})