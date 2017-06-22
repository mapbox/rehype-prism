'use strict';

const rehype = require('rehype');
const dedent = require('dedent');
const rehypePrism = require('./index');

const processHtml = html => {
  return rehype()
    .data('settings', { fragment: true })
    .use(rehypePrism)
    .processSync(html)
    .toString();
};

describe('rehypePrism', () => {
  test('finds code and highlights', () => {
    const result = processHtml(dedent`
      <div>
        <p>foo</p>
        <pre><code class="language-css">p { color: red }</code></pre>
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

  test('does nothing to code block with fake language- class', () => {
    const result = processHtml(dedent`
      <pre><code class="language-thisisnotalanguage">p { color: red }</code></pre>
    `);
    expect(result).toMatchSnapshot();
  });

  test('does nothing to code block with no-highlight class', () => {
    const result = processHtml(dedent`
      <pre><code class="language-css no-highlight">p { color: red }</code></pre>
    `);
    expect(result).toMatchSnapshot();
  });

  test('does nothing to code block with nohighlight class', () => {
    const result = processHtml(dedent`
      <pre><code class="language-css nohighlight">p { color: red }</code></pre>
    `);
    expect(result).toMatchSnapshot();
  });
});
