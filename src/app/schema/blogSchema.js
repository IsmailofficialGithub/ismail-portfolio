import mongoose from "mongoose";
import CategoryModel from "./categorySchema.js"; // Import your category model

const blogSchema = new mongoose.Schema(
     {
          title: {
               type: String,
               required: true,
          },
          description: {
               type: String,
               required: true,
               trim: true,
          },
          imageUrl: {
               type: String,
          },
          category: {
               type: mongoose.Schema.Types.ObjectId, // Reference to a category
               ref: "Category", // Should match the name used in CategoryModel
               required: true,
          },
          createdAt: {
               type: Date,
               default: Date.now,
          },
     },
     { timestamps: true }
);

const BlogModel = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default BlogModel;
