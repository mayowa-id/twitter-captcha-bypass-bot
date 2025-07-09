##FunCaptcha Bypass Bot (Twitter Edition)


This project is a browser automation bot built with Node.js, Puppeteer, and stealth techniques to bypass Arkose Labs’ FunCaptcha challenges, such as those found on Twitter login pages. It mimics human interaction and supports both testing via a dummy form and live CAPTCHA bypass on Twitter (burner account recommended).

> ⚠️ **For educational purposes only. Do not use on real accounts or services without permission.**

---

##  Features
✅ Supports real FunCaptcha (Arkose Labs) challenges

✅ Headless/stealth browser mode with Puppeteer

✅ Human-like mouse movements and delays

✅ Auto CAPTCHA solving retries (up to 3 times)

✅ Login outcome detection

✅ CLI toggle for test vs real Twitter login

✅ Debug screenshot on failure

✅ .env-based configuration
---

## Tech Stack

- Node.js + Puppeteer
- puppeteer-extra + stealth plugin
- 2Captcha API (for token solving)
- Express (for local test CAPTCHA)
- dotenv

---

## Setup Instructions

### 1. Clone this repo
bash
git clone https://github.com/yourusername/fun-captcha-bypass-bot.git
cd fun-captcha-bypass-bot


###2. Install Dependencies - npm install

###3. Set env variables

###4. Run the bot
##Running the Bot
Option 1: Dummy CAPTCHA Test (local form)

Copy code
node src/bot.js
Starts a local Express server.

Opens a test page with a simulated CAPTCHA.

Shows mouse movement, clicks, and successful form submission.

Option 2: Twitter CAPTCHA Bypass (Real Test)
bash
Copy code
node src/bot.js --twitter
Logs into Twitter using credentials from .env.

Solves CAPTCHA using human-like simulation.

Verifies login outcome and prints result.



PROJECT STRUCTURE
├── src/
│   ├── bot.js         // Entry point script
│   ├── solver.js      // CAPTCHA solver logic
│   └── utils.js       // Helper methods (random delay, server start)
├── public/
│   ├── dummy-form.html     // Test form
│   └── dummy-captcha.html  // Fake iframe CAPTCHA


🧠 ## How CAPTCHA Bypass Works
-Stealth mode avoids fingerprint detection using puppeteer-extra-plugin-stealth

-Human simulation moves mouse, introduces delays, clicks strategic canvas points

-Retry logic attempts CAPTCHA solving multiple times if needed

-Real FunCaptcha tokens can be optionally solved with services like 2Captcha


