import { combineReducers } from 'redux';

var initialState = {
  matrix: [],
  valid: false
};

function app(state = initialState, action) {
  if (action.type === 'UPDATE_LETTER') {
    var matrix = computeMatrix(state.matrix, action);
    return {
      matrix: matrix,
      validGrid: computeValidGrid(matrix),
      validWordCount: computeValidWordCount(matrix)
    };
  }

  return state;
}

function computeMatrix(state = [], action) {
  var letter = action.letter.toUpperCase();
  var rI = action.rowIndex;
  var cI = action.colIndex;
  var row = state.slice(rI, rI + 1)[0];
  var newRow = [
    ...row.slice(0, cI),
       letter,
    ...row.slice(cI + 1)
  ];
  var newMatrix = [
    ...state.slice(0, rI),
       newRow,
    ...state.slice(rI + 1)
  ];
  return newMatrix;
}

function computeValidGrid(matrix) {
  var words = getWords(matrix);
  return words.reduce(function (valid, word) {
    if (valid) {
      return true;
    }
    return checkWord(word);
  }, false)
}

function computeValidWordCount(matrix) {
  var words = getWords(matrix);
  return words.reduce(function (count, word) {
    if (checkWord(word)) {
      return count + 1;
    }
    return count;
  }, 0)
}

function getWords(matrix) {
  var rowWords = [];
  var colWords = new Array(matrix.length);

  matrix.forEach(function (row, rI) {
    // row = ['A', 'N', 'D', 'Y']
    rowWords.push(row.join('')); // 'ANDY'
    colWords.forEach(function (col, cI) {
      // col = undefined;
      colWords[cI] =+ row[cI]; // 'A'
    });
  });

  return rowWords.concat(colWords);
}

function checkWord(word) {
  var validWords = ['andy', 'yelp', 'boob'];
  return validWords.indexOf(word.toLowerCase()) > -1;
}

export default app;


// TESTING
//
function test(description, a, b) {
  var A = JSON.stringify(a);
  var B = JSON.stringify(b);
  var result = A === B;
  console.log(`Testing ${description}: ${result ?  '👍👍👍' : '👎👎👎'}`);
  if (!result) {
    console.log(`Expected: ' ${B}`);
    console.log(`Instead of: ' ${A}`);
  }
}

// fixtures
var validMatrix = [
  ['A','N','D','Y'],
  ['B',' ',' ',' '],
  ['C',' ',' ',' '],
  ['D',' ',' ',' ']
];

var invalidMatrix = [
  ['A',' ',' ',' '],
  ['B',' ',' ',' '],
  ['C',' ',' ',' '],
  ['D',' ',' ',' ']
];

var action = {
  type: 'UPDATE_LETTER',
  rowIndex: 1,
  colIndex: 1,
  letter: 'a'
};

// testing computeMatrix()
var expectedState = [
  ['A','N','D','Y'],
  ['B','A',' ',' '],
  ['C',' ',' ',' '],
  ['D',' ',' ',' ']
];

var reducedState = computeMatrix(validMatrix, action);

test('matrix reducer', expectedState, reducedState);

// testing getWords()
test('getWords()', validMatrix, ['andy']);

// testing checkWord()
test('checkWord() valid word', checkWord('ANDY'), true);
test('checkWord() invalid word', checkWord('asdj'), false);

// testing computeValidGrid()
test('computeValidGrid() valid input', computeValidGrid(validMatrix), true);
test('computeValidGrid() invalud input', computeValidGrid(invalidMatrix), false);


// testing validWordCount
test('computeValidWordCount() valid input', computeValidWordCount(validMatrix), 1);
