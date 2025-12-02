const path = require('path');
const dbPath = './api/database.json';
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults({ static: "./src" });
const port = process.env.PORT || 5002;

server.use(middlewares);

server.use((req, res, next) => {
    // Check if the request is for the root path or an API route
    const isApiRoute = req.originalUrl.startsWith('/api/');
    const isRoot = req.originalUrl === '/';

    if (isApiRoute) {
        // If it's an API route, proceed to the next middleware (json-server router)
        return next();
    }

    // If it's a root request, serve index.html
    if (isRoot) {
        return res.sendFile(path.join(__dirname, './src/index.html'));
    }

    // For all other requests (e.g., static assets like JS, CSS, images),
    // let the default static middleware handle them.
    next();
});

server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}));

server.use(router);

server.listen(port, () => {
    console.log(`Application running on port ${port}`);
});