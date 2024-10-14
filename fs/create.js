import { writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'path'; 
import { fileURLToPath } from 'url';
import { promptUser } from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async (dirPath, filename) => {
    try {
        const filePath = path.join(dirPath, filename);
        try {
            await access(filePath, constants.F_OK);
            throw new Error('File is already exists');
        } catch (err) {
            if (err.code === 'ENOENT') {
                await writeFile(filePath, '');
                promptUser();
            } else {
                console.error(`Operation failed. ${err.message}`);
                promptUser();
            }
        }
    } catch (err) {
        console.error(`Operation failed. ${err.message}`);
        promptUser();
    }
};

export default create;