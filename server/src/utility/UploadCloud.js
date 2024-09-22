const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: 'dqhj1sukr', api_key: '648126929325225', api_secret: '9VXvdF5lmSNC7P9TQgp-7e4ICUw' });

const UploadCloud = async (imagePath, folderStorage) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(imagePath, { folder: folderStorage });
        return uploadResult.secure_url;
    } catch (error) {
        throw error;
    }
};

export { UploadCloud }