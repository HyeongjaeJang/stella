"use server";

import dotenv from "dotenv";
dotenv.config();
import OpenAi from "openai";
import {
  Information,
  Zinfo,
  ZodiacGeneratedData,
  ZodiaWeeklyWorkType,
  ZodiacWeeklyPeopleType,
  ZodiacWeeklyFinanceType,
  ZodiacWeeklyHealthType,
  ZodiacWeeklyMoodType,
  Info,
  CompatibilityGeneratedData,
} from "@/types/types";

const client = new OpenAi({ apiKey: process.env.OPENAI_API_KEY });

export const getZodiac = async ({
  name,
  birth_date,
  birth_time,
  gender,
  city_country,
}: Information) => {
  const prompt = `Based on the following birth details, return only the astrological zodiac sign (Sun sign) without any additional explanation or text.\n\n{name: ${name}, birth Date: ${birth_date}, birth time: ${birth_time}, born city: ${city_country}, gender: ${gender}}`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("❌ Error fetching zodiac sign:", error);
    return "";
  }
};

export const getZodiacData = async (
  data: Zinfo,
): Promise<ZodiacGeneratedData | null> => {
  const { name, birth_date, birth_time, gender, city, z_sign } = data;

  const prompt = `
You are an expert astrologer and personal life assistant.

Based on the user's full astrological profile, generate **unique and personalized** daily predictions across the following categories. 
Make sure the responses vary meaningfully for different zodiac signs, birth times, and locations, so that each user receives distinct guidance.

Categories to include:

- 🔮 General (lucky number, color, item, short inspirational message, total score out of 100)
- 💰 Finance (income outlook, spending caution, investment mood, finance tip)
- 🧠 Health (physical state, suggested activity, any health warning, health tip)
- 💼 Work (focus level, creativity level, key challenge, brief advice)
- 🫂 Relationship (status with love, colleagues, friends, family; summary sentence)
- 😊 Mood (overall mood, energy, stress level, short emotional tip)

Keep all responses **short, natural, and varied** — avoid repetition across different users.
The tone should be positive but realistic. Don't repeat the same adjectives across different categories.

User Info:
- Name: ${name}
- Birth date: ${birth_date}
- Birth time: ${birth_time}
- Gender: ${gender}
- City/Country: ${city}
- Zodiac Sign: ${z_sign}

Return the result strictly as a JSON object like the format below — do not include any explanations, extra text, or markdown code blocks:

{
  "today": {
    "number": ..., Integer (1–9)
    "color": "...",
    "item": "...",
    "text": "...",
    "total_score": ... Integer (0–100)
  },
  "finance": {
    "income": ..., Integer (1–10)
    "expense": ..., Integer (1–10)
    "invest": ..., Integer (1–10)
    "text": "..."
  },
  "health": {
    "state": "...",
    "activity": "...",
    "warning": "...",
    "text": "..."
  },
  "work": {
    "productivity": "...",
    "creativity": "...",
    "challenge": "...",
    "text": "..."
  },
  "relationship": {
    "love": "...",
    "work": "...",
    "friend": "...",
    "family": "...",
    "text": "..."
  },
  "mood": {
    "mood": "...",
    "energy": "...",
    "stress": "...",
    "text": "..."
  }
}
`;
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const raw = completion.choices[0].message.content;
    const cleaned = raw?.replace(/```json\s*|```/g, "").trim();

    const json = JSON.parse(cleaned ?? "{}");
    return json;
  } catch (error) {
    console.error("❌ Error fetching zodiac-based data:", error);
    return null;
  }
};

