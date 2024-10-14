import { createReadStream, createWriteStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import { promptUser } from '../index.js';

const pipelineAsync = promisify(pipeline);

const decompress = async (sourcePath, destinationPath) => {
  try {
    const source = path.resolve(process.cwd(), sourcePath);
    let destination = path.resolve(process.cwd(), destinationPath);

    const destinationStats = await stat(destination).catch((err) => {
      if (err.code === 'ENOENT') {
        console.error(`Operation failed: ${err.message}`);
        promptUser();
        return null;
      }
    });

    if (!destinationStats) return;

    if (destinationStats && destinationStats.isDirectory()) {
      const originalFileName = path.basename(source, '.br');
      destination = path.join(destination, `${originalFileName}`);
    }

    const brotliDecompress = createBrotliDecompress();
    const sourceStream = createReadStream(source);
    const destinationStream = createWriteStream(destination);
    await pipelineAsync(sourceStream, brotliDecompress, destinationStream);

    console.log(`File was  decomressed in ${destination}`);
    promptUser();
  } catch (err) {
    console.error(`Operation failed: ${err.message}`);
    promptUser();
  }
};

export default decompress;
