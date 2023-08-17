//Cloud service that gives the possibility to store images.
const cloudinary = require('cloudinary').v2;

//Package that creates a space in storage to create images in cloudinary.
const {CloudinaryStorage} = require('multer-storage-cloudinary');

//Handles Upload files from Forms and translates them to image files that Cloudinary can read.
const multer = require('multer');

cloudinary.config({
    cloud_title: process.env.CLOUDINARY_title,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        allowed_formats: ['jpg', 'png'],
        folder : 'Project-2'
    }
});

module.exports = multer({storage})
