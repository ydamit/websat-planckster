/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import OpenAI from "openai";
import env from "~/lib/infrastructure/server/config/env";

const openaiClient = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
});

export default openaiClient;