import { createReadStream } from 'node:fs';
import path from 'node:path';

const read = async (filePath) => {
    const resolvedPath = path.resolve(process.cwd(), filePath);
    console.log(resolvedPath);
    
    const fileStream = createReadStream(resolvedPath, { encoding: 'utf-8' });
    fileStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    fileStream.on('end', () => {
        console.log('\nFile reading finished.');
    });

    fileStream.on('error', (err) => {
        console.error(err);
    });
};

export default read;
