// utils/ai.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in .env.local
});
const openai = new OpenAIApi(configuration);

/**
 * Verifies if the fare information is reasonable using OpenAI's GPT model.
 * @param {Object} fare - The fare information to verify.
 * @returns {boolean} - Returns true if the fare is reasonable, false otherwise.
 */
export const verifyFare = async (fare) => {
  const prompt = `Is a fare of ${fare.fare} for ${fare.transportationType} in ${fare.city} reasonable? Answer with "yes" or "no".`;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 5,
      temperature: 0, // To get a deterministic response
    });

    const answer = response.data.choices[0].text.trim().toLowerCase();
    return answer === 'yes';
  } catch (error) {
    console.error('AI Verification Error:', error);
    // Default to not verified in case of error
    return false;
  }
};
