# Simran Kaur — Portfolio

Modern glassmorphism portfolio with AI chat powered by Groq API.

## Setup

```bash
npm install
```

Create a `.env` file:
```
GROQ_API_KEY=your_groq_api_key_here
```

Run locally:
```bash
npm run dev
```

## Deploy to Vercel

1. Push to GitHub
2. Import repo in Vercel
3. Add environment variable: `GROQ_API_KEY`
4. Deploy!

## Structure
```
portfolio/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js        # Node.js + Express + Groq API
├── vercel.json      # Vercel deployment config
└── package.json
```