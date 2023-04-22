const mongoose = require("mongoose");
const gstSchema = new mongoose.Schema({
    location: String,
    value: String,
    user: String,
    appealorder: [mongoose.Schema.Types.Mixed],
    oio: [mongoose.Schema.Types.Mixed],
    predeposit: [mongoose.Schema.Types.Mixed],
    recovery: [mongoose.Schema.Types.Mixed],
    appeal: [mongoose.Schema.Types.Mixed],
    scn: [mongoose.Schema.Types.Mixed],
}, {timestamps: true});

mongoose.model('Gst', gstSchema);