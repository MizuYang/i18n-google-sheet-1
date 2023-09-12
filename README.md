1. 到 Google Cloud 新增新的專案
        
2. 選取剛建立的專案   ⇒   前往 API 總覽
        
3. 啟用 API 和 服務   ⇒   選取 Google Sheets API
        
4. 啟用 API 
        
5. 憑證  ⇒   建立憑證   ⇒   服務帳戶
        
6. 點進去剛剛新增的信箱網址
        
7. 金鑰   ⇒   建立新的金鑰    ⇒    JSON   ⇒    建立
        
8. 會自動下載一個檔案(金鑰)，將此檔案丟到專案中
        
9. 新增一個 Google Sheets ，裡面用來管理個語系翻譯 
        
    - 測試翻譯內容
        
        ```jsx
        key	zh-TW	en-US	ja-JP
        hello	哈囉	hello	こんにちは
        name	名字	name	なまえ
        mail	信箱	mail	メール
        ```
        
10. 新增下方的工作區名稱 (**請用英文!!!!!**)
        
11. **將 Google Sheets 公開！**
        
12. 新增 `GoogleSheetToJson.js` 檔案
    - `GoogleSheetToJson.js`
        - 若工作區名稱不同，記得修改一下
            
            ```jsx
            const fs = require('fs-extra')
            const unflatten = require('flat').unflatten
            const { extractSheets } = require('spreadsheet-to-json')
            const path = require('path')
            extractSheets(
              {
            		**// Google Sheets 網址上的 ID**
                spreadsheetKey: **'1fQBEt9T7hn9IHRFjR7h6nIJIsiESg6X7jXXXXXXXXXX'**,
            
            		**// 剛剛下載金鑰的檔案路徑**
                credentials: require(**'./test-i18n-398801-5455exxxxxxx'**),
            
            		**// Google Sheets 工作區名稱 (可多個工作區:  ['home', 'cart', ...等])**
                sheetsToExtract: **['language']** 
              },
              (err, data) => {
                if (err) throw err
            		**// Google Sheets 工作區名稱 
            		// 可多個工作區: [...data.language, ...data.home, ...等])**
                const read = **[...data.language]**
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
            ```
            
13. 修改 `GoogleSheetToJson.js` 的三個資料
    - 1. spreadsheetKey：Google Sheets 上的 ID
        
    - 2. credentials：剛剛下載金鑰的檔案路徑
        
    - 3. sheetsToExtract ：Google Sheets 工作區名稱 (可多個工作區: ['home', 'cart', ...等])
        
14. 安裝 `spreadsheet-to-json` 套件：將 google sheet 文件轉成 JSON文件
    
    ```jsx
    npm i spreadsheet-to-json fs-extra flat -D
    ```
    
15. 在終端機輸入 `node GoogleSheetToJson.js`  ，就會自動新增 Google Sheets 的翻譯檔，並分類不同語系為不同支檔案
    
    ```jsx
    node GoogleSheetToJson.js
    ```
    