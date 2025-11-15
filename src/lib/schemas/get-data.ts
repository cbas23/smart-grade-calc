import { z } from 'zod';

// Schema for file data structure
export const FileDataSchema = z.object({
	data: z.string(),
	mimeType: z.string()
});

// Schema for request input validation
export const GetDataRequestSchema = z.object({
	file: FileDataSchema.optional(),
	text: z.string().optional()
}).refine(
	(data) => data.file || data.text,
	{
		message: "Either file or text must be provided",
		path: ["root"]
	}
);

// Schema for API response
export const GetDataResponseSchema = z.object({
	success: z.boolean(),
	data: z.any(), // The actual data structure depends on what the AI returns
	message: z.string().optional()
});

// Type exports for TypeScript usage
export type FileData = z.infer<typeof FileDataSchema>;
export type GetDataRequest = z.infer<typeof GetDataRequestSchema>;
export type GetDataResponse = z.infer<typeof GetDataResponseSchema>;
