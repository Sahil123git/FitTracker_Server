import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const uploadResource = async (req, res, next) => {
  try {
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null); // Indicate end of stream

    // Create a Cloudinary upload stream and handle the response
    const uploadFromBuffer = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "resource" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        bufferStream.pipe(stream); // Pipe the buffer stream to Cloudinary's upload stream
      });
    };
    const result = await uploadFromBuffer();
    return res.status(200).json({ imageUrl: result.secure_url });
  } catch (err) {
    next(err);
  }
};
