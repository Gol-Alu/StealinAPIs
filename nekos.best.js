const axios = require('axios');
const fs = require('fs');
const path = require('path');

const reactions = [
    "lurk",
    "shoot",
    "sleep",
    "shrug",
    "stare",
    "wave",
    "poke",
    "smile",
    "peck",
    "wink",
    "blush",
    "smug",
    "tickle",
    "yeet",
    "think",
    "highfive",
    "feed",
    "bite",
    "bored",
    "nom",
    "yawn",
    "facepalm",
    "cuddle",
    "kick",
    "happy",
    "hug",
    "baka",
    "pat",
    "nod",
    "nope",
    "kiss",
    "dance",
    "punch",
    "handshake",
    "slap",
    "cry",
    "pout",
    "handhold",
    "thumbsup",
    "laugh"
];

let exists = [];

async function downloadGif(reaction) {
    const apiUrl = `https://nekos.best/api/v2/${reaction}?amount=20`;
    try {
        const response = await axios.get(apiUrl);
        const gifUrl = response.data.results.map(e => e.url);
        //console.log(gifUrl)
        const folderPath = path.join(__dirname, 'nekos.best', reaction);

        gifUrl.forEach(async f => {

            if(exists.includes(f)) {
                return console.log(`[${reaction}] File ${f} already exists. Skipping...`); // to reduce existsSyncs
            }

            const gifName = f.split('/').pop(); // Extracting the name from the URL
            const filePath = path.join(folderPath, gifName);

            if (!fs.existsSync(filePath)) {
                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath, { recursive: true });
                }

                try {
                    const gifResponse = await axios.get(f, { responseType: 'arraybuffer' });
                    fs.writeFileSync(filePath, gifResponse.data);
                } catch(err) {
                    console.log("[ERROR] "+ err.message)
                }
                
                console.log(`[${reaction}] Downloaded ${filePath}`);
            } else {
                console.log(`[${reaction}] File ${f} already exists. Skipping...`);
                exists.push(f)
            }
            await new Promise(resolve => setTimeout(resolve, 200));
        })

        
    } catch (error) {
        console.error('Error:', error);
    }
}

async function downloadGifs() {
    let init = 0;
    for (let i = 0; i < 10000; i++) {
        if(init >= reactions.length) init = 0;

        const reaction = reactions[init];
        await downloadGif(reaction);
        await new Promise(resolve => setTimeout(resolve, 200)); // 1-second delay
        init = init+1
    }
}

downloadGifs();