//Bingo Spreadsheet
const bingo = SpreadsheetApp.openById(BINGO_SPREADSHEET_ID);
const day_card = bingo.getSheetByName("Bingo Card");

//Google Drive Folder
const bingo_folder = DriveApp.getFolderById(BINGO_DRIVE_FOLDER_ID);

function export_to_pdf() {

const sheetId = day_card.getSheetId();

const exportUrl = `https://docs.google.com/spreadsheets/d/${BINGO_SPREADSHEET_ID}/export?` +
  `format=pdf&` +
  `size=A4&` +                       // Paper size
  `portrait=true&` +                 // Orientation
  `fitw=true&` +                     // Fit to width
  `sheetnames=false&` +              // Don't show sheet names
  `printtitle=false&` +              // Don't show title
  `pagenumbers=false&` +             // Don't show page numbers
  `gridlines=false&` +               // Don't show gridlines
  `fzr=false&` +                     // Don't repeat frozen rows
  `gid=${sheetId}`;                  // The specific sheet


}

function email_daily_card(day_bingo_card) {
  if (typeof day_bingo_card !== "object") {
    return;
  }

  bingo_folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  link_to_folder = bingo_folder.getUrl();

  let next_person = Math.random(Math.floor(PARTICIPANTS.length));

  PARTICIPANTS.forEach(p => {
    const htmlContent = `
    <p>Salutations ${p.name},</p>

    <p>Welcome to the Bingo card of the day!</p>

    <p>Attached to this announcement you will find the bingo card of the relevant individual we will be focusing on. Fill it in throughout the day as you notice the patterns on the card, and be honest about what you notice.</p>

    <p>This is all light-hearted banter to make each day a bit more enjoyable. So please enjoy!!</p>
    <p>Access the Bingo Card of the day here:<br>s
    <a href="${link_to_folder}">${link_to_folder}</a></p>
    `;

    GmailApp.sendEmail(p.email, "Todays Bingo Card", "Bingo of the Day!", { htmlBody: htmlContent });
  });
}

function main() {

  let card = bingo.range

  const title = day_card.getRange("A1:E1").getValue();
  const cells = day_card.getRange("A2:E6").getValues();
  let bingo_cards = new BingoCard(title, cells);

  email_daily_card(bingo_cards);

  bingo.setActiveSheet(day_card);
  bingo.duplicateActiveSheet();
  bingo.setActiveSheet(bingo.getSheets()[3]);

  bingo.renameActiveSheet("Bingo no " + (bingo.getSheets().length - 3));
}
