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
//const Move= chevrotain.createToken({ name: 'Move', pattern: /Move|MoveR/ });
const Equals2= chevrotain.createToken({ name: 'Equals2', pattern: /=|LEFT|RIGHT|UP|DOWN/ });


const Tokens = {
  WhiteSpace: createToken({ name: 'WhiteSpace', pattern: /\s+/, group: Lexer.SKIPPED }),
  Comment: createToken({ name: 'Comment', pattern: /\/\*.*?\*\//, group: Lexer.SKIPPED }),
  If: createToken({ name: 'If', pattern: /if|ifR/, longer_alt: ID }),
  Else: createToken({ name: 'Else', pattern: /else|elseR/ }),
  While: createToken({ name: 'While', pattern: /While|whileR/ }),
  Print: createToken({ name: 'Print', pattern: /Print|PrintR/ }),
  Do: createToken({ name: 'Do', pattern: /Do|DoR/ }),
  LCurly: createToken({ name: 'LCurly', pattern: /{/ }),
  RCurly: createToken({ name: 'RCurly', pattern: /}/ }),
  LParen: createToken({ name: 'LParen', pattern: /\(/ }),
  RParen: createToken({ name: 'RParen', pattern: /\)/ }),
  SemiColon: createToken({ name: 'SemiColon', pattern: /;/ }),
  LessThanOrEqual: createToken({ name: 'LessThanOrEqual', pattern: /<=|lessi|lessiR/, categories: RelationalOperator }),
  GreaterThanOrEqual: createToken({ name: 'GreaterThanOrEqual', pattern: />=|higheri|higheriR/, categories: RelationalOperator }),
  LessThan: createToken({ name: 'LessThan', pattern: /<|less|lessR/, categories: RelationalOperator }),
  GreaterThan: createToken({ name: 'GreaterThan', pattern: />|higher|higherR/, categories: RelationalOperator }),
  IsEqual: createToken({ name: 'IsEqual', pattern: /==|equal|equalR/, categories: RelationalOperator }),
  Equals: createToken({ name: 'Equals', pattern: /=|assign|assignR|createR/ }),
  // Equals2: createToken({ name: 'Equals2', pattern: /=|LEFT|RIGHT|UP|DOWN/ }),
  Plus: createToken({ name: 'Plus', pattern: /\+|plus|plusR/, categories: AdditionOperator }),
  Minus: createToken({ name: 'Minus', pattern: /-|subtract|subtractR/, categories: AdditionOperator }),
  Multi: createToken({ name: 'Multi', pattern: /\*|multiply|multiplyR/, categories: MultiplicationOperator }),
  Div: createToken({ name: 'Div', pattern: /\/|divide|divideR/, categories: MultiplicationOperator }),
  INT: createToken({ name: 'INT', pattern: /[0-9]+/ }),
  Move: createToken({ name: 'Move', pattern: /Move|MoveR/ }),
  // TODO: resolve ambiguity keywords vs identifiers
  ID,
 // Move,
  Equals2,
  MultiplicationOperator,
  AdditionOperator,
  RelationalOperator,
};

allTokens.push(ID);
//allTokens.push(Move);
allTokens.push(Equals2);
const lexer = new Lexer(allTokens);

module.exports = {
  lexer,
  Tokens,
  tokenList: allTokens,
};
