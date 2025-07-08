const express = require('express'); 
const path = require('path'); 

const startTestServer = (port = 3000) => {
    const app = express();
    app.use('/public', express.static(path.join(__dirname, '../public')));
    
    // Add a basic route for testing
    app.get('/', (req, res) => {
        res.send('<h1>Server is running!</h1><a href="/public/dummy-form.html">Go to test form</a>');
    });
    
    return new Promise((resolve) => {
        const server = app.listen(port, () => {
            console.log(`[+] Test server running on http://localhost:${port}`); 
            console.log(`[+] Test form available at: http://localhost:${port}/public/dummy-form.html`);
            resolve(server);
        });
    });
}

function randomDelay(min, max) {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;
        setTimeout(resolve, delay);
    }); 
}

module.exports = {randomDelay, startTestServer};