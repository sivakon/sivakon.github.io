var showdown  = require('showdown')
var showdownKatex = require('showdown-katex')
const showdownHighlight = require('showdown-highlight')
const converter = new showdown.Converter({
  extensions: [
    showdownHighlight,
    showdownKatex({
      throwOnError: true,
      displayMode: false,
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

var text      = `
## Highlighting Code with Showdown

Below we have a piece of JavaScript code:

\`\`\`js
function sayHello (msg, who) {
    return \`\${who} says: msg\`;
}
sayHello("Hello World", "Johnny");
\`\`\`
`
var html = converter.makeHtml(text);

console.log(html)

// var latexStrings = html.match(/\$\$(.*)\$\$/g)

// latexStrings.forEach(element => console.log(element.replace(/\$\$/g, '')))

// for(var i = 0; i<latexStrings.length; i++) {
//     var s = latexStrings[i].replace(/\$\$/g, '')
//     var html = katex.renderToString(s, {
//         throwOnError: false
//     });
//     console.log(html)
// }


// converter.setFlavor('github')
// console.log(converter.makeHtml('$a=2$'));