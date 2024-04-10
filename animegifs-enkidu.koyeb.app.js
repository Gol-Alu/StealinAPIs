const axios = require('axios');
const fs = require('fs');
const path = require('path');

const reactions = [
    "attack",
    "bite",
    "bloodsuck",
    "blush",
    "bonk",
    "brofist",
    "cry",
    "cuddle",
    "dance",
    "disgust",
    "exploding",
    "facedesk",
    "facepalm",
    "flick",
    "flirt",
    "handhold",
    "happy",
    "harass",
    "highfive",
    "hug",
    "icecream",
    "insult",
    "kill",
    "kiss",
    "lick",
    "love",
    "marry",
    "nod",
    "nosebleed",
    "note",
    "nuzzle",
    "pat",
    "peck",
    "poke",
    "popcorn",
    "pout",
    "punch",
    "punish",
    "run",
    "sad",
    "scared",
    "shoot",
    "shrug",
    "sip",
    "slap",
    "smirk",
    "sorry",
    "spank",
    "stare",
    "steal-magic",
    "tease",
    "threat",
    "tickle",
    "tired",
    "wave",
    "yawn"
];

async function downloadGif(reaction) {
    const apiUrl = `https://animegifs-enkidu.koyeb.app/v3/api/?category=${reaction}`;
    try {
        const response = await axios.get(apiUrl);
        const gifUrl = response.data.gif;
        const gifName = gifUrl.split('/').pop(); // Extracting the name from the URL
        const folderPath = path.join(__dirname, 'animegifs-enkidu.koyeb.app', reaction);
        const filePath = path.join(folderPath, gifName);

        if (!fs.existsSync(filePath)) {
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }

            const gifResponse = await axios.get(gifUrl, { responseType: 'arraybuffer' });
            fs.writeFileSync(filePath, gifResponse.data);
            console.log(`[${reaction}] Downloaded ${filePath}`);
        } else {
            console.log(`[${reaction}] File ${gifName} already exists. Skipping...`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function downloadGifs() {
	let init = 0;
    for (let i = 0; i > -1; i++) {
    	if(init >= reactions.length) init = 0;

        const reaction = reactions[init];
        await downloadGif(reaction);
        await new Promise(resolve => setTimeout(resolve, 100)); // 1-second delay
        init = init+1
    }
}

downloadGifs();