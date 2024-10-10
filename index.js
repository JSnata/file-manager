// import { fileURLToPath } from 'url';
// import path from 'path';
import os from 'os';
import welcome from './welcome.js';
import { changeDirectory, listFilesFolders } from './navigation.js';
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
    }
});

process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});