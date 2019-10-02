const fs = require("fs");
const replace = (path, from, to) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      let result = data;
      for (let i = 0; i < to.length; i++) {
        result = result.replace(new RegExp(from[i], "g"), to[i]);
      }
      fs.writeFileSync(path, result, "utf8", err => {
        if (err) return console.log(err);
      });
    }
  });
};
const filesInDirectory = dir => {
  const list = traversable(fs.readdirSync(dir))
    .filter(path => fs.lstatSync(dir + "/" + path).isFile())
    .map(file => {
      return dir + "/" + file;
    });
  return list;
};
const directoriesInDirectory = dir => {
  const list = traversable(fs.readdirSync(dir))
    .filter(path => fs.lstatSync(dir + "/" + path).isDirectory())
    .map(folder => {
      return dir + "/" + folder;
    });
  return list;
};
const traversable = directories => {
  return directories.filter(dir => dir != ".DS_Store");
};
const findAllFiles = dir => {
  let files = filesInDirectory(dir);
  let directories = directoriesInDirectory(dir);
  for (directory of directories) {
    files = [...files, ...findAllFiles(directory)];
  }
  return files;
};
const replaceInFiles = (path, from, to) => {
  const files = findAllFiles(path);
  for (file of files) {
    replace(file, from, to);
  }
};

module.exports = replaceInFiles;
