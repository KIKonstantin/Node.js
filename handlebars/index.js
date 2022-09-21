const express = require("express");
const hbr = require("express-handlebars");

const handlebars = hbr.create({
    extname: ".hbs",
});

const app = express();

app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

app.get("/", (req, res) => {
    res.locals.message = "Hello bro";
    res.locals.response = "Nice to see ya DOOD";
    res.render("home", {
        username: 'Kiro',
        title: "Handlebars DEMO",
        message: 'Hi man',
        product: {
            name: 'Pechka',
            price: 579.99,
            color: 'white'
        },
        contacts: [{
                name: 'Kiro',
                email: 'kirobreika@abv.bg',
            },
            {
                name: 'Misho',
                email: 'misholibre@abv.bg',
            },
            {
                name: 'Petran',
                email: 'petrohanaMiElubim@abv.bg',
            }
        ]
    });
});
app.listen(3000);