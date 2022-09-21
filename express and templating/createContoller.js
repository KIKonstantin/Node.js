const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    res.send(
        '<form method="POST"><input name="name"><button>SEND</button></form>'
    );
});

router.post("/", (req, res) => {
    res.end();
});

module.exports = router;