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

  getTitle() {
    return this.title;
  }

  getCells() {
    return this.cells;
  }
}
