// import { fileURLToPath } from 'url';
// import path from 'path';
import os from 'os';
import welcome from './welcome.js';
import { changeDirectory, listFilesFolders } from './navigation.js';
import read from './fs/read.js';
import create from './fs/create.js';
import rename from './fs/rename.js';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
let username;

welcome();
process.chdir(os.homedir());
console.log(`You are currently in ${process.cwd()}`);
const promptUser = () => {
    process.stdout.write('> '); 
};

process.stdin.resume();
promptUser();
process.stdin.setEncoding('utf8');


process.stdin.on('data', (data) => {
    const input = data.trim();
    if (input === '.exit') {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
    } else if (input === 'up') {
        changeDirectory('..');
    } else if (input.startsWith('cd ')) {
        changeDirectory(input.slice(3).trim());
    } else if (input === 'ls') {
        listFilesFolders().then(() => promptUser());
    } else if (input.startsWith('cat ')) {
        read(input.slice(4).trim()).then(() => promptUser());
    } else if (input.startsWith('add ')) {
        create(process.cwd(), input.slice(4).trim()).then(() => promptUser());
    } else if (input.startsWith('rn ')){
        // rn /Users/natasakrucenok/desktop/new.txt new2.txt
        const [oldFilename, newFilename] = input.slice(3).trim().split(' ');
        rename(oldFilename, newFilename).then(() => promptUser());
    }
    else {
        console.log('Wrong command. Please try again.');
        promptUser();
    }
});

process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});