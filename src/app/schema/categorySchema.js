// src/app/schema/categorySchema.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
     category: {
          type: String,
          required: true,
          trim: true, // Removes unnecessary spaces
     },
     uploadedAt: {
          type: Date,
          default: Date.now,
     },
});

// Ensure the model name aligns with the schema's purpose
const CategoryModel = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default CategoryModel;
