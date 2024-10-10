import { writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'path'; 
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async (dirPath, filename) => {
    try {
        const filePath = path.join(dirPath, filename);
        try {
            await access(filePath, constants.F_OK);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code === 'ENOENT') {
                await writeFile(filePath, '');
            } else {
                throw err;
            }
        }
    } catch (err) {
        throw new Error(err);
    }
};

export default create;