export const getWeeklyWork = async (
  data: Zinfo,
): Promise<ZodiaWeeklyWorkType | undefined> => {
  const { name, birth_date, birth_time, gender, city, z_sign } = data;

  const prompt = `
You are an astrological life coach.

Based on the user's zodiac and birth data, generate a weekly WORK report with:

🔹 Total Score (0~100)
🔹 Metrics (scale of 0–10):
- Productivity
- Creativity
- Challenge
- Energy

🔹 Summary: Write at least 3 full sentences that provide a meaningful and varied overview of the week. Highlight trends or shifts (e.g., early-week challenges, mid-week growth, weekend rest), not just generic descriptions.
🔹 Daily analysis (Mon–Sun): For each day, write **2 distinct sentences** describing the user's work mindset, productivity, or emotional state. Avoid repeating sentences or phrasing across different days.
🔹 Advice: 1 sentence advice for the week.

Input:
- Name: ${name}
- Birth date: ${birth_date}
- Birth time: ${birth_time}
- Gender: ${gender}
- City/Country: ${city}
- Zodiac Sign: ${z_sign}

Return **only valid JSON** like this:

{
  "summary": "This week begins with some mental fog but clears by Wednesday. You'll find a surprising surge in energy and collaboration mid-week. By the weekend, a more reflective mood sets in, prompting you to refine rather than act.",
  "total_score": 86,
  "productivity": 9,
  "creativity": 6,
  "challenge": 3,
  "energy": 8,
  "days_analysis": {
    "Mon": "It feels hard to get started as distractions pull your focus. Prioritize clarity in your task list.",
    "Tue": "Progress picks up but communication may be unclear. Keep written notes to avoid misunderstandings.",
    "Wed": "A surge of teamwork energy helps you move faster. Delegating tasks will be effective today.",
    "Thu": "You may feel drained but capable of staying on track. A short walk can reset your focus.",
    "Fri": "Tasks feel easier to complete and creativity returns. Use the flow to close open loops.",
    "Sat": "You're reflective but motivated. Use quiet time to brainstorm improvements.",
    "Sun": "Avoid multitasking and stay mindful. Rest will sharpen your thinking for next week."
  },
  "advice": "Balance intensity with recovery—pushing too hard all week may backfire by Sunday."
}
`;
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });
    const raw = completion.choices[0].message.content;
    const cleaned = raw?.replace(/```json\s*|```/g, "").trim();

    const json = JSON.parse(cleaned ?? "{}");
    return json;
  } catch (error) {
    console.error("❌ Error fetching weekly work data:", error);
  }
};

export const getWeeklyPeople = async (
  data: Zinfo,
): Promise<ZodiacWeeklyPeopleType | undefined> => {
  const { name, birth_date, birth_time, gender, city, z_sign } = data;

  const prompt = `
You are a relationship coach and astrologer.

Based on the user's zodiac and birth data, generate a weekly PEOPLE report including:

🔹 Total Score (0~100)
🔹 Metrics (0–10 scale): love, friendship, family, work
🔹 Summary: Write at least 3 full sentences that provide a meaningful and varied overview of the week. Highlight trends or shifts (e.g., early-week challenges, mid-week growth, weekend rest), not just generic descriptions.
🔹 Daily analysis (Mon–Sun): For each day, write **2 distinct sentences** describing the user's mindset, or emotional state. Avoid repeating sentences or phrasing across different days.
🔹 Advice: 1-sentence advice

Input:
- Name: ${name}
- Birth date: ${birth_date}
- Birth time: ${birth_time}
- Gender: ${gender}
- City: ${city}
- Zodiac Sign: ${z_sign}

Return only JSON:
{
  "summary": "...",
  "total_score": 78,
  "love": 8,
  "friendship": 6,
  "family": 7,
  "work": 5,
  "days_analysis": {
    "Mon": "...",
    "Tue": "...",
    ...
  },
  "advice": "..."
}
`;
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });
    const raw = completion.choices[0].message.content;
    const cleaned = raw?.replace(/```json\s*|```/g, "").trim();

    const json = JSON.parse(cleaned ?? "{}");
    return json;
  } catch (error) {
    console.error("❌ Error fetching weekly work data:", error);
  }
};

