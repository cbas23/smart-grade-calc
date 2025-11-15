<script lang="ts">
	const textLines = [
		'Analyzing syllabus structure...',
		'Extracting course objectives...',
		'Identifying assessment components...',
		'Parsing grading criteria...',
		'Detecting assignment categories...',
		'Processing weight distribution...',
		'Analyzing evaluation methods...',
		'Identifying learning outcomes...',
		'Processing attendance policies...',
		'Extracting project requirements...',
		'Analyzing exam formats...',
		'Detecting participation metrics...',
		'Processing rubric elements...',
		'Calculating grade boundaries...',
		'Generating grading scheme...',
		'Finalizing assessment framework...'
	];

	let text = $state('Loading...');

	setInterval(() => {
		const randomIndex = Math.floor(Math.random() * textLines.length);
		text = textLines[randomIndex];
	}, 2000);
</script>

<div class="flex h-full flex-col items-center justify-center gap-8">
	<div class="text-2xl">{text}</div>
	<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
		><rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1"
			><animate
				id="SVG7WybndBt"
				fill="freeze"
				attributeName="x"
				begin="0;SVGo3aOUHlJ.end"
				dur="0.2s"
				values="1;13"
			/><animate
				id="SVGVoKldbWM"
				fill="freeze"
				attributeName="y"
				begin="SVGFpk9ncYc.end"
				dur="0.2s"
				values="1;13"
			/><animate
				id="SVGKsXgPbui"
				fill="freeze"
				attributeName="x"
				begin="SVGaI8owdNK.end"
				dur="0.2s"
				values="13;1"
			/><animate
				id="SVG7JzAfdGT"
				fill="freeze"
				attributeName="y"
				begin="SVG28A4To9L.end"
				dur="0.2s"
				values="13;1"
			/></rect
		><rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1"
			><animate
				id="SVGUiS2jeZq"
				fill="freeze"
				attributeName="y"
				begin="SVG7WybndBt.end"
				dur="0.2s"
				values="13;1"
			/><animate
				id="SVGU0vu2GEM"
				fill="freeze"
				attributeName="x"
				begin="SVGVoKldbWM.end"
				dur="0.2s"
				values="1;13"
			/><animate
				id="SVGOIboFeLf"
				fill="freeze"
				attributeName="y"
				begin="SVGKsXgPbui.end"
				dur="0.2s"
				values="1;13"
			/><animate
				id="SVG14lAaeuv"
				fill="freeze"
				attributeName="x"
				begin="SVG7JzAfdGT.end"
				dur="0.2s"
				values="13;1"
			/></rect
		><rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1"
			><animate
				id="SVGFpk9ncYc"
				fill="freeze"
				attributeName="x"
				begin="SVGUiS2jeZq.end"
				dur="0.2s"
				values="13;1"
			/><animate
				id="SVGaI8owdNK"
				fill="freeze"
				attributeName="y"
				begin="SVGU0vu2GEM.end"
				dur="0.2s"
				values="13;1"
			/><animate
				id="SVG28A4To9L"
				fill="freeze"
				attributeName="x"
				begin="SVGOIboFeLf.end"
				dur="0.2s"
				values="1;13"
			/><animate
				id="SVGo3aOUHlJ"
				fill="freeze"
				attributeName="y"
				begin="SVG14lAaeuv.end"
				dur="0.2s"
				values="1;13"
			/></rect
		></svg
	>
</div>
