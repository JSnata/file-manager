import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const calcHash = async (filePath) => {
    return new Promise((resolve, reject) => {
        const resolvedPath = path.resolve(process.cwd(), filePath);
        const hash = createHash('sha256');
        const fileStream = fs.createReadStream(resolvedPath);

        fileStream.on('data', (data) => {
            hash.update(data);
        });

        fileStream.on('end', () => {
            const fileHash = hash.digest('hex');
            console.log(`File hash: ${fileHash}`);
            resolve(fileHash);
        });

        fileStream.on('error', (err) => {
            console.error(err);
            reject(err);
        });
    });
};

export default calcHash;
