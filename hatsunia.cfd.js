const axios = require('axios');
const fs = require('fs');
const path = require('path');

const reactions = [
    "wave",
    "wink",
    "tea",
    "bonk",
    "punch",
    "poke",
    "bully",
    "pat",
    "kiss",
    "kick",
    "blush",
    "feed",
    "smug",
    "hug",
    "cuddle",
    "cry",
    "cringe",
    "slap",
    "five",
    "glomp",
    "happy",
    "hold",
    "nom",
    "smile",
    "throw",
    "lick",
    "bite",
    "dance",
    "boop",
    "sleep",
    "like",
    "kill",
    "tickle",
    "nosebleed",
    "threaten",
    "depression",
    "wolf_arts",
    "jahy_arts",
    "neko_arts",
    "coffee_arts",
    "wallpaper",
    "mobileWallpaper"
  ];

async function downloadGif(reaction) {
    const apiUrl = `https://hmtai.hatsunia.cfd/v2/${reaction}`;
    try {
        const response = await axios.get(apiUrl);
        const gifUrl = response.data.url;
        const gifName = gifUrl.split('/').pop(); // Extracting the name from the URL
        const folderPath = path.join(__dirname, 'hatsunia.cfd', reaction);
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