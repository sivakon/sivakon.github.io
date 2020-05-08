<!--
    Put everything related to Header in components
-->

<style>

.site-header-borders {
    background-color: white;
    padding: 0.5em;
    margin: 0 auto;
    margin-bottom: 0.2em;
    border-top: 5px solid #ccc;
    border-bottom: 1px solid #d9d9d9;
}

.site-header {
    max-width: 800px;
    padding: 0.5em;
    margin: 0 auto;
}

.nav {
    min-height: 64px;
    padding-left: 24px;
    padding-right: 24px;
    display: block;
    box-sizing: border-box;
}

.navbar {
    color: rgb(236, 32, 40);
    float: right;
    margin: 0;
    padding: 0;
    pointer-events: all;
    cursor: pointer;
    margin: 2rem 0 0 0;
}

/* .navbar a {
    color: #ec2028;
    text-decoration: none;
    transition: color 150ms ease;
    display: inline-block;
    padding-bottom: .08em;
    border-bottom: 2px solid #ccc;
} */

.logo {
    color: rgb(236, 32, 40);
    font-family: 'kino_40regular';
    font-size: 64px;
    float: left;
    margin: 0;
    position: relative;
    padding: 0;
    pointer-events: all;
    cursor: pointer;
}

main {
    max-width: 800px;
    background-color: white;
    padding: 24px;
    margin: 0 auto;
    box-sizing: border-box;
}

li {
    display: inline;
    padding: 0.6em;
}

/*
    Animation
*/
ul li a {
  color: #ec2028;
  text-decoration: none;
  position: relative;
  text-transform: uppercase;
  margin: 0 0;
  padding: 0.6em;
  font-size: 18px;
  font-weight: 600;
  transition: 0.5s;
  z-index: 1;
}
ul li a:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  transform: scaleY(2);
  opacity: 0;
  transition: 0.3s;
}
ul li a:after {
  content: "";
  position: absolute;
  top: 2px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ccc;
  transform: scale(0);
  opacity: 0;
  transition: 0.3s;
  z-index: -1;
}
ul li a:hover {
  color: #fff;
}
ul li a:hover:before {
  transform: scaleY(1);
  opacity: 1;
}
ul li a:hover:after {
  transform: scaleY(1);
  opacity: 1;
}
</style>

<svelte:head>
<style>img[alt=image] { width: 600px; }</style>
</svelte:head>

<div class="site-header-borders">
    <div class="site-header">
        <nav class="nav">
            <a href="/" class="logo">codex</a>
            <ul class="navbar">
                <li><a href="/about">about</a></li>
                <li><a href="https://github.com/sivakon/sivakon.github.io/tree/dev" target="_blank">github</a></li>
            </ul>
        </nav>
    </div>
</div>
<main>
  <slot></slot>
</main>
