const chevrotain = require('chevrotain');
const lexer = require('./lexer');

const { CstParser } = chevrotain;
const { Tokens, tokenList } = lexer;

class ParserRar2r extends CstParser {
  constructor() {
    super(tokenList);

    const $ = this;

    $.RULE('program', () => {
      $.MANY(() => {
        $.SUBRULE($.statement);
      });
    });

    $.RULE('statement', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.ifStatement) },
        { ALT: () => $.SUBRULE($.whileStatement) },
        { ALT: () => $.SUBRULE($.doStatement) },
        { ALT: () => $.SUBRULE($.blockStatement) },
        { ALT: () => $.SUBRULE($.expressionStatement) },
        { ALT: () => $.SUBRULE($.emptyStatement) },
        { ALT: () => $.SUBRULE($.printStatement) },

      ]);
    });

    $.RULE('ifStatement', () => {
      $.CONSUME(Tokens.If);
      $.SUBRULE($.parenExpression);
      $.SUBRULE($.statement);
      $.OPTION(() => {
        $.CONSUME(Tokens.Else);
        $.SUBRULE2($.statement);
      });
    });

    $.RULE('whileStatement', () => {
      $.CONSUME(Tokens.While);
      $.SUBRULE($.parenExpression);
      $.SUBRULE($.statement);
    });

    $.RULE('doStatement', () => {
      $.CONSUME(Tokens.Do);
      $.SUBRULE($.statement);
      $.CONSUME(Tokens.While);
      $.SUBRULE($.parenExpression);
    });

    $.RULE('blockStatement', () => {
      $.CONSUME(Tokens.LCurly);
      $.MANY(() => {
        $.SUBRULE($.statement);
      });
      $.CONSUME(Tokens.RCurly);
    });

    $.RULE('expressionStatement', () => {
      $.SUBRULE($.expression);
    });

    $.RULE('expression', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.assignExpression) },
        { ALT: () => $.SUBRULE($.relationExpression) },
      ]);
    });

    $.RULE('relationExpression', () => {
      $.SUBRULE($.AdditionExpression, { LABEL: 'lhs' });
      $.MANY(() => {
        $.CONSUME(Tokens.RelationalOperator);
        $.SUBRULE2($.AdditionExpression, { LABEL: 'rhs' });
      });
    });

    $.RULE('AdditionExpression', () => {
      $.SUBRULE($.multiplicationExpression, { LABEL: 'lhs' });
      $.MANY(() => {
        $.CONSUME(Tokens.AdditionOperator);
        $.SUBRULE2($.multiplicationExpression, { LABEL: 'rhs' });
      });
    });

    $.RULE('multiplicationExpression', () => {
      $.SUBRULE($.term, { LABEL: 'lhs' });
      $.MANY(() => {
        $.CONSUME(Tokens.MultiplicationOperator);
        $.SUBRULE2($.term, { LABEL: 'rhs' });
      });
    });
  
    $.RULE('assignExpression', () => {
      $.CONSUME(Tokens.ID);
      $.CONSUME(Tokens.Equals);
      $.SUBRULE($.expression);
    });
    $.RULE('moveExpression', () => {
      $.CONSUME(Tokens.Move);
      $.CONSUME(Tokens.Equals2);
    });
    $.RULE('term', () => {
      $.OR([
        { ALT: () => $.CONSUME(Tokens.ID) },
        { ALT: () => $.CONSUME(Tokens.INT) },
        { ALT: () => $.SUBRULE($.parenExpression) },
      ]);
    });

    $.RULE('parenExpression', () => {
      $.CONSUME(Tokens.LParen);
      $.SUBRULE($.expression);
      $.CONSUME(Tokens.RParen);
    });

    $.RULE('emptyStatement', () => {
      $.CONSUME(Tokens.SemiColon);
    });

    $.RULE('printStatement', () => {
      $.CONSUME(Tokens.Print);
      $.SUBRULE($.parenExpression);
    });

    this.performSelfAnalysis();
  }
}

const parser = new ParserRar2r([]);

module.exports = parser;
