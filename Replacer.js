const fs = require('fs')

const blackList = ['.DS_Store']

const replace = (path, transformMap) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.err(`Could not read file from ${path}`)
      throw err
    } else {
      let result = data
      Object.keys(transformMap).forEach(
        key =>
          (result = result.replace(new RegExp(key, 'g'), transformMap[key]))
      )
      fs.writeFileSync(path, result, 'utf8', err => {
        if (err) {
          console.err(`Could not write result to ${path}`)
          throw err
        }
      })
    }
  })
}

const filesInDirectory = dir => {
  return traversable(fs.readdirSync(dir))
    .filter(path => fs.lstatSync(`${dir}/${path}`).isFile())
    .map(file => `${dir}/${file}`)
}

const directoriesInDirectory = dir => {
  return traversable(fs.readdirSync(dir))
    .filter(path => fs.lstatSync(dir + '/' + path).isDirectory())
    .map(folder => dir + '/' + folder)
}

const traversable = (directories, blacklist = blackList) => {
  return directories.filter(dir => !blackList.includes(dir))
}

const findAllFiles = dir => {
  let files = filesInDirectory(dir)
  const directories = directoriesInDirectory(dir)
  for (directory of directories) {
    files = [...files, ...findAllFiles(directory)]
  }
  return files
}

const replaceInFiles = (path, transformMap) => {
  const files = findAllFiles(path)
  for (file of files) {
    replace(file, transformMap)
  }
}

module.exports = replaceInFiles
