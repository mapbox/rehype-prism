'use strict';

const visit = require('unist-util-visit');
const nodeToString = require('hast-util-to-string');
const Prism = require('prismjs');
const Parser5 = require('parse5/lib/parser');
const nodeFromParse5 = require('hast-util-from-parse5');

const parse5 = new Parser5();

module.exports = () => {
  return tree => {
    visit(tree, 'element', visitor);
  };

  function visitor(node, index, parent) {
    if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
      return;
    }

    const lang = getLanguage(node);

    if (lang === false) {
      return;
    }

    const highlightedCode = highlight(nodeToString(node), lang);

    if (highlightedCode === false) {
      return;
    }

    const highlightedAst = nodeFromParse5(
      parse5.parseFragment(highlightedCode)
    );
    node.children = highlightedAst.children;
  }
};

function highlight(code, lang) {
  // lang must be in http://prismjs.com/#languages-list
  const grammar = Prism.languages[lang];
  if (!grammar) return false;
  return Prism.highlight(code, grammar);
}

function getLanguage(node) {
  const className = node.properties.className || [];

  if (className.some(cl => cl === 'no-highlight' || cl === 'nohighlight')) {
    return false;
  }

  const length = className.length;
  let index = -1;
  let classListItem;

  while (++index < length) {
    classListItem = className[index];
    if (classListItem.slice(0, 9) === 'language-') {
      return classListItem.slice(9);
    }
  }

  return null;
}
