# 🌟 Stella – Daily Astrological Insights

Stella is a mobile full-stack astrology-based daily insight application that uses user birth data to generate personalized predictions using OpenAI. It is powered by Next.js, MySQL, and Prisma ORM.

---

## 📦 Requirements

- Node.js (v18+)
- MySQL running locally
- OpenAI API Key

---

## 📁 .env Configuration

Create a `.env` file in the root of your project with the following contents:

```env
AUTH_SECRET="Next.js auth"
DATABASE_URL="mysql url"
OPENAI_API_KEY="your_openai_api_key_here"

---

## How to run
- run mysql database
- npm install
- npx prisma generate --schema ./src/prisma/schema.prisma
- check if 'stella' table is created in mysql
- npm run migrate
- npm run dev
