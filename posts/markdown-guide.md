---
title: Example markdown post
summary: Testing markdown, created rollup plugin to parse KaTeX
date: 2020-01-02
---

***

**Tutorial on Math:**

There are there ways to declare math for server-side pre-rendering.

1. Inline math enclosing `$` on one-line.
2. Block math enclosing `$$` on one-line.
3. Block math can also be used under latex code ````latex`

***

**Math:**

```latex
\boxed{
  \int\limits_{-\infty}^{\infty}
  e^{-x^2} \, dx = \sqrt{\pi}
}
```

Math $a=2$

Here, have some $$\pi$$.

another math $$a=2$$

***

**Code:**

This is a code example using `highlight.js`.

```js
function greeting() {
    console.log('hello world');
}

export { greeting };
```

Some python code
```python
import sys
print(sys.version)
```

***

**Inline HTML:**

<p style="color:blue;">This is a Blue Heading</p>

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>
