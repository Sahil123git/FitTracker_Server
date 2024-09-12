import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const uploadResource = async (req, res, next) => {
  try {
    console.log(req.file);
    cloudinary.uploader.upload(req.file.path, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Uploaded!",
        data: result.url,
      });
    });
  } catch (err) {
    next(err);
  }
};
