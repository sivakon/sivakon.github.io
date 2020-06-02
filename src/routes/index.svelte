<script>
  import {posts} from '../posts'
</script>

<svelte:head>
<title>Codex</title>
</svelte:head>

{#each posts as post}
  <article>
    <a href={`/posts/${post.permalink}`}>
      <h2>{post.title}</h2>
    </a>
    <p>{post.summary}</p>
  </article>
  <br/>
{/each}