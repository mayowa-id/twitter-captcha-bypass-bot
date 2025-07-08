const { launchBrowser, runCaptchaFlow } = require('./solver');
const { randomDelay, startTestServer } = require('./utils');
require('dotenv').config();



(async () => {
    console.log('[+] Starting CAPTCHA bypass bot...');

    // Start the test server first
    const server = await startTestServer();
    
    // Give server a moment to fully start
    await randomDelay(1000, 1500);

    const browser = await launchBrowser();
    const page = await browser.newPage(); 

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36');
    console.log('[+] Navigating to test page...');

    try {
await page.goto('https://twitter.com/login', { waitUntil: 'networkidle0' });
await randomDelay(2000, 3000);

await page.type('input[name="text"]', process.env.TWITTER_USERNAME);
await page.keyboard.press('Enter');
await page.waitForSelector('input[name="password"]', { timeout: 10000 });
await page.type('input[name="password"]', process.env.TWITTER_PASSWORD);
await page.keyboard.press('Enter');

// Run FunCaptcha bypass (only if triggered)
const captchaSolved = await runRealFunCaptchaFlow(page);
if (captchaSolved) {
    console.log('[✓] CAPTCHA handled and login attempt sent.');
} else {
    console.warn('[!] CAPTCHA bypass not needed or failed.');
}

    } catch (error) {
        console.error('[✗] Error during bot execution:', error.message);
    } finally {
        await browser.close();
        // server.close(); // Close the server when done
        console.log('[+] Bot execution completed');
    }
})();