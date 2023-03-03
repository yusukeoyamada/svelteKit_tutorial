<!-- フォルダ名を[id]とすることで、idの値が動的に変わるDynamic Routeであることを表します。 -->
<script>
  // 以下、ts利用例
  // import type { PageData } from './$types';

  // import { page } from '$app/stores';
  // console.log($page);

  // pageオブジェクトを確認するとparamsにidの値が含まれている
    // 「$:」を変数につけると、動的に変更される変数の値の変更に影響されるように
  // $: id = $page.params.id;

  // 「+page.server.js」で取得したデータを、data propsで受け取りブラウザ上に表示
  export let data;

  // 以下、ts利用例
  // export let data: PageData;

  // 取得したデータはdata propsとして受け取ることができましたが
  // $app/storeの$page.dataからもアクセスすることが
  // $: id = $page.data.user.id;
  // $: name = $page.data.user.name;
</script>

<!-- <h1>ユーザ詳細画面</h1>
<p>id:{id}</p> -->

<!-- 「+page.server.js」で取得したデータを、data propsで受け取りブラウザ上に表示 -->
<h1>ユーザ詳細画面</h1>
<p>id: {data.user.id}</p>
<p>name: {data.user.name}</p>

<!-- 取得したデータはdata propsとして受け取ることができましたが
$app/storeの$page.dataからもアクセスすることが -->
<!-- <h1>ユーザ詳細画面</h1>
<p>id: {id}</p>
<p>name: {name}</p> -->
