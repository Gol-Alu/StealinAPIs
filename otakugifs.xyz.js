const axios = require('axios');
const fs = require('fs');
const path = require('path');

const reactions = ["airkiss","angrystare","bite","bleh","blush","brofist","celebrate","cheers","clap","confused","cool","cry","cuddle","dance","drool","evillaugh","facepalm","handhold","happy","headbang","hug","kiss","laugh","lick","love","mad","nervous","no","nom","nosebleed","nuzzle","nyah","pat","peek","pinch","poke","pout","punch","roll","run","sad","scared","shout","shrug","shy","sigh","sip","slap","sleep","slowclap","smack","smile","smug","sneeze","sorry","stare","stop","surprised","sweat","thumbsup","tickle","tired","wave","wink","woah","yawn","yay","yes"];

async function downloadGif(reaction) {
    const apiUrl = `https://api.otakugifs.xyz/gif?reaction=${reaction}`;
    try {
        const response = await axios.get(apiUrl);
        const gifUrl = response.data.url;
        const gifName = gifUrl.split('/').pop(); // Extracting the name from the URL
        const folderPath = path.join(__dirname, 'otakugifs.xyz', reaction);
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