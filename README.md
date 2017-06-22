# rehype-prism

[![Build Status](https://travis-ci.org/mapbox/rehype-prism.svg?branch=master)](https://travis-ci.org/mapbox/rehype-prism)

[rehype](https://github.com/wooorm/rehype) plugin to highlight code blocks in HTML with [Prism](http://prismjs.com/).

(If you would like to highlight code blocks with [highlight.js](https://github.com/isagalaev/highlight.js), instead, use [rehype-highlight](https://github.com/wooorm/rehype-highlight).)

## Installation

```
npm install @mapbox/rehype-prism
```

## API

`rehype().use(rehypePrism)`

Syntax highlights `pre > code` with `language-{name}` classes that correspond to [languages Prism supports](http://prismjs.com/#languages-list).

## Usage

Use is as a rehype plugin.

Some examples of how you might do that:

```js
const rehype = require('rehype');
const rehypePrism = require('rehype-prism');

rehype()
  .use(rehypePrism)
  .process(/* some html */);
```

```js
const unified = require('unified');
const rehypeParse = require('rehype-parse');
const rehypePrism = require('rehype-prism');

unified()
  .use(rehypeParse)
  .use(rehypePrism)
  .processSync(/* some html */);
```

If you'd like to get syntax highlighting in Markdown, parse the Markdown (with remark-parse), convert it to rehype, then use this plugin.

```js
const unified = require('unified');
const remarkParse = require('remark-parse');
const remarkRehype = require('remark-rehype');
const rehypePrism = require('rehype-prism');

unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypePrism)
  .process(/* some markdown */);
```
