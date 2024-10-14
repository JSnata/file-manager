import { createReadStream } from 'node:fs';
import path from 'node:path';
import { promptUser } from '../index.js';

const read = async (filePath) => {
    const resolvedPath = path.resolve(process.cwd(), filePath);
    console.log(resolvedPath);
    
    const fileStream = createReadStream(resolvedPath, { encoding: 'utf-8' });
    fileStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    fileStream.on('end', () => {
        console.log('\nFile reading finished.');
        promptUser();
    });

    fileStream.on('error', (err) => {
        console.error(`Operation failed. ${err.message}`);
        promptUser();
    });
};

export default read;
