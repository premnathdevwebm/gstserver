const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: "db58ap8dm",
  api_key: "935726228318742",
  api_secret: "w2OisJ_pNz2AyBu3_GJYcqSHoTU"
});

module.exports = cloudinary