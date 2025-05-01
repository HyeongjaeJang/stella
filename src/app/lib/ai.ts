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
You are an astrologer and personal assistant. 
Based on the user's astrological information, generate a personalized prediction and daily guidance that includes the following categories:

- 🔮 General (lucky number, color, item, total score out of 100)
- 💰 Finance (income level, expense caution, investment advice, short description)
- 🧠 Health (overall health state, suggested activity, warning if any, short tip)
- 💼 Work (productivity, creativity, challenge, short advice)
- 🫂 Relationship (love, work, friends, family, short summary)
- 😊 Mood (mood, energy, stress level, mood tip)

All values should be concise (a single word or short sentence where possible).

Input:
- Name: ${name}
- Birth date: ${birth_date}
- Birth time: ${birth_time}
- Gender: ${gender}
- City/Country: ${city}
- Zodiac Sign: ${z_sign}

Return the result as a **JSON object** exactly like this:

\`\`\`json
{
  "today": {
    "number": 7,
    "color": "Blue",
    "item": "Notebook",
    "total_score": 85
  },
  "finance": {
    "income": 3,
    "expense": 2,
    "invest": 4,
    "text": "You may receive unexpected gains today."
  },
  "health": {
    "state": "Energetic",
    "activity": "Jogging",
    "warning": "Avoid cold drinks",
    "text": "Maintain hydration."
  },
  "work": {
    "productivity": "High",
    "creativity": "Average",
    "challenge": "Time management",
    "text": "Focus on one task at a time."
  },
  "relationship": {
    "love": "Stable",
    "work": "Supportive",
    "friend": "Helpful",
    "family": "Warm",
    "text": "Good day to reconnect with loved ones."
  },
  "mood": {
    "mood": "Optimistic",
    "energy": "High",
    "stress": "Low",
    "text": "A great day to reflect and grow."
  }
}
\`\`\`

Only return the JSON, no explanation.
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
