const mongoose = require("mongoose");
let gracefulShutdown;
let dbURI = "mongodb://localhost/gstapp";
// mongodb+srv://premwebdev:9X5wHzW6T3P47i39@cluster0.jwve3md.mongodb.net/gstapp?retryWrites=true&w=majority
if (process.env.NODE_ENV === "production") {
  dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to ");
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};

process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
      process.exit(0);
    });
  });

require("./users");
