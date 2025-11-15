<script lang="ts">
	import type { SubjectData } from '$lib/subjectData.svelte';
	import type { GetDataResponse } from '$lib/schemas/get-data';

	// State for drag and drop
	let selectedFile = $state<File | null>(null);
	let descriptionText = $state<string>('');
	let errorMessage = $state<string>('');

	const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10MB

	interface Props {
		data: SubjectData;
	}

	let { data }: Props = $props();

	// Handle drag events
	function handleDragEnter(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		errorMessage = '';
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
	}

	// Handle file drop
	function handleDrop(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		errorMessage = '';
		const files = e.dataTransfer?.files;
		if (!files || files.length === 0) {
			errorMessage = 'No files dropped';
			return;
		}
		if (files.length > 1) {
			errorMessage = 'Please drop only one file';
			return;
		}
		const file = files[0];
		selectedFile = file;
	}

	// Handle file selection via input
	function handleFileSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		const files = target.files;

		if (files && files.length > 0) {
			selectedFile = files[0];
			errorMessage = '';
		}
	}

	// Clear selected file
	function clearFile() {
		selectedFile = null;
		errorMessage = '';
	}

	// Format file size
	function formatFileSize(bytes: number): string {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
	}

	// handle submit
	async function handleSubmit() {
		try {
			if (selectedFile) {
				if (selectedFile.size > MAX_FILE_SIZE) {
					errorMessage = `File size exceeds ${formatFileSize(MAX_FILE_SIZE)}`;
					return;
				}
				console.log('Submitting file:', selectedFile);
				console.log('Submitting description:', descriptionText);

				data.mode = 'loading';

				const formData = new FormData();
				formData.append('file', selectedFile);
				if (descriptionText.trim()) {
					formData.append('text', descriptionText);
				}

				// Make POST request to the API endpoint
				const response = await fetch('/api/get-data', {
					method: 'POST',
					body: formData
				});

				if (!response.ok) {
					const errorText = await response.text();
					let errorMessage = 'Failed to process file';
					try {
						const errorData = JSON.parse(errorText) as { message?: string };
						errorMessage = errorData.message || errorMessage;
					} catch {
						// If parsing fails, use the error text directly
						errorMessage = errorText || errorMessage;
					}
					throw new Error(errorMessage);
				}

				const result = (await response.json()) as GetDataResponse;
				console.log('API response:', result);

				// Update the data with the response
				if (result.success && result.data) {
					// Assuming the result.data contains the processed information
					// You might need to adjust this based on your actual data structure
					// For now, let's just log it and set the mode to ready
					console.log('Processed data:', result.data);
				}

				data.mode = 'ready';
				return;
			}

			errorMessage = '';
			console.log('Submitting description:', descriptionText);

			if (!descriptionText.trim()) {
				errorMessage = 'Please enter a description or select a file';
				return;
			}

			data.mode = 'loading';

			// Create FormData for the POST request
			const formData = new FormData();
			formData.append('text', descriptionText);

			// Make POST request to the API endpoint
			const response = await fetch('/api/get-data', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				const errorText = await response.text();
				let errorMessage = 'Failed to process text';
				try {
					const errorData = JSON.parse(errorText) as { message?: string };
					errorMessage = errorData.message || errorMessage;
				} catch {
					// If parsing fails, use the error text directly
					errorMessage = errorText || errorMessage;
				}
				throw new Error(errorMessage);
			}

			const result = (await response.json()) as GetDataResponse;
			console.log('API response:', result);

			// Update the data with the response
			if (result.success && result.data) {
				// Assuming the result.data contains the processed information
				// You might need to adjust this based on your actual data structure
				// For now, let's just log it and set the mode to ready
				console.log('Processed data:', result.data);
			}

			data.mode = 'ready';
		} catch (error) {
			console.error('Error submitting data:', error);
			errorMessage =
				error instanceof Error ? error.message : 'An error occurred while processing your request';
			data.mode = 'ready';
		}
	}
</script>

<div class="flex h-full flex-col p-4">
	<!-- Dropzone -->
	<div
		class="flex flex-2 flex-col items-center justify-center gap-8 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-gray-400"
		ondragenter={handleDragEnter}
		ondragover={handleDragOver}
		ondrop={handleDrop}
		role="button"
		tabindex="0"
	>
		{#if selectedFile}
			<div class="space-y-2">
				<p class="font-medium text-sky-600">File selected:</p>
				<p class="text-sm text-gray-600">{selectedFile.name}</p>
				<p class="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
			</div>
		{:else}
			<p class="text-gray-500">
				Drag and drop a your Syllabus here, or click the button below to start
			</p>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="72"
				height="72"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="icon icon-tabler icons-tabler-outline icon-tabler-upload text-gray-500"
				><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
					d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"
				/><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg
			>
		{/if}
	</div>

	<!-- Upload button -->
	<div class="mt-4">
		<input type="file" id="file-input" class="hidden" onchange={handleFileSelect} />
		<label
			for="file-input"
			class="inline-block cursor-pointer rounded-sm bg-sky-600 px-4 py-2 text-white transition-colors hover:bg-sky-700"
		>
			Choose File
		</label>
		{#if selectedFile}
			<button
				onclick={clearFile}
				class="ml-2 rounded-sm bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
			>
				Clear
			</button>
		{/if}
	</div>

	<!-- Error message -->
	{#if errorMessage}
		<div class="mt-2 text-sm text-red-600">
			{errorMessage}
		</div>
	{/if}

	<!-- Text input box -->
	<div class="mt-8 flex flex-1 flex-col">
		<p class="text-gray-500">Or enter the description of your syllabus here</p>
		<textarea
			class="mt-4 flex-1 resize-none rounded-sm border-2 border-gray-300 p-2 text-gray-700 placeholder-gray-400 transition-colors focus:border-sky-600 focus:outline-none"
			placeholder="Enter your syllabus description here..."
			bind:value={descriptionText}
		></textarea>
	</div>

	<!-- Submit button -->
	<button
		onclick={handleSubmit}
		class="mt-4 rounded-sm bg-sky-600 px-4 py-2 text-white transition-colors hover:bg-sky-700"
	>
		Submit
	</button>
</div>
