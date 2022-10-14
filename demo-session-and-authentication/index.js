const server = require("http")
    .createServer((req, res) => {
        if (req.url == "/") {
            action(req, res);
        } else {
            res.writeHead(404);
            res.end();
        }
    })
    .listen(3000);

function parseCookie(req) {
    if (req.headers.cookie) {
        const cookies = Object.fromEntries(
            req.headers.cookie
            .split(";")
            .map((c) => c.trim())
            .map((c) => c.split("= "))
        );
        console.log(cookies);
        return cookies;
    }
    return {};
}

const sessions = {};

function action(req, res) {
    const cookies = parseCookie(req);
    const sessionId =
        cookies.sessionId || ('000000000' +
            Math.floor(Math.random() * 999999999)).toString(16);
    const session = sessions[sessionId] || {};

    //do stuff
    session.visited = (session.visited || 0) + 1;
    console.log('SESSION = ', session);
    sessions[sessionId] = session;
    console.log(sessionId)


    res.end();
}