/* eslint-disable no-console */
const fs = require('fs');
const _ = require('underscore');
const template = fs.readFileSync(__dirname + '/template.js').toString('utf8');
const languages = require('./languages');

const writeFile = fileText => {
  fs.writeFile('./index.js', fileText, err => {
    if (err) {
      return console.error(`${err.message}`);
    }

    console.log('New languages are registered.');
  });
};

const args = process.argv.slice(2).filter(arg => arg[0] !== '-');

const parse = (args, write = true) => {
  let register = '';
  let refractor = '';

  if (!args.length) return null;

  if (args[0] === 'all') {
    refractor = `const refractor = require('refractor');`;
  } else {
    args.forEach(lang => {
      if (!languages.includes(lang)) {
        console.error(`${lang} is an invalid language`);
        return;
      } else {
        register += `refractor.register(require('refractor/lang/${lang}.js'));\n  `;
      }

      refractor = `const refractor = require('refractor/core');`.trim();
    });
  }

  const data = {
    languages: register.trim(),
    refractor: refractor
  };
  const parsedTemplate = _.template(template);
  const compiledTemplate = parsedTemplate(data);

  if (write) {
    writeFile(compiledTemplate);
  }

  return compiledTemplate;
};

if (args.length) {
  parse(args);
}

module.exports = parse;
