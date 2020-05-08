<script context="module">
    import {findPost} from '../../posts'
    export function preload(page) {
            // find the post based on the permalink param
        const post = findPost(page.params.permalink)

        // return a list of props
        return { post }
    }
</script>

<script>
    export let post
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq" crossorigin="anonymous">
  <link rel="stylesheet" href="dracula.css">
</svelte:head>

<h1>{post.title}</h1>

{@html post.html}