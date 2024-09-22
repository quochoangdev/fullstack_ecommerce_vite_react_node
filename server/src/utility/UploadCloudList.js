const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: 'dqhj1sukr', api_key: '648126929325225', api_secret: '9VXvdF5lmSNC7P9TQgp-7e4ICUw' });

const UploadCloudList = async (valueImage, folderStorage) => {
    try {
        const uploadPromises = valueImage.map(image =>
            cloudinary.uploader.upload(image, { folder: folderStorage }).catch(err => null)
        );

        const uploadResults = await Promise.all(uploadPromises);
        const uploadImageLists = uploadResults.filter(result => result !== null).map(item => item.secure_url);
        return uploadImageLists;
    } catch (error) {
        throw error
    }
};

export { UploadCloudList }