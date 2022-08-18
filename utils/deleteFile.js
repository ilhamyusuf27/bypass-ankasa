const path = require('path')
const fs = require('fs')
const ErrorResponse = require('./ErrorResponse')

const deleteFile = (filePath) => { 
  const joinedFilePath = path.join(__dirname, '../', filePath)

  return new Promise((resolve, reject) => {
    fs.unlink(joinedFilePath, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

module.exports = deleteFile
