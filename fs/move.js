import copy from './copy.js';
import { unlink } from 'node:fs/promises';
import remove from './remove.js';

const move = async (source, destination) => {
    try {
        await copy(source, destination);
        await unlink(source);
        console.log(`File "${source}" was moved into "${destination}"`);
    } catch (err) {
        console.error(err.message);
    }
};

export default move;
