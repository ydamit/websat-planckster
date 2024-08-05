/**
 * This file is included in `/next.config.js` which ensures the app isn't built with invalid env vars.
 * It has to be a `.js`-file to be imported there.
 */

import { z } from "zod";

const clientEnvSchema = z.object({
  //   NEXT_PUBLIC_CLIENTVAR: z.string(),
});

const runtimeEnv = {
  //   NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
};

const skipValidation = process.env.SKIP_ENV_VALIDATION === "true";
let env = runtimeEnv;

if (skipValidation) {
  console.warn(
    "⚠️ Skipping client environment variables validation. This is dangerous in production.",
  );
} else {
  const envValidationResult = clientEnvSchema.safeParse(runtimeEnv);
  if (!envValidationResult.success) {
    throw new Error(
      "❌ Invalid client environment variables: " +
        JSON.stringify(envValidationResult.error.format(), null, 4),
    );
  }
}

export default env