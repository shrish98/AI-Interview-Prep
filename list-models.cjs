const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        const fetch = global.fetch;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        console.log("Available Models:");
        data.models.forEach(model => {
            if (model.supportedGenerationMethods.includes("generateContent")) {
                console.log(`- ${model.name}`);
            }
        });
    } catch (err) {
        console.error("Error fetching models:", err);
    }
}

listModels();
