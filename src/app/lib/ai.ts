import dotenv from "dotenv";
dotenv.config();
import OpenAi from "openai";
import { Information } from "@/types/types";

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
