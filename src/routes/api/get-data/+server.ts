import { json, error } from '@sveltejs/kit';
import { z } from 'zod';
import { extractSubjectData, formatContents } from '$lib/server/ai';
import { extractDataPrompt } from '$lib/server/prompts';
import { GetDataRequestSchema, GetDataResponseSchema } from '$lib/schemas/get-data';

async function fileToBase64(file: File): Promise<{ data: string; mimeType: string }> {
	const arrayBuffer = await file.arrayBuffer();
	const base64 = Buffer.from(arrayBuffer).toString('base64');
	return {
		data: base64,
		mimeType: file.type
	};
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const formData = await request.formData();
		const fileEntry = formData.get('file') as File | null;
		const textEntry = formData.get('text') as string | null;
		let fileData;
		if (fileEntry && fileEntry instanceof File && fileEntry.size > 0) {
			fileData = await fileToBase64(fileEntry);
		}
		const requestData = {
			file: fileData,
			text: textEntry || undefined
		};
		const validatedData = GetDataRequestSchema.parse(requestData);
		if (!validatedData.file && !validatedData.text) {
			error(400, 'Either file or text must be provided');
		}

		// Process AI

		const contents = await formatContents(
			extractDataPrompt,
			validatedData.file,
			validatedData.text
		);

		console.log(contents);

		const processedData = await extractSubjectData(contents);

		console.log(processedData);

		const responseData = {
			success: true,
			data: processedData
		};

		// Validate response data
		const validatedResponse = GetDataResponseSchema.parse(responseData);
		return json(validatedResponse);
	} catch (err) {
		if (err instanceof z.ZodError) {
			error(400, `Validation error: ${err.issues.map((e: any) => e.message).join(', ')}`);
		}

		console.error('Error processing request:', err);
		error(500, 'Internal server error');
	}
}

/** @type {import('./$types').RequestHandler} */
export function fallback({ request }) {
	return new Response(`Method ${request.method} not allowed`, {
		status: 405,
		headers: { allow: 'POST' }
	});
}
