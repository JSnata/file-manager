import { createReadStream, createWriteStream, promises as fsPromises } from 'node:fs';
import path from 'path';
import { promptUser } from '../index.js';

const copy = async (fromPath, toPath) => {
    try {
        if (!fromPath || !toPath) {
            console.error('Input error');
            promptUser();
            return;
        }

        const source = path.resolve(process.cwd(), fromPath);
        const fileName = path.basename(source);
        const destinationDir = path.resolve(process.cwd(), toPath);
        const destination = path.join(destinationDir, fileName);

        try {
            await fsPromises.access(source);
        } catch (err) {
            console.error(`Operation failed. Source file does not exist: ${source}`);
            promptUser();
            return;
        }

        try {
            await fsPromises.access(destinationDir);
        } catch (err) {
            console.error(`Operation failed. Destination directory does not exist: ${destinationDir}`);
            promptUser();
            return;
        }

        const readableStream = createReadStream(source);
        const writableStream = createWriteStream(destination);

        return new Promise((resolve, reject) => {
            readableStream.pipe(writableStream);

            readableStream.on('error', (err) => {
                console.error(`Operation failed. ${err.message}`);
                reject(err);
            });

            writableStream.on('error', (err) => {
                console.error(`Operation failed. ${err.message}`);
                reject(err);
            });

            writableStream.on('finish', () => {
                console.log(`File copied into ${destination}`);
                resolve();
                promptUser();
            });
        });
    } catch (err) {
        console.error(`Operation failed. ${err.message}`);
        promptUser();
    }
};

export default copy;
