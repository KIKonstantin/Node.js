const app = require("express")();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const secret = "Classified information";
app.use(cookieParser());

app.use((req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const data = jwt.verify(token, secret);
            req.user = data;
        } catch (error) {
            res.cookies('token');
            res.redirect('/login');
        }
    }
    next();
});

app.get("/", (req, res) => {
    if (req.user) {
        res.send('Hello, ' + req.user.username);
    } else {
        res.send('Hello, my dear guest!')
    }
});

app.get("/jwt", (req, res) => {
    const payload = {
        username: "Kiro Breika",
        roles: ["user", "top_G"],
    };

    const token = jwt.sign(payload, secret);
    res.cookie("token", token);
    res.send("Token is saved!");
});

app.listen(3000);