import os from 'os';
import welcome from './welcome.js';
import { changeDirectory, listFilesFolders } from './navigation.js';
import read from './fs/read.js';
import create from './fs/create.js';
import rename from './fs/rename.js';
import copy from './fs/copy.js';
import remove from './fs/remove.js';
import move from './fs/move.js';
import getEOL from './os/getEOL.js';
import printCPUsInfo from './os/printCPUsInfo.js';
import calcHash from './hash/calcHash.js';
import compress from './zip/compress.js';
import decompress from './zip/decompress.js';

const username = welcome();

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
        promptUser();
    } else if (input.startsWith('cd ')) {
        changeDirectory(input.slice(3).trim());
        promptUser();
    } else if (input === 'ls') {
        listFilesFolders().then(() => promptUser());
    } else if (input.startsWith('cat ')) {
        read(input.slice(4).trim()).then(() => promptUser());
    } else if (input.startsWith('add ')) {
        create(process.cwd(), input.slice(4).trim()).then(() => promptUser());
    } else if (input.startsWith('rn ')){
        const [oldFilename, newFilename] = input.slice(3).trim().split(' ');
        rename(oldFilename, newFilename).then(() => promptUser());
    } else if (input.startsWith('cp ')) {
        const [source, destination] = input.slice(3).trim().split(' ');
        copy(source, destination).then(() => promptUser());
    } else if (input.startsWith('rm ')){
        remove(input.slice(3).trim()).then(() => promptUser());
    } else if (input.startsWith('mv ')){
        const [source, destination] = input.slice(3).trim().split(' ');
        move(source, destination).then(() => promptUser())
    } else if (input.startsWith('os ')) {
        const flag = input.slice(3).trim();
        if(flag === '--EOL') {
            getEOL();
        } else if (flag === '--cpus') {
            printCPUsInfo();
        } else if (flag === '--homedir') {
            console.log(`Home directory: ${os.homedir()}`);
        } else if (flag === '--username') {
            console.log(`Username: ${os.userInfo().username}`);
        } else if (flag === '--architecture') {
            console.log(`CPU architecture: ${os.arch()}`);
        }
    } else if (input.startsWith('hash ')) {
        calcHash(input.slice(4).trim()).then(() => promptUser());
    } else if (input.startsWith('compress ')) {
        const [source, destination] = input.slice(9).trim().split(' ');
        compress(source, destination).then(() => promptUser());
    } else if (input.startsWith('decompress ')) {
        const [source, destination] = input.slice(11).trim().split(' ');
        decompress(source, destination).then(() => promptUser());
    } else {
        console.log('Wrong command. Please try again.');
        promptUser();
    }
});

process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});