const { lexer } = require('./lexer');
const parser = require('./parser');
const interpreter = require('./generate-code');
module.exports = function compiler(sourceCode) {

/* 
  El compilador procesa la entrada,
  la analiza y crea los token class
  pasando el codigo por el analizador lexico
*/
  const lexerResult = lexer.tokenize(`${sourceCode}`);

  /* 
    Se crea el vector de tokens
  */
  parser.input = lexerResult.tokens;
  const cst = parser.program();

  /* Si hay algun error en el parser
    retorna el error para imprimirlo
    en pantalla
  */
  if (parser.errors.length > 0) {
    return {
      cst,
      lexErrors: lexerResult.errors,
      parseErrors: parser.errors,
    };
  }

  /* 
    Se ejecuta el analizador semantico
  */
  const value = interpreter.visit(cst);

  return {
    cst,
    lexErrors: lexerResult.errors,
    parseErrors: parser.errors,
    jsCode: value,
  };
};
