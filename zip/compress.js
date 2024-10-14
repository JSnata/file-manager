import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { stat } from 'node:fs/promises';
import { createBrotliCompress } from 'node:zlib';
import { promptUser } from '../index.js';

const compress = async (sourcePath, destinationPath) => {
    try {
        const source = path.resolve(process.cwd(), sourcePath);
        let destination = path.resolve(process.cwd(), destinationPath);

        const destinationStats = await stat(destination).catch(() => null);
        if (destinationStats && destinationStats.isDirectory()) {
            const originalFileName = path.basename(source);
            destination = path.join(destination, `${originalFileName}.br`);
        }

        const brotliCompress = createBrotliCompress();
        const sourceStream = createReadStream(source);
        const destinationStream = createWriteStream(destination);

        return new Promise((resolve, reject) => {
            sourceStream.on('error', (err) => {
                console.error(`Operation failed: ${err.message}`);
                reject(err);
                promptUser();
            });

            brotliCompress.on('error', (err) => {
                console.error(`Operation failed: ${err.message}`);
                reject(err);
                promptUser();
            });

            destinationStream.on('error', (err) => {
                console.error(`Operation failed: ${err.message}`);
                reject(err);
                promptUser();
            });

            destinationStream.on('finish', () => {
                console.log(`File successfully compressed to ${destination}`);
                resolve();
                promptUser();
            });

            sourceStream.pipe(brotliCompress).pipe(destinationStream);
        });
    } catch (err) {
        console.error(`Operation failed: ${err.message}`);
        promptUser();
    }
};

export default compress;
