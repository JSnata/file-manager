import { access, rename as renameFunc } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'path';
import { promptUser } from '../index.js';

const rename = async (wrongFilenamePath, newFilename) => {
    try {
        const wrongFilePath = path.resolve(process.cwd(), wrongFilenamePath);
        const newFilePath = path.resolve(path.dirname(wrongFilePath), newFilename);

        try {
            await access(newFilePath, constants.F_OK);
            console.error('FS operation failed');
            return;
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw new Error('FS operation failed');
            }
        }

        try {
            await access(wrongFilePath, constants.F_OK);
            await renameFunc(wrongFilePath, newFilePath);
            console.log(`File renamed from ${wrongFilenamePath} to ${newFilename}`);
        } catch (error) {
            console.error('Operation failed. File to rename does not exist');
        }
    } catch (error) {
        console.error(`Operation failed. ${error.message}`);
    } finally {
        promptUser();
    }
};

export default rename;
