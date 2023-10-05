const { rowsNumbers } = require('./data');
const { getRandomIntegerNumber } = require('./getRandomIntegerNumber');

function getRandomRowsQuantity() {
  const index = getRandomIntegerNumber(0, 5);

  return rowsNumbers[index];
}

module.exports = { getRandomRowsQuantity };