export const getWeeklyFinance = async (
  data: Zinfo,
): Promise<ZodiacWeeklyFinanceType | undefined> => {
  const { name, birth_date, birth_time, gender, city, z_sign } = data;

  const prompt = `
You are a financial astrologer.

Generate a weekly FINANCE report including:

🔹 Total Score (0–100)
🔹 Metrics (0–10 scale): income, expense, invest
🔹 summary: write at least 3 full sentences that provide a meaningful and varied overview of the week. highlight trends or shifts (e.g., early-week challenges, mid-week growth, weekend rest), not just generic descriptions.
🔹 Daily analysis (Mon–Sun): For each day, write **2 distinct sentences** describing the user's mindset, or emotional state. Avoid repeating sentences or phrasing across different days.
🔹 Advice: 1-sentence for financial balance

Input:
- Name: ${name}
- Birth date: ${birth_date}
- Birth time: ${birth_time}
- Gender: ${gender}
- City: ${city}
- Zodiac Sign: ${z_sign}

Return only JSON:
{
  "summary": "...",
  "total_score": 80,
  "income": 7,
  "expense": 4,
  "invest": 6,
  "days_analysis": {
    "Mon": "...",
    ...
  },
  "advice": "..."
}
`;
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });
    const raw = completion.choices[0].message.content;
    const cleaned = raw?.replace(/```json\s*|```/g, "").trim();

    const json = JSON.parse(cleaned ?? "{}");
    return json;
  } catch (error) {
    console.error("❌ Error fetching weekly work data:", error);
  }
};

export const getWeeklyHealth = async (
  data: Zinfo,
): Promise<ZodiacWeeklyHealthType | undefined> => {
  const { name, birth_date, birth_time, gender, city, z_sign } = data;

  const prompt = `
You are a holistic health astrologer.

Generate a weekly HEALTH report:

🔹 Total Score (0–100)
🔹 Metrics (0–10): state, activity, warning
🔹 summary: write at least 3 full sentences that provide a meaningful and varied overview of the week. highlight trends or shifts (e.g., early-week challenges, mid-week growth, weekend rest), not just generic descriptions.
🔹 Daily analysis (Mon–Sun): For each day, write **2 distinct sentences** describing the user's mindset, or emotional state. Avoid repeating sentences or phrasing across different days.
🔹 Advice: 1-sentence health advice

Input:
- Name: ${name}
- Birth date: ${birth_date}
- Birth time: ${birth_time}
- Gender: ${gender}
- City: ${city}
- Zodiac Sign: ${z_sign}

Return JSON:
{
  "summary": "...",
  "total_score": 73,
  "state": 6,
  "activity": 7,
  "warning": 3,
  "days_analysis": {
    "Mon": "...",
    ...
  },
  "advice": "..."
}
`;
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });
    const raw = completion.choices[0].message.content;
    const cleaned = raw?.replace(/```json\s*|```/g, "").trim();

    const json = JSON.parse(cleaned ?? "{}");
    return json;
  } catch (error) {
    console.error("❌ Error fetching weekly work data:", error);
  }
};

export const getWeeklyMood = async (
  data: Zinfo,
): Promise<ZodiacWeeklyMoodType | undefined> => {
  const { name, birth_date, birth_time, gender, city, z_sign } = data;

  const prompt = `
You are an emotional well-being astrologer.

Create a weekly MOOD report with:

🔹 Total Score (0–100)
🔹 Metrics (0–10): mood, energy, stress
🔹 summary: write at least 3 full sentences that provide a meaningful and varied overview of the week. highlight trends or shifts (e.g., early-week challenges, mid-week growth, weekend rest), not just generic descriptions.
🔹 Daily analysis (Mon–Sun): For each day, write **2 distinct sentences** describing the user's mindset, or emotional state. Avoid repeating sentences or phrasing across different days.
🔹 Advice: 1-sentence mood stabilizer

Input:
- Name: ${name}
- Birth date: ${birth_date}
- Birth time: ${birth_time}
- Gender: ${gender}
- City: ${city}
- Zodiac Sign: ${z_sign}

Return only JSON:
{
  "summary": "...",
  "total_score": 75,
  "mood": 6,
  "energy": 7,
  "stress": 4,
  "days_analysis": {
    "Mon": "...",
    ...
  },
  "advice": "..."
}
`;
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });
    const raw = completion.choices[0].message.content;
    const cleaned = raw?.replace(/```json\s*|```/g, "").trim();

    const json = JSON.parse(cleaned ?? "{}");
    return json;
  } catch (error) {
    console.error("❌ Error fetching weekly work data:", error);
  }
};

