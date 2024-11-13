import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const promptTemplate = `
  I am a movie recommendation system. Based on the user's input, please generate a list of up to 15 relevant movie or TV show names that match the user’s preferences.

  Return only a plain array of comma-separated movie or TV show titles, each enclosed in double quotes, all within square brackets. No additional text, formatting, or metadata should be included.

  - The 0th element of the array should be a personalized summary message based on the user's request.

  - If the user’s request is vague or random, set the 0th element to:
    "Please provide specific movie preferences for more accurate recommendations."

  Format your response like this:
  [
    "Personalized message based on user input",
    "The Hangover",
    "Superbad",
    "21 Jump Street",
    ...
  ]

  If the user requests information outside of movie recommendations (like detailed descriptions), respond with an array with one item only which state:
  "I’m here to help with movie or show recommendations based on your preferences. If you’re looking for something specific, please let me know what kind of movies or shows you’d like!"


  User's request: ${prompt}
`;

  try {
    const result = await chatSession.sendMessage(promptTemplate);
    return result.response.text();
  } catch (error) {
    return "Some error occured. Try after some time.";
  }
}

export default run;
