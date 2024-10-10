import path from 'path';
import fs from 'node:fs';
import { readdir, stat } from 'fs/promises';

export const changeDirectory = (toPath) => {
    const targetPath = path.isAbsolute(toPath) ? toPath : path.resolve(process.cwd(), toPath);
    if (fs.existsSync(targetPath) && fs.lstatSync(targetPath).isDirectory()) {
        process.chdir(targetPath);
        console.log(`You are currently in ${process.cwd()}`);
    } else {
        console.error('Error: Path does not exist');
    }
};

export const listFilesFolders = async () => {
    try {
        const items = await readdir(process.cwd());
        const resultsTable = [];

        for (const item of items) {
            const itemPath = path.join(process.cwd(), item);
            const stats = await stat(itemPath);
            resultsTable.push({ Name: item, Type: stats.isDirectory() ? 'directory' : 'file' });
        }

        console.table(resultsTable);
    } catch (err) {
        console.error('Error reading the directory:', err);
    }
};