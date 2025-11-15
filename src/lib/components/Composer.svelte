<script lang="ts">
	import { SubjectData } from '$lib/subjectData.svelte';
	import Greet from './Greet.svelte';

	interface Props {
		data: SubjectData;
	}

	let { data }: Props = $props();
</script>

<div class="container mx-auto flex flex-1 flex-col py-8">
	{#if data.mode === 'start'}
		<Greet {data} />
	{/if}
</div>
