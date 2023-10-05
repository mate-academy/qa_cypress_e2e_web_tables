function getCellSelector(row, column) {
  return `.rt-tbody > :nth-child(${row}) > .rt-tr > :nth-child(${column})`;
}

module.exports = { getCellSelector };
