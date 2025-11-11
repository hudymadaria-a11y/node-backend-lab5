import mongoose from "mongoose";
// Define the schema (structure of a document saved to the mongo db)
const productSchema = new mongoose.Schema(
 {
 name: {
 type: String,
 required: [true, "Name is required"],
 trim: true, // removes extra spaces
 minlength: [2, "Name must be at least 2 characters long"]
 },
 price: {
 type: Number,
 required: [true, "Price is required"],
 min: 0,
 },
 description: {
 type: String,
 default: "",
 maxlength: [200, "Description too long"],
 },
 createdAt: {
 type: Date,
 default: Date.now,
 },
 },
 { versionKey: false } // disables the "__v" version field
);
// Export model so it can be used in routes or controllers
export const Product = mongoose.model("Product", productSchema);