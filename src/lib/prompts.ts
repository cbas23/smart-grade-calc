function makeSingleLine(text: string): string {
	return text.replace(/\n/g, ' ');
}

export const extractDataPrompt = `
  Extract All the grading criteria from the given text/file.
  All the data should be in Markdown format.
`;
