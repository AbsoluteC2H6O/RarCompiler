const chevrotain = require('chevrotain');

const { Lexer } = chevrotain;

// Definición de Tokens

const allTokens = [];

// Utility to avoid manually building the allTokens array
function createToken(options) {
  const newToken = chevrotain.createToken(options);
  allTokens.push(newToken);
  return newToken;
}

const AdditionOperator = createToken({ name: 'AdditionOperator', pattern: Lexer.NA });
const MultiplicationOperator = createToken({ name: 'MultiplicationOperator', pattern: Lexer.NA });
const RelationalOperator = createToken({ name: 'RelationalOperator', pattern: Lexer.NA });
const ID = chevrotain.createToken({ name: 'ID', pattern: /[a-zA-Z0-9]+/ });

const Tokens = {
  WhiteSpace: createToken({ name: 'WhiteSpace', pattern: /\s+/, group: Lexer.SKIPPED }),
  Comment: createToken({ name: 'Comment', pattern: /\/\*.*?\*\//, group: Lexer.SKIPPED }),
  If: createToken({ name: 'If', pattern: /if/, longer_alt: ID }),
  Else: createToken({ name: 'Else', pattern: /else/ }),
  While: createToken({ name: 'While', pattern: /whileR/ }),
  Print: createToken({ name: 'Print', pattern: /printR/ }),
  Do: createToken({ name: 'Do', pattern: /do/ }),
  LCurly: createToken({ name: 'LCurly', pattern: /{/ }),
  RCurly: createToken({ name: 'RCurly', pattern: /}/ }),
  LParen: createToken({ name: 'LParen', pattern: /\(/ }),
  RParen: createToken({ name: 'RParen', pattern: /\)/ }),
  SemiColon: createToken({ name: 'SemiColon', pattern: /;/ }),
  LessThanOrEqual: createToken({ name: 'LessThanOrEqual', pattern: /<=|meni|<=/, categories: RelationalOperator }),
  GreaterThanOrEqual: createToken({ name: 'GreaterThanOrEqual', pattern: />=|mayi|>=/, categories: RelationalOperator }),
  LessThan: createToken({ name: 'LessThan', pattern: /<|men|<:/, categories: RelationalOperator }),
  GreaterThan: createToken({ name: 'GreaterThan', pattern: />|may|>/, categories: RelationalOperator }),
  IsEqual: createToken({ name: 'IsEqual', pattern: /==|ig|==/, categories: RelationalOperator }),
  Equals: createToken({ name: 'Equals', pattern: /=|ig|ig/ }),
  Plus: createToken({ name: 'Plus', pattern: /\+|plus/, categories: AdditionOperator }),
  Minus: createToken({ name: 'Minus', pattern: /-|minus/, categories: AdditionOperator }),
  Multi: createToken({ name: 'Multi', pattern: /\*|mult/, categories: MultiplicationOperator }),
  Div: createToken({ name: 'Div', pattern: /\/|div/, categories: MultiplicationOperator }),
  integer: createToken({ name: 'integer', pattern: /[0-9]+/ }),
  // create: createToken({ name: 'create', pattern: /createR/ }),
  // string: createToken({ name: 'string', pattern: /stringR/ }),
  // show: createToken({ name: 'show', pattern: /showR/ }),
  // top: createToken({ name: 'top', pattern: /topR/ }),
  // down: createToken({ name: 'down', pattern: /downR/ }),
  // left: createToken({ name: 'left', pattern: /leftR/ }),
  // right: createToken({ name: 'right', pattern: /rightR/ }),
  // Move: createToken({name: 'Move', pattern: /MoveR/}),
  // Check: createToken({name: 'Check', pattern: /CheckR/}),
  // Jump: createToken({name: 'Jump', pattern: /JumpR/}),
  // Take: createToken({name: 'Take', pattern: /TakeR/}),
  // TODO: resolve ambiguity keywords vs identifiers
  ID,
  MultiplicationOperator,
  AdditionOperator,
  RelationalOperator,
  
};

allTokens.push(ID);

const lexer = new Lexer(allTokens);

module.exports = {
  lexer,
  Tokens,
  tokenList: allTokens,
};
