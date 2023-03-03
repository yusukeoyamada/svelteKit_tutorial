<!-- 以下、ts利用例
<script lang="ts"></script> -->
<script>
  // 以下、ts利用例
	// import type { PageData } from './$types';

  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';

  let name = '';
  // クリックイベントを利用して、データの送信、処理を行う
  // 「/api/todo」(API Routes)に対して、input要素に入力した値を送信
  const handleSubmit = () => {
    fetch('/api/todo', {
      method: 'POST',
      headers: { 'content-type': 'application-json' },
      // { name: 'oyamada2' }
      body: JSON.stringify({ name })
    }).then(() => {
      // 現在アクティブなページに属する全ての「load」関数を再実行
        // 「routes/api/todo/+server.js」の「POST」関数実行後
        // 「routes/todo/+page.server.js」の「Load」関数を再実行
          // 本来ならば、「status: 200」なら実行とかの条件文を指定すべき
      invalidateAll();
    });
  };

  // load関数を利用して戻したデータは、propsのdataとして受け取ることが
  export let data;

  // fail関数を利用して戻したデータは、propsのformとして受け取ることが
  export let form;

  // 以下、ts利用例
	// export let data: PageData;
  // export let form: ActionData;
</script>

<h1>Todo</h1>

<!-- Actionの名前は、formのaction属性で指定することが -->
<!-- <form method="POST" action="?/create"></form> -->

<!-- フォームでTodoを追加した後やTodoを削除した時にページのリロードが行われます。
リロードを行わせないように設定することも可能。formタグにuse:enhanceを設定。 -->
<form method="POST" action="?/create" use:enhance>
	<div>
    <!-- id属性: ユニークな識別子であり、かつラベルとフォームをリンクさせるため
      for(label)とid(input)を同じ値にする
      idとforをリンクさせていれば、labelとinputの間に別のdivタグなどを挟んだとしても、
      正常にフォームのキャプションとしてラベルが機能 -->
    <!-- name属性: htmlの機能を使ってフォームをpostしたときのキー名として機能 -->
		<!-- <label for="name">Name:</label> -->
		<!-- <input name="name" id="name" /> -->

    <label for="name">Name:</label>
    <!-- formにnameが含まれているかチェックを行い、含まれている場合はnameをvalue属性に設定 -->
    <input name="name" id="name" value={form?.name ?? ''} />

    <!-- 以下、独自のバリデーションを利用した場合 -->
    <!-- formにmessageが含まれているかチェックを行い、含まれている場合はmessageをブラウザ上に表示 -->
    <!-- {#if form?.message}<p class="error">{form.message}</p>{/if} -->

    <!-- 以下、zodのバリデーションを利用した場合 -->
    <!-- formオブジェクトがerrorsを持っているかチェックを行い、
    持っている場合にはエラーメッセージとして表示させるように設定 -->
		{#if form?.errors?.name}
      <!-- errorsの中身: { name: [ '3文字以上入力してください。' ] } -->
			<p class="error">{form?.errors?.name[0]}</p>
		{/if}
	</div>
	<button type="submit">Add</button>
</form>

<!-- クリックイベントを利用して、データの送信、処理を行う -->
<!-- <form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="name">Name:</label>
    <input name="name" id="name" bind:value={name} />
  </div>
  <button type="submit">Add</button>
</form> -->

<ul>
	<!-- {#each data.todos as todo}
		<li>{todo.name}</li>
	{/each} -->

  {#each data.todos as todo}
    <li style="display:flex">
      <span>{todo.name}</span>
      <!-- Actionの名前は、formのaction属性で指定することが -->
      <form method="POST" action="?/delete">
        <input type="hidden" name="id" value={todo.id} />
        <button>削除</button>
      </form>
    </li>
  {/each}
</ul>

<style>
	.error {
		padding: 0.5em;
		font-weight: 900;
		color: white;
		background-color: red;
	}
</style>
