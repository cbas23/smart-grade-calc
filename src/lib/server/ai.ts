import { env } from '$env/dynamic/private';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateObject, generateText } from 'ai';
import { getSubjectDataPrompt } from './prompts';
import { SubjectDataSchema } from '../schemas/get-data';

export const openRouter = createOpenRouter({
	apiKey: env.OPENROUTER_API_KEY
});

interface FileData {
	data: string;
	mimeType: string;
}

export async function formatContents(
	prompt: string,
	file?: FileData,
	desc?: string
): Promise<string> {
	let fileSection: any[] = [];
	if (file) {
		fileSection = [
			{
				type: 'file',
				data: file.data,
				mediaType: file.mimeType
			}
		];
	}
	const result = generateText({
		model: openRouter('x-ai/grok-4-fast'),
		prompt: [
			{
				content: prompt,
				role: 'system'
			},
			{
				content: [
					...fileSection,
					{
						type: 'text',
						text: desc ?? 'extract contents of the file only'
					}
				],
				role: 'user'
			}
		]
	});

	return (await result).text;
}

export async function extractSubjectData(content: string) {
	const result = generateObject({
		model: openRouter('x-ai/grok-4-fast'),
		schema: SubjectDataSchema,
		prompt: getSubjectDataPrompt + '\n\n' + content
	});
	return (await result).object;
}
