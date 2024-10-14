import { access, unlink } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'path';
import { promptUser } from '../index.js';

const remove = async (pathToFile) => {
    try {
        const fileToRemovePath = path.resolve(process.cwd(), pathToFile);
        try {
            await access(fileToRemovePath , constants.F_OK);
            await unlink(fileToRemovePath);
            console.log(`File "${pathToFile}" was removed.`);
        } catch (err) {
            console.error(`Operation failed. ${err.message}`);
        }
    } catch (err) {
        console.error(`Operation failed. ${err.message}`);
    }
};

export default remove;