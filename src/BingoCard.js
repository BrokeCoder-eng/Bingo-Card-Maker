class BingoCard {
  constructor(title = "Bingo Card", cells = Array.from( { length: 5 }, () => Array(5).fill(""))) {
    this.title = title;
    this.cells = cells;
    this.cells[2][2] = "Free";
    this.rows = [];
    this.cells.forEach((row, row_index) => this.rows[row_index] = row);
    this.width = 5;
    this.height = 5;
  }

  /**
   * @returns {String} The title of the Bingo Card.
   */
  getTitle() {
    return this.title;
  }

  /**
   * @returns {String[][]} A 2D array of the Bingo Card.
   */
  getCells() {
    return this.cells;
  }

  /**
   * @param {Integer} row_num
   * @returns {String[]} An array of the specified row of the Bingo Card
   */
  getRow(row_num) {
    if (row_num >= this.row.length) {
      return this.rows[0];
    }
    return this.rows[row_num];
  }

  /**
   * @param {Integer} r
   * @param {Integer} c
   * @returns {String} Value in the specific cell.
   */
  get(r, c) {
    if (r >= this.cells.length) {
      return this.cells[0][0];
    }
    else if (c >= this.cells[r].length) {
      return this.cells[r][0];
    }

    return this.cells[r][c];
  }

  /**
   * @param {SpreadsheetApp.Sheet} bingo_sheet
   */
  buildCard(bingo_sheet) {
    try {
      bingo_sheet.getRange("A1:E1").merge();

      for (let r = 1; r <= 5; r++) {
        bingo_sheet.setRowWidth(r, 200);
      }
      for (let c = 1; c <= 5; c++) {
        bingo_sheet.setColumnWidth(c, 200);
      }

      console.log("Bingo build successful");
    } catch(build_err) {
      console.log("Failed to build bingo card");
    }
  }
}
