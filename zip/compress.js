import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { stat } from 'node:fs/promises';
import { createBrotliCompress } from 'node:zlib';

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

        sourceStream.pipe(brotliCompress).pipe(destinationStream);

        destinationStream.on('finish', () => {
            console.log(`File compressed to ${destination}`);
        });

        sourceStream.on('error', (err) => {
            console.error(err.message);
        });

        brotliCompress.on('error', (err) => {
            console.error(err.message);
        });

        destinationStream.on('error', (err) => {
            console.error(err.message);
        });
    } catch (err) {
        console.error(err.message);
    }
};

export default compress;
