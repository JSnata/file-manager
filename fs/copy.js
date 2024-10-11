import { createReadStream, createWriteStream } from 'node:fs';
import path from 'path';

const copy = async (fromPath, toPath) => {
    try {
        const source = path.resolve(process.cwd(), fromPath);
        const fileName = path.basename(source);
        const destination = path.join(toPath, fileName);

        const readableStream = createReadStream(source);
        const writableStream = createWriteStream(destination);

        readableStream.pipe(writableStream);

        readableStream.on('error', (err) => {
            console.error(err.message);
        });

        writableStream.on('error', (err) => {
            console.error(err.message);
        });

        writableStream.on('finish', () => {
            console.log(`File copied into ${destination}`);
        });
    } catch (err) {
        console.error(`FS operation failed: ${err.message}`);
    }
};

export default copy;
