'use strict';

const rehype = require('rehype');
const dedent = require('dedent');
const rehypePrism = require('./index');
const parse = require('./src/parse');

const processHtml = (html, options) => {
  return rehype()
    .data('settings', { fragment: true })
    .use(rehypePrism, options)
    .processSync(html)
    .toString();
};

test('copies the language- class to pre tag', () => {
  const result = processHtml(dedent`
    <pre><code class="language-css"></code></pre>
  `);
  expect(result).toMatchSnapshot();
});

test('finds code and highlights', () => {
  const result = processHtml(dedent`
    <div>
      <p>foo</p>
      <pre><code class="language-css">p { color: red }</code></pre>
    </div>
  `);
  expect(result).toMatchSnapshot();
});

test('handles uppercase languages correctly', () => {
  const result = processHtml(dedent`
    <div>
      <p>foo</p>
      <pre><code class="language-CSS">p { color: red }</code></pre>
    </div>
  `);
  expect(result).toMatchSnapshot();
});

test('does nothing to code block without language- class', () => {
  const result = processHtml(dedent`
    <pre><code>p { color: red }</code></pre>
  `);
  expect(result).toMatchSnapshot();
});

test('throw error with fake language- class', () => {
  expect(() => {
    processHtml(dedent`
      <pre><code class="language-thisisnotalanguage">p { color: red }</code></pre>
    `);
  }).toThrow(/Unknown language/);
});

test('with options.ignoreMissing, does nothing to code block with fake language- class', () => {
  const html = dedent`
    <pre><code class="language-thisisnotalanguage">p { color: red }</code></pre>
  `;
  const result = processHtml(html, { ignoreMissing: true });
  expect(result).toMatchSnapshot();
});

test('compile new template with custom registered languages', () => {
  const mockParsedTemplate = parse(['scss', 'ruby', 'python'], false);
  expect(mockParsedTemplate).toMatchSnapshot();
});

test('compile new template with all registered languages', () => {
  const mockParsedTemplate = parse(['all'], false);
  expect(mockParsedTemplate).toMatchSnapshot();
});

test("don't compile new template if no languages are passed", () => {
  const mockParsedTemplate = parse([], false);
  expect(mockParsedTemplate).toMatchSnapshot();
});
