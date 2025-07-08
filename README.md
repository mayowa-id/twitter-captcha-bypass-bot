# twitter-captcha-bypass-bot

# 🤖 FunCaptcha Bypass Bot (Twitter Edition)

This project demonstrates a real-world FunCaptcha (Arkose Labs) bypass automation system using **Puppeteer**, **Stealth Plugins**, and optional **2Captcha API** integration — tested on **Twitter’s login flow** using a burner account.

> ⚠️ **For educational purposes only. Do not use on real accounts or services without permission.**

---

##  Features

- Stealth Puppeteer browser with anti-bot evasion.
- Canvas click simulation and human-like interaction.
- Real FunCaptcha token solving with [2Captcha](https://2captcha.com).
- Auto-login and CAPTCHA solving on Twitter.
- Debug screenshots on failure.

---

## Tech Stack

- Node.js + Puppeteer
- puppeteer-extra + stealth plugin
- 2Captcha API (for token solving)
- Express (for local test CAPTCHA)
- dotenv

---

## 🚀 Setup Instructions

### 1. Clone this repo
bash
git clone https://github.com/yourusername/fun-captcha-bypass-bot.git
cd fun-captcha-bypass-bot


###2. Install Dependencies - npm install

###3. Set env variables

###4. Run the bot

PROJECT STRUCTURE
├── src/
│   ├── bot.js         // Entry point script
│   ├── solver.js      // CAPTCHA solver logic
│   └── utils.js       // Helper methods (random delay, server start)
├── public/
│   ├── dummy-form.html     // Test form
│   └── dummy-captcha.html  // Fake iframe CAPTCHA


