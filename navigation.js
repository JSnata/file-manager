import { access, lstat, readdir, stat } from 'fs/promises';
import { constants } from 'fs';
import { promptUser } from './index.js';
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
    } finally {
        promptUser();
    }
}


export const listFilesFolders = async () => {
    try {
        const items = await readdir(process.cwd());
        const directories = [];
        const files = [];

        for (const item of items) {
            const itemPath = path.join(process.cwd(), item);
            const stats = await stat(itemPath);

            if (stats.isDirectory()) {
                directories.push({ Name: item, Type: 'directory' });
            } else {
                files.push({ Name: item, Type: 'file' });
            }
        }

        directories.sort((a, b) => a.Name.localeCompare(b.Name));
        files.sort((a, b) => a.Name.localeCompare(b.Name));

        const resultsTable = [...directories, ...files];

        console.table(resultsTable);
    } catch (err) {
        console.error(`Operation failed. ${err.message}`);
    } finally {
        promptUser();
    }
};
