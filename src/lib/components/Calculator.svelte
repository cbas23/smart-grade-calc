<script lang="ts">
	import type { SubjectData, Section } from '$lib/subjectData.svelte';

	interface Props {
		data: SubjectData;
	}

	let { data }: Props = $props();

	let finalGrade: string = $derived.by(() => {
		// Calculate weighted percentage
		let totalWeightedScore = 0;
		let totalWeightedMax = 0;
		for (const section of data.sections) {
			totalWeightedScore += (section.points / section.maxPoints) * section.weight;
			totalWeightedMax += section.weight;
		}
		const percentage = totalWeightedMax > 0 ? totalWeightedScore / totalWeightedMax : 0;
		// Find letter grade using gradeScale
		for (const [threshold, grade] of data.gradeScale) {
			if (percentage >= threshold) {
				return grade;
			}
		}
		return 'F'; // Default if no match found
	});

	let percentage: number = $derived.by(() => {
		let totalWeightedScore = 0;
		let totalWeightedMax = 0;
		for (const section of data.sections) {
			totalWeightedScore += (section.points / section.maxPoints) * section.weight;
			totalWeightedMax += section.weight;
		}
		return totalWeightedMax > 0 ? totalWeightedScore / totalWeightedMax : 0;
	});

	let gradeColor: string = $derived.by(() => {
		if (finalGrade.indexOf('A') != -1) return 'text-green-600';
		if (finalGrade.indexOf('B') != -1) return 'text-sky-600';
		if (finalGrade.indexOf('C') != -1) return 'text-amber-600';
		if (finalGrade.indexOf('D') != -1) return 'text-orange-600';
		return 'text-red-600';
	});

	let sectionDetails = $derived.by(() => {
		return data.sections.map((section) => {
			const sectionPercentage = section.maxPoints > 0 ? section.points / section.maxPoints : 0;
			const contributionToFinal = sectionPercentage * section.weight;
			const letterGrade = (() => {
				for (const [threshold, grade] of data.gradeScale) {
					if (sectionPercentage >= threshold) {
						return grade;
					}
				}
				return 'F';
			})();

			return {
				...section,
				sectionPercentage,
				contributionToFinal,
				letterGrade
			};
		});
	});
</script>

<div class="flex w-full flex-1 flex-row gap-8">
	<div class="flex flex-1 flex-col gap-4 overflow-y-scroll">
		{#each data.sections as section}
			{@render sectionBlock(section)}
		{/each}
	</div>
	<div class="flex flex-1 flex-col rounded-sm border border-gray-400 p-4">
		<h2 class="text-xl font-bold">Your Final Grade is:</h2>
		<div class="flex flex-1 flex-col items-center justify-center">
			<span class="text-9xl {gradeColor} font-bold">
				{finalGrade}
			</span>
			<span class="text-gray-500">Total Grade: {(percentage * 100).toFixed(2)}%</span>
		</div>

		<!-- Grade Summary Table -->
		<div class="mt-6">
			<h3 class="mb-3 text-lg font-semibold">Grade Breakdown</h3>
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-gray-300">
							<th class="px-2 py-2 text-left">Section</th>
							<th class="px-2 py-2 text-center">Score</th>
							<th class="px-2 py-2 text-center">Weight</th>
							<th class="px-2 py-2 text-center">Contribution</th>
						</tr>
					</thead>
					<tbody>
						{#each sectionDetails as detail}
							<tr class="border-b border-gray-200">
								<td class="px-2 py-2 font-medium">{detail.title}</td>
								<td class="px-2 py-2 text-center">{(detail.sectionPercentage * 100).toFixed(1)}%</td
								>
								<td class="px-2 py-2 text-center">{(detail.weight * 100).toFixed(1)}%</td>
								<td class="px-2 py-2 text-center font-semibold"
									>{(detail.contributionToFinal * 100).toFixed(2)}%</td
								>
							</tr>
						{/each}
						<tr class=" border-t-2 border-t-gray-300 font-semibold">
							<td class="px-2 py-2">Total</td>
							<td class="px-2 py-2 text-center">{(percentage * 100).toFixed(2)}%</td>
							<td class="px-2 py-2 text-center"> </td>
							<td class="px-2 py-2 text-center">100.0%</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<!-- SNIPPETS -->

{#snippet sectionBlock(section: Section)}
	<div class="flex flex-row items-center rounded-sm border border-gray-400 p-4">
		<div class="flex flex-1 flex-col">
			<span>{section.title}</span>
			<span class="text-gray-500">Weight: {(section.weight * 100).toFixed(1)}%</span>
		</div>
		<div>
			<input
				type="number"
				class="w-24 flex-1 rounded-sm border-2 border-gray-300 p-2 text-gray-700 transition-colors focus:border-sky-600 focus:outline-none"
				bind:value={section.points}
				min="0"
				max={section.maxPoints}
			/>
			/
			{section.maxPoints}
		</div>
	</div>
{/snippet}
