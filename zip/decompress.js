import { createReadStream, createWriteStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { createBrotliDecompress } from 'node:zlib';

const decompress = async (sourcePath, destinationPath) => {
  try {
    const source = path.resolve(process.cwd(), sourcePath);
    let destination = path.resolve(process.cwd(), destinationPath);

    const destinationStats = await stat(destination).catch(() => null);

    if (destinationStats && destinationStats.isDirectory()) {
      const originalFileName = path.basename(source, path.extname(source));
      destination = path.join(destination, `${originalFileName}.txt`);
    }


    const brotliDecompress = createBrotliDecompress();
    const sourceStream = createReadStream(source);
    const destinationStream = createWriteStream(destination);

    sourceStream.pipe(brotliDecompress).pipe(destinationStream);

    destinationStream.on('finish', () => {
      console.log(`Decompressed file to ${destination}`);
    });

    sourceStream.on('error', (err) => {
      console.error(err.message);
    });

    brotliDecompress.on('error', (err) => {
      console.error(err.message);
    });

    destinationStream.on('error', (err) => {
      console.error(err.message);
    });
  } catch (err) {
    console.error(err.message);
  }
};

export default decompress;
