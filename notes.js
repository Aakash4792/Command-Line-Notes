const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = getNotes();
  const sameNotes = notes.filter((note) => {
    return note.title === title;
  });
  if (sameNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveData(notes);
    console.log(chalk.bgGreen.black("\nNew Note Created\n"));
  } else {
    console.log(chalk.bgRed.white("\nTitle already taken!!\n"));
  }
};

const deleteNote = (title) => {
  const notes = getNotes();
  const saveNotes = notes.filter((note) => {
    return note.title !== title;
  });

  if (notes.length > saveNotes.length) {
    console.log(chalk.red.inverse("Note deleted"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.bgRed.white("\nNote not found!!\n"));
  }
};

const listall = () => {
  const notes = getNotes();
  console.log(chalk.bgBlue.black("Your Notes : "));
  notes.forEach((note) => {
    console.log(`\n${note.title}\n`);
  });
};

const read = (title) => {
  const notes = getNotes();
  const element = notes.find((note) => note.title === title);
  if (element) {
    console.log(chalk.bgYellow.black(element.title) + "\n" + element.body);
  } else {
    console.log(chalk.red.inverse("Note Not Found!"));
  }
};

const getNotes = () => {
  try {
    const buffer = fs.readFileSync("notes.json");
    let jsondata = buffer.toString();
    jsondata = JSON.parse(jsondata);
    return jsondata;
  } catch (err) {
    return [];
  }
};

const saveData = (notes) => {
  const jsondata = JSON.stringify(notes);
  fs.writeFileSync("notes.json", jsondata);
};

module.exports = {
  addNote: addNote,
  deleteNote: deleteNote,
  listall: listall,
  read: read,
};
