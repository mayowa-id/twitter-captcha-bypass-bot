const puppeteer = require('puppeteer-extra');
const StealPlugin = require('puppeteer-extra-plugin-stealth');
const {randomDelay} = require('./utils');

puppeteer.use(StealPlugin());

async function launchBrowser() {
    return await puppeteer.launch({
        headless: false, 
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
}

async function runCaptchaFlow(page) {
    try {
        console.log('[*] Waiting for CAPTCHA iframe...');
        
        // Wait for the dummy captcha iframe (not arkose)
        await page.waitForSelector('iframe[src*="dummy-captcha"]', { timeout: 10000 });
        
        const frameHandle = await page.$('iframe[src*="dummy-captcha"]');
        const frame = await frameHandle.contentFrame();
        
        if (!frame) {
            throw new Error('Could not access iframe content');
        }
        
        console.log('[*] Found CAPTCHA iframe, starting solving process...');
        
        // Wait for canvas to be ready
        await frame.waitForSelector('#captcha-canvas', { timeout: 5000 });
        
        console.log('[*] Simulating human-like CAPTCHA solving...');
        
        // Simulate human behavior - move mouse around first
        await page.mouse.move(200, 200, { steps: 10 });
        await randomDelay(500, 1000);
        
        // Click the canvas multiple times (our CAPTCHA needs 3+ clicks)
        for (let i = 0; i < 4; i++) {
            console.log(`[*] Click ${i + 1}/4 on CAPTCHA canvas...`);
            
            // Click different areas of the canvas to simulate solving
            const clickX = 50 + (i * 50); // Different x positions
            const clickY = 40 + (i * 10);  // Slightly different y positions
            
            await frame.evaluate((x, y) => {
                const canvas = document.getElementById('captcha-canvas');
                if (canvas) {
                    // Create a click event at specific coordinates
                    const rect = canvas.getBoundingClientRect();
                    const event = new MouseEvent('click', {
                        clientX: rect.left + x,
                        clientY: rect.top + y,
                        bubbles: true
                    });
                    canvas.dispatchEvent(event);
                }
            }, clickX, clickY);
            
            await randomDelay(800, 1500); // Human-like delay between clicks
        }
        
        console.log('[*] Waiting for CAPTCHA to be marked as solved...');
        
        // Wait for the verify button to be enabled
        await frame.waitForSelector('#verify-btn:not([disabled])', { timeout: 5000 });
        
        console.log('[*] CAPTCHA solved! Clicking verify button...');
        
        // Click the verify button
        await frame.click('#verify-btn');
        await randomDelay(1000, 2000);
        
        console.log('[*] Waiting for form submit button to be enabled...');
        
        // Wait for the main form's submit button to be enabled
        await page.waitForSelector('#submit-btn:not([disabled])', { timeout: 5000 });
        
        console.log('[✓] CAPTCHA flow completed successfully!');
        return true;
        
    } catch (error) {
        console.error('[!] CAPTCHA flow error:', error.message);
        
        // Debug: Take a screenshot to see what's happening
        try {
            await page.screenshot({ path: 'captcha-debug.png', fullPage: true });
            console.log('[*] Debug screenshot saved as captcha-debug.png');
        } catch (screenshotError) {
            console.error('[!] Could not take debug screenshot:', screenshotError.message);
        }
        
        return false;
    }
}

// Alternative function for real FunCaptcha (keep for reference)
async function runRealFunCaptchaFlow(page) {
    try {
        console.log('[*] Waiting for real FunCaptcha frame...');
        await page.waitForSelector('iframe[src*="arkose"]', { timeout: 10000 });

        const frameHandle = await page.$('iframe[src*="arkose"]');
        const frame = await frameHandle.contentFrame();

        console.log('[*] Simulating interaction with real FunCaptcha...');
        await randomDelay(1000, 2000);

        await frame.evaluate(() => {
            const dummyBtn = document.querySelector('canvas');
            if (dummyBtn)
                dummyBtn.click();
        });

        await randomDelay(1000, 2000);
        return true; 
    } catch (error) {
        console.error('[!] Real FunCaptcha flow error:', error.message);
        return false; 
    }
}

module.exports = {launchBrowser, runCaptchaFlow, runRealFunCaptchaFlow};