const fs = require('fs');
const path = require('path');

function indexGifs(folderPath) {
    let index = {};

    function traverseDirectory(dirPath, parentKey) {
        const files = fs.readdirSync(dirPath);

        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                const folderName = parentKey ? `${parentKey}/${file}` : file;
                traverseDirectory(filePath, folderName);
            } else {
                if (path.extname(filePath).toLowerCase() === '.gif') {
                    if (!index[parentKey]) {
                        index[parentKey] = [];
                    }
                    index[parentKey].push(filePath);
                }
            }
        });
    }

    traverseDirectory(folderPath, '');

    return index;
}

const folderPath = 'ALL'; // Replace this with the path to your folder
const gifIndex = indexGifs(folderPath);
const jsonOutput = JSON.stringify(gifIndex, null, 2);

fs.writeFileSync('gif_index.json', jsonOutput);

console.log('GIF index has been created and saved to gif_index.json');