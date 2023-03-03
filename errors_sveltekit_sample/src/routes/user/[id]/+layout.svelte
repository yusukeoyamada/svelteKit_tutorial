<script>
	import { page } from '$app/stores';
</script>

<!-- $page.dataから取得した値を利用して、ページのheaderのtitleの値を更新することも -->
  <!-- headerの値の設定をする際には、「svelte:head」と記載 -->
<svelte:head>
	<title>{$page.data.user.name}</title>
</svelte:head>

<slot />
