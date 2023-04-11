<script>
	import { onMount, onDestroy } from "svelte";
	import { pb } from "$lib/pockebase";
	import { currentUser } from "../lib/pockebase";
	import { goto } from "$app/navigation";

	let threads;
	let unsubscribe;

	onMount( async () => {
		const threadsList = await pb.collection('threads').getList(1, 50, {
			sort:'-created', expand: 'user'
		});

		threads = threadsList.items;

		unsubscribe = await pb.collection('threads')
			.subscribe('*',async ({action, record}) => {
				if (action == 'create') {
					const user = await pb.collection('users').getOne(record.user);
					record.expand = {user}
					threads = [record, ...threads]
				}
			})

	});

	onDestroy(() => {
		unsubscribe?.();
	});

	let title;
	let content;

	async function createThread() {
		const data = {
			title,
			content,
			user: $currentUser.id
		}

		const newRecord = await pb.collection('threads').create(data);
		console.log(newRecord)
		goto(`/thread/${newRecord.id}`)

		title = "";
		content = "";
	}

</script>

{#if $currentUser}

<details role="list">
	<summary>Share your thoughts</summary>
	<article>
		<form on:submit|preventDefault>
			<label>
				Thread Title
				<input type="text" placeholder="Thread Title" bind:value={title}>
			</label>
			<label>
				Content
				<textarea type="text" placeholder="Content" rows="6" bind:value={content}></textarea>
			</label>
			<button on:click={createThread}>Post</button>
		</form>
	</article>
</details>

{/if}

{#if threads}
	<h2>Popular threads</h2>
	{#each threads as thread (thread.id)}
		<article>
			<h4>{thread.title}</h4>
			<p>{thread.content}</p>
			<p>
				<em>Posted by {thread.user}</em>
			</p>

			<footer>
				<a href="/thread/{thread.id}" role="button">Unravel Thread</a>
			</footer>
		</article>
	{/each}
{/if}

<style>
	summary{
		transition: 0.3s;
	}
</style>