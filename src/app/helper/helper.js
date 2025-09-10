import cloudinary from "./Cloudinary";
export const deleteAssetsFromCloudinary = async (secureUrl) => {
     try {
          const urlParts = secureUrl.split("/");
          const versionIndex = urlParts.findIndex((part) => part.startsWith("v"));
          const publicIdWithExtension = urlParts.slice(versionIndex + 1).join("/");
          const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");

          console.log(publicId)    

          const deletingImage = await cloudinary.uploader.destroy(publicId);
          console.log(deletingImage);
          if (deletingImage.result === "ok") {
               return { success: true, message: "Successfully deleted image" };
          } else {
               return { success: false, message: "Failed to delete image" };
          }
     } catch (error) {
          return { success: false, message: "An error occurred while deleting the image , helper.js", error };
     }
};


export const addAssertsInCloudinary = async (image) => {
     try {
          const buffer = await image.arrayBuffer();
          const base64Image = Buffer.from(buffer).toString("base64");

          // Upload the image to Cloudinary
          const uploadResponse = await cloudinary.uploader.upload(
               `data:${image.type};base64,${base64Image}`,
               { folder: "blog" } // Optional: specify a folder in Cloudinary
          );

          // Connect to the database and save the blog post with the image URL
          let imageUrl = uploadResponse.secure_url.toString()
          return { success: true, message: "Successfully image uploaded on cloudinary", imageUrl };


     } catch (error) {
          console.log(error)

     }
}

export function getPublicIdFromUrl(url) {
  const parts = url.split("/upload/")[1]; // take part after /upload/
  const withoutVersion = parts.replace(/v\d+\//, ""); // remove version like v12345/
  const withoutExt = withoutVersion.replace(/\.[^/.]+$/, ""); // remove file extension
  console.log("withoutExt",withoutExt);
  return withoutExt;
}
