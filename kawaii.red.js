const axios = require('axios');
const fs = require('fs');
const path = require('path');

const reactions = [
    "alarm",
    "amazing",
    "ask",
    "baka",
    "bite",
    "blush",
    "blyat",
    "boop",
    "clap",
    "coffee",
    "confused",
    "cry",
    "cuddle",
    "cute",
    "dance",
    "destroy",
    "die",
    "disappear",
    "dodge",
    "error",
    "facedesk",
    "facepalm",
    "fbi",
    "fight",
    "happy",
    "hide",
    "highfive",
    "hug",
    "kill",
    "kiss",
    "laugh",
    "lick",
    "lonely",
    "love",
    "mad",
    "money",
    "nom",
    "nosebleed",
    "ok",
    "party",
    "pat",
    "peek",
    "poke",
    "pout",
    "protect",
    "puke",
    "punch",
    "purr",
    "pusheen",
    "run",
    "salute",
    "scared",
    "scream",
    "shame",
    "shocked",
    "shoot",
    "shrug",
    "sip",
    "sit",
    "slap",
    "sleepy",
    "smile",
    "smoke",
    "smug",
    "spin",
    "stare",
    "stomp",
    "tickle",
    "trap",
    "triggered",
    "uwu",
    "wasted",
    "wave",
    "wiggle",
    "wink",
    "yeet"
];

async function downloadGif(reaction) {
    const apiUrl = `https://kawaii.red/api/gif/${reaction}?token=anonymous`;
    try {
        const response = await axios.get(apiUrl);
        const gifUrl = response.data.response;
        const gifName = gifUrl.split('/').pop(); // Extracting the name from the URL
        const folderPath = path.join(__dirname, 'kawaii.red', reaction);
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
    for (let i = 0; i < 10000; i++) {
    	if(init >= reactions.length) init = 0;

        const reaction = reactions[init];
        await downloadGif(reaction);
        await new Promise(resolve => setTimeout(resolve, 100)); // 1-second delay
        init = init+1
    }
}

downloadGifs();