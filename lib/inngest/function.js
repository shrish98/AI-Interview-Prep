import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// FIX 1: Updated model name
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const generateIndustryInsights = inngest.createFunction(
    { name: "Generate Industry Insights" },
    { cron: "0 0 * * 0" }, // Run every Sunday at midnight
    async ({ event, step }) => {
        // FIX 2: Also fetch subIndustry so we can use the compound key
        const industries = await step.run("Fetch industries", async () => {
            return await db.industryInsight.findMany({
                select: { industry: true, subIndustry: true },
            });
        });

        for (const { industry, subIndustry } of industries) {
            const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRange": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

            const res = await step.ai.wrap(
                "gemini",
                async (p) => {
                    return await model.generateContent(p);
                },
                prompt
            );

            const text = res.response.candidates[0].content.parts[0].text || "";
            const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

            // FIX 3: Wrap JSON.parse in try/catch to handle unexpected AI responses
            let insights;
            try {
                insights = JSON.parse(cleanedText);
            } catch (e) {
                console.error(`Failed to parse AI response for ${industry}:`, cleanedText.slice(0, 100));
                continue; // Skip this industry and move to the next
            }

            // FIX 2: Use compound unique key (industry + subIndustry)
            await step.run(`Update ${industry} - ${subIndustry} insights`, async () => {
                await db.industryInsight.update({
                    where: {
                        industry_subIndustry: {
                            industry,
                            subIndustry,
                        },
                    },
                    data: {
                        ...insights,
                        lastUpdated: new Date(),
                        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    },
                });
            });
        }
    }
);