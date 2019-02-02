'use strict';

const visit = require('unist-util-visit');
const nodeToString = require('hast-util-to-string');
const refractor = require('refractor/core');

module.exports = options => {
  options = options || {};
  const langs = options.langs;

  if (langs === undefined) {
    languages.forEach(language => {
      refractor.register(require(`refractor/lang/${language}.js`));
    });
  } else {
    refractor.register(require(`refractor/lang/markup-templating.js`));
    langs.forEach(lang => {
      refractor.register(require(`refractor/lang/${lang}.js`));
    });
  }

  return tree => {
    visit(tree, 'element', visitor);
  };

  function visitor(node, index, parent) {
    if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
      return;
    }

    const lang = getLanguage(node);

    if (lang === null) {
      return;
    }

    let result;
    try {
      parent.properties.className = (parent.properties.className || [])
        .concat('language-' + lang);
      result = refractor.highlight(nodeToString(node), lang);
    } catch (err) {
      if (options.ignoreMissing && /Unknown language/.test(err.message)) {
        return;
      }
      throw err;
    }

    node.children = result;
  }
};

function getLanguage(node) {
  const className = node.properties.className || [];
  for (const classListItem of className) {
    if (classListItem.slice(0, 9) === 'language-') {
      return classListItem.slice(9).toLowerCase();
    }
  }

  return null;
}

const languages = [
  'abap',
  'actionscript',
  'ada',
  'apacheconf',
  'apl',
  'applescript',
  'arduino',
  'arff',
  'asciidoc',
  'asm6502',
  'aspnet',
  'autohotkey',
  'autoit',
  'bash',
  'basic',
  'batch',
  'bison',
  'brainfuck',
  'bro',
  'c',
  'clojure',
  'coffeescript',
  'cpp',
  'crystal',
  'csharp',
  'csp',
  'css-extras',
  'd',
  'dart',
  'diff',
  'django',
  'docker',
  'eiffel',
  'elixir',
  'elm',
  'erb',
  'erlang',
  'flow',
  'fortran',
  'fsharp',
  'gedcom',
  'gherkin',
  'git',
  'glsl',
  'go',
  'graphql',
  'groovy',
  'haml',
  'handlebars',
  'haskell',
  'haxe',
  'hpkp',
  'hsts',
  'http',
  'ichigojam',
  'icon',
  'inform7',
  'ini',
  'io',
  'j',
  'java',
  'jolie',
  'json',
  'jsx',
  'julia',
  'keyman',
  'kotlin',
  'latex',
  'less',
  'liquid',
  'lisp',
  'livescript',
  'lolcode',
  'lua',
  'makefile',
  'markdown',
  'markup-templating',
  'matlab',
  'mel',
  'mizar',
  'monkey',
  'n4js',
  'nasm',
  'nginx',
  'nim',
  'nix',
  'nsis',
  'objectivec',
  'ocaml',
  'opencl',
  'oz',
  'parigp',
  'parser',
  'pascal',
  'perl',
  'php-extras',
  'php',
  'plsql',
  'powershell',
  'processing',
  'prolog',
  'properties',
  'protobuf',
  'pug',
  'puppet',
  'pure',
  'python',
  'q',
  'qore',
  'r',
  'reason',
  'renpy',
  'rest',
  'rip',
  'roboconf',
  'ruby',
  'rust',
  'sas',
  'sass',
  'scala',
  'scheme',
  'scss',
  'smalltalk',
  'smarty',
  'soy',
  'sql',
  'stylus',
  'swift',
  'tap',
  'tcl',
  'textile',
  'tsx',
  'tt2',
  'twig',
  'typescript',
  'vbnet',
  'velocity',
  'verilog',
  'vhdl',
  'vim',
  'visual-basic',
  'wasm',
  'wiki',
  'xeora',
  'xojo',
  'xquery',
  'yaml'
];
