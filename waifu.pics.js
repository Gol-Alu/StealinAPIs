const axios = require('axios');
const fs = require('fs');
const path = require('path');

const reactions = [
    "bully",
    "cuddle",
    "cry",
    "hug",
    "kiss",
    "lick",
    "pat",
    "smug",
    "bonk",
    "yeet",
    "blush",
    "smile",
    "wave",
    "highfive",
    "handhold",
    "nom",
    "bite",
    "glomp",
    "slap",
    "kill",
    "kick",
    "happy",
    "wink",
    "poke",
    "dance",
    "cringe"
];

let exists = [];

async function downloadGif(reaction) {
    const apiUrl = `https://api.waifu.pics/many/sfw/${reaction}`;
    try {
        const response = await axios.post(apiUrl, {});
        const gifUrl = response.data.files;
        //console.log(gifUrl)
        const folderPath = path.join(__dirname, 'waifu.pics', reaction);

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
            await new Promise(resolve => setTimeout(resolve, 100));
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
        await new Promise(resolve => setTimeout(resolve, 100)); // 1-second delay
        init = init+1
    }
}

downloadGifs();