export const getCompatibilityData = async (
  user: Info,
  partner: Partial<Info>,
): Promise<CompatibilityGeneratedData | null> => {
  const prompt = `
You are an expert astrologer specializing in relationship compatibility analysis.

Analyze the compatibility between two individuals based on their astrological profiles. 
Provide detailed yet concise insights across the following categories:

1. 🌞 Sun Sign Compatibility:
   - Assess their core personalities, life goals, and general compatibility based on their Sun signs.

2. 🌙 Moon Sign Compatibility:
   - Compare their emotional nature, instinctual reactions, and how they handle feelings.

3. 🗣 Mercury Sign Compatibility:
   - Examine their communication styles, thought processes, and how they connect intellectually.

4. 💘 Venus Sign Compatibility:
   - Assess their approach to love, affection, and romantic inclinations.

5. 🔥 Mars Sign Compatibility:
   - Evaluate their physical energy, desires, and potential conflicts.

For each category, provide a score (1-10) and a brief description of the compatibility. 
Also, include an overall compatibility score (1-100) with a summary sentence.

Use the following structure for the response:

{
  "overall_score": ...,
  "overall_details": "...",
  "user_zodiac": {
    "sun": { "sign": "...", "score": ..., "details": "..." },
    "moon": { "sign": "...", "score": ..., "details": "..." },
    "mercury": { "sign": "...", "score": ..., "details": "..." },
    "venus": { "sign": "...", "score": ..., "details": "..." },
    "mars": { "sign": "...", "score": ..., "details": "..." }
  },
  "partner_zodiac": {
    "sun": { "sign": "...", "score": ..., "details": "..." },
    "moon": { "sign": "...", "score": ..., "details": "..." },
    "mercury": { "sign": "...", "score": ..., "details": "..." },
    "venus": { "sign": "...", "score": ..., "details": "..." },
    "mars": { "sign": "...", "score": ..., "details": "..." }
  },
  "compatibility_data": {
    "sun": { "score": ..., "details": "..." },
    "moon": { "score": ..., "details": "..." },
    "mercury": { "score": ..., "details": "..." },
    "venus": { "score": ..., "details": "..." },
    "mars": { "score": ..., "details": "..." }
  }
}

User Information:
- Name: ${user.name}
- Birth Date: ${user.birth_date?.toISOString().slice(0, 10)}
- Birth Time: ${user.birth_time?.toISOString().split("T")[1].slice(0, 5)}
- Gender: ${user.gender}
- City/Country: ${user.city_country}
- Zodiac Sign: ${user.z_sign}

Partner Information:
- Name: ${partner.name}
- Birth Date: ${partner.birth_date}
- Birth Time: ${partner.birth_time}
- Gender: ${partner.gender}
- City/Country: ${partner.city_country}
- Zodiac Sign: ${partner.z_sign}

Return only the JSON object as described. Do not include any additional explanations or formatting.
`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const raw = completion.choices[0].message.content;
    const cleaned = raw?.replace(/```json\s*|```/g, "").trim();

    const json = JSON.parse(cleaned ?? "{}");
    return json;
  } catch (error) {
    console.error("❌ Error fetching compatibility data:", error);
    return null;
  }
};
