const mongoose = require("mongoose");
const Article = require("./models/Article");
const Comment = require("./models/Comment");

const connectionString = "mongodb://127.0.0.1:27017/testDB";

start();

async function start() {
    await mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    console.log("Database is connected");
    const article = await Article.findOne({});
    const comment = await Comment.findOne({});
    article.comments.push(comment);
    await article.save();

    await mongoose.disconnect();
}