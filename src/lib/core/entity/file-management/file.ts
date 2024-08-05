import { z } from 'zod';


/**
 * Represents a file object.
 */
export const FileSchema = z.object({
    fileName: z.string(),
});

export type TFile = z.infer<typeof FileSchema>;