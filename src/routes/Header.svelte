<script>
	import { currentUser, pb } from "$lib/pockebase";
	import { onMount } from "svelte";
	
	let imgUrl = 'https://imanjlai.online/api/files/users/'

	async function logout() {
		pb.authStore.clear()
	}

</script>

<nav>
	<ul>
		<li><a href="/"><strong>Threads</strong></a></li>
	</ul>
	{#if $currentUser}
	<ul>
		<li>Logged in as {$currentUser?.username}</li>
		<li><img src={`${imgUrl}${$currentUser?.id}/${$currentUser?.avatar}`} alt=""></li>
		<li><a href="/login" on:click={logout}>Logout</a></li>
	</ul>
	{:else}
		<ul>
			<li><a href="/login">Login</a></li>
			<li><a href="/signup">Sign Up</a></li>
		</ul>
	{/if}
</nav>

<style>
	img {
		width: 30px;
		border-radius: 50px;
	}
</style>