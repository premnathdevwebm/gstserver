const mongoose = require("mongoose");
const gstSchema = new mongoose.Schema({
    location: String,
    value: String,
    user: String,
    gst: mongoose.Schema.Types.Mixed
}, {timestamps: true});

mongoose.model('Gst', gstSchema);