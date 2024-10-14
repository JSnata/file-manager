import { access, lstat } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

export const changeDirectory = async (toPath ) => {
    const originalPath = process.cwd();
    try {
        const currentPath = process.cwd();
        const targetPath = path.isAbsolute(toPath) ? toPath : path.resolve(currentPath, toPath);
        const currentRoot = path.parse(currentPath).root;

        if (targetPath === currentRoot) {
            console.error('Operation failed. You cannot go above the root directory.');
            return;
        }

        await access(targetPath, constants.F_OK);
        const stats = await lstat(targetPath);
        if (stats.isDirectory()) {
            process.chdir(targetPath);
        } else {
            console.error('Operation failed. Target path is not a directory.');
            process.chdir(originalPath);
        }
    } catch (err) {
        console.error(`Operation failed. ${err.message}`);
        process.chdir(originalPath);
    }
}



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