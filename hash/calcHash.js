import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { promptUser } from '../index.js';

const calcHash = async (filePath) => {
    try {
        const resolvedPath = path.resolve(process.cwd(), filePath);
        const hash = createHash('sha256');
        const fileStream = fs.createReadStream(resolvedPath);

        return new Promise((resolve) => {
            fileStream.on('data', (data) => {
                hash.update(data);
            });

            fileStream.on('end', () => {
                const fileHash = hash.digest('hex');
                console.log(`File hash: ${fileHash}`);
                resolve();
                promptUser();
            });

            fileStream.on('error', (err) => {
                console.error(`Operation failed. ${err.message}`);
                resolve();
                promptUser();
            });
        });
    } catch (err) {
        console.error(`Operation failed. ${err.message}`);
        promptUser();
    }
};

export default calcHash;
