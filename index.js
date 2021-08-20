// const util = require('util');
const fs = require('fs');
const compiler = require('./src/compiler');

const sourceCode = fs.readFileSync(process.argv[2]).toString();

const result = compiler(sourceCode);

/* Impresion de errores del lexer */
if (result.lexErrors.length > 0) {
  console.error(`Error en lexer: ${result.lexErrors[0]}`);
  process.exit(1);
}
/* Impresion de errores del parser */

if (result.parseErrors.length > 0) {
  console.error(`Error en parser: ${result.parseErrors[0]}`);
  process.exit(1);
}


/* Corrida del programa */
eval(result.jsCode);
