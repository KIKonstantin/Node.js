const express = require("express");
const crypto = require("crypto");
const session = require("express-session");
const { register, login, users } = require("./userService");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        cookie: { secure: false },
        resave: false,
        saveUninitialized: true,
        secret: "Bro, shut up!",
    })
);

const homeTemplate = (user, users) =>
    `<h1>Welcome, my Dear ${
  user || "guest"
}</h1>
${
  user === undefined
    ? `<p><a href="/register">Join us here </a>to become a successfull member of our community</p>
    <p>Or if you are already a member of our community, <a href="/login">just login here bro </a></p>
    `
    : ``
}
<ul>
${users.map((u) => `<li>${u.username} - ${u.failedAttempts}</li>`).join("\n")}
</ul>
`;

app.get("/", (req, res) => {
  console.log(">>> USER: ", req.session.user || "guest");
  res.send(homeTemplate(req.session.user, users));
});

const registerTemplate = (error) => `<h1>REGISTER</h1>
${error ? `<p>${error}</p>` : ""}
<form action="/register" method="post">
<label>Username: <input type="text" name="username"></label>
<label>Password: <input type="password" name="password"></label>
<label>Repeat Password: <input type="password" name="repass"></label>
<input type="submit" value="Sign up">
</form>
`;

const loginTemplate = (error) => `<h1>LOGIN</h1>
${error ? `<h2>${error}</h2>`: ''}
<form action="/login" method="post">
<label>Username: <input type="text" name="username"></label>
<label>Password: <input type="password" name="password"></label>
<input type="submit" value="Log in">
</form>
`

app.get("/register", (req, res) => {
  res.send(registerTemplate());
});
app.post("/register", async (req, res) => {
  req.body.username = req.body.username.trim();
  req.body.password = req.body.password.trim();
  req.body.repass = req.body.repass.trim();
  try {
    if (
      req.body.username == "" ||
      req.body.password == "" ||
      req.body.repass == ""
    ) {
      throw new Error("All fields are required!");
    } else if (req.body.password !== req.body.repass) {
      throw new Error("Passwords don't match!");
    }

    await register(req.body.username, req.body.password);
    res.redirect("/");
  } catch (error) {
    res.send(registerTemplate(error.message));
  }
});

app.get("/login", (req, res) => {
  res.send(loginTemplate());
});

app.post("/login", async (req, res) => {
  console.log("Login attempt");
  console.log(req.body);

    try {
        const result = await login(req.body.username,req.body.password);
        req.session.user = result.username;
        res.redirect('/');
    } catch (err) {
        res.status(401).send(loginTemplate(err.massage));
    }
});

app.listen(3000);