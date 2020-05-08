const { createFilter } = require('rollup-pluginutils')
const path = require('path')
const matter = require('gray-matter')
const showdown = require('showdown')
const showdownKatex = require('showdown-katex')
const showdownHighlight = require('showdown-highlight')

const converter = new showdown.Converter({
  extensions: [
    showdownHighlight,
    showdownKatex({
      throwOnError: false,
      errorColor: '#1500ff',
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "\\[", right: "\\]", display: true},
        {left: "$", right: "$", display: false},
        {left: "\\(", right: "\\)", display: false}
      ],
    }),
  ],
});

converter.setFlavor('github')

const markdownKatexHighlightPlugin = (options = {}) => {
  const filter = createFilter(options.include, options.exclude)

  return {
    name: 'rollup-plugin-showdown-katex-highlight',
    transform(code, id) {
      if (!filter(id) === -1) return

      const extension = path.extname(id)

      if (extension !== '.md') return

      const matterResult = matter(code)
      const html = converter.makeHtml(matterResult.content)

      const exportFromModule = JSON.stringify({
        html,
        metadata: matterResult.data,
        filename: path.basename(id),
        path: id,
      })

      return {
        code: `export default ${exportFromModule}`,
        map: { mappings: '' },
      }
    },
  }
}

export default markdownKatexHighlightPlugin
