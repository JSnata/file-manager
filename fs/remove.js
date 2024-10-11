import { access, unlink } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'path';

const remove = async (pathToFile) => {
    try {
        const fileToRemovePath = path.resolve(process.cwd(), pathToFile);
        try {
            await access(fileToRemovePath , constants.F_OK);
            await unlink(fileToRemovePath);
            console.log(`File "${pathToFile}" was removed.`);
        } catch (err) {
            if (err.code === 'ENOENT') {
                throw new Error('FS operation failed');
            } else {
                throw err;
            }
        }
    } catch (err) {
        throw new Error(err);
    }
};

export default remove;