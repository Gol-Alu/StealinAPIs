const axios = require('axios');
const fs = require('fs');
const path = require('path');

const reactions = [
    "angry",
    "bite",
    "blush",
    "comfy",
    "cry",
    "cuddle",
    "dance",
    "fluff",
    "hug",
    "kiss",
    "lay",
    "lick",
    "pat",
    "poke",
    "pout",
    "slap",
    "smile",
    "tail",
    "tickle"
];

async function downloadGif(reaction) {
    const apiUrl = `https://purrbot.site/api/img/sfw/${reaction}/gif`;
    try {
        const response = await axios.get(apiUrl);
        const gifUrl = response.data.link;
        const gifName = gifUrl.split('/').pop(); // Extracting the name from the URL
        const folderPath = path.join(__dirname, 'purrbot.site', reaction);
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