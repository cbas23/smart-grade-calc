<script lang="ts">
	import Composer from '$lib/components/Composer.svelte';
	import { SubjectData } from '$lib/subjectData.svelte';

	let tabs: SubjectData[] = $state([new SubjectData()]);
	let activeTab = $state(0);

	function deleteTab(index: number) {
		if (tabs.length > 1) {
			tabs.splice(index, 1);
			if (activeTab >= tabs.length) {
				activeTab = tabs.length - 1;
			}
		}
	}
</script>

<div class="flex h-screen w-screen flex-col">
	<header class="flex h-28 w-full items-center justify-center bg-sky-700 text-white">
		<h1 class="text-center text-3xl font-bold">Grade Calculator</h1>
	</header>

	<!-- Tabs Navigation -->
	<nav class="flex flex-row gap-2 bg-sky-700 px-4">
		{#each tabs as data, i}
			<div
				class="hover: relative flex h-10 max-w-80 flex-1 flex-row items-center justify-end overflow-hidden rounded-t-sm border-gray-400"
			>
				<button
					class="h-full flex-1 transition hover:brightness-80"
					class:bg-gray-100={activeTab === i}
					class:bg-gray-400={activeTab !== i}
					onclick={() => (activeTab = i)}
				>
					{data.tabName}
				</button>
				{#if tabs.length > 1}
					<button
						class="absolute mx-2 flex h-6 w-6 items-center justify-center rounded-sm bg-gray-500 text-white transition-colors hover:bg-gray-600"
						onclick={() => deleteTab(i)}
						aria-label="Delete Tab"
					>
						<span class="icon-[tabler--x]"></span>
					</button>
				{/if}
			</div>
		{/each}

		<button
			class="rounded-t-sm bg-gray-100 px-3 text-2xl transition-colors hover:bg-gray-300"
			onclick={() => tabs.push(new SubjectData())}
		>
			+
		</button>
	</nav>

	<main class="flex flex-1 flex-col bg-gray-100">
		{#each tabs as data, i}
			{#if activeTab === i}
				<Composer {data} />
			{/if}
		{/each}
	</main>
</div>
