const fs = require('fs-extra')
const unflatten = require('flat').unflatten
const { extractSheets } = require('spreadsheet-to-json')
const path = require('path')
extractSheets(
  {
    // Google Sheets 網址上的 ID
    spreadsheetKey: '1fQBEt9T7hn9IHRFjR7h6nIJIsiESg6X7jXXXXXXXXXX',
    // 剛剛下載金鑰的檔案路徑
    credentials: require('./test-i18n-398801-5455exxxxxxx'),
    // Google Sheets 工作區名稱(可多個工作區:  ['home', 'cart', ...等])
    sheetsToExtract: ['language', 'page2']
  },
  (err, data) => {
    if (err) throw err
    // Google Sheets 工作區名稱 (可多個工作區: [...data.language, ...data.home, ...等])
    const read = [...data.language, ...data.page2]
    const result = {}
    const files = []

    for (const key in read[0]) {
      if (key !== 'key') {
        files.push(key)
        result[key] = {}
      }
    }
    read.forEach((el) => {
      for (const file of files) {
        result[file][el.key] = el[file] ? el[file] : ''
      }
    })
    for (const fileName of files) {
      fs.ensureDirSync(
        path.dirname(
          path.resolve(__dirname, './language', `${fileName}.json`)
        )
      )
      fs.writeJSONSync(
        path.resolve(__dirname, './language', `${fileName}.json`),
        unflatten(result[fileName], { object: true }),
        { spaces: 2 }
      )
    }
  }
)
