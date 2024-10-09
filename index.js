import path from 'path';
import fs from 'node:fs';
// import { fileURLToPath } from 'url';
import os from 'os';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
let username;

const welcome = () => {

    if (process.argv.length === 2) {
        console.error('Error: You should provide your name in the format --username=your_name!');
        process.exit(1);
    }

    process.argv.slice(2).map((arg) => {
        if (arg.includes('--username')){
            username = arg.split('=')[1];
        }
    });
    if (!username) {
        console.error('Error: You should provide your name in the format --username=your_name!');
        process.exit(1);
    }
    
    console.log(`Welcome to the File Manager, ${username}!`);
}

welcome();
process.chdir(os.homedir());
console.log(`You are currently in ${process.cwd()}`);
const promptUser = () => {
    process.stdout.write('> '); 
};

process.stdin.resume();
promptUser();
process.stdin.setEncoding('utf8');

const upDirectory = () => {
    const targetPath = path.resolve(process.cwd(), '..');
    if (fs.existsSync(targetPath) && fs.lstatSync(targetPath).isDirectory()) {
        process.chdir(targetPath);
        console.log(`Current directory: ${process.cwd()}`);
    } else {
        console.error('Error: Path does not exist');
    }
}

process.stdin.on('data', (data) => {
    const input = data.trim();
    if (input === '.exit') {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
    } else if ('up') {
        upDirectory();
    } else {
        console.log(`You entered: ${input}`);
    }
    promptUser();
});

process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});