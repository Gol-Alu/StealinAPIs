const fs = require('fs');
const path = require('path');
const slug = require('unique-slug');

function renameGifsWithSlug(folderPath) {
    function traverseDirectory(dirPath) {
        const files = fs.readdirSync(dirPath);

        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                traverseDirectory(filePath);
            } else {
                if (path.extname(filePath).toLowerCase() === '.gif') {
                    const fileSlug = slug(path.parse(file).name);
                    const newFileName = `${fileSlug}.gif`;
                    const newPath = path.join(dirPath, newFileName);
                    fs.renameSync(filePath, newPath);
                    console.log(`Renamed ${file} to ${newFileName}`);
                }
            }
        });
    }

    traverseDirectory(folderPath);
}

const folderPath = 'ALL'; // Replace this with the path to your folder
renameGifsWithSlug(folderPath);
console.log('GIF files have been renamed with unique slugs.');