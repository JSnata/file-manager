import { promptUser } from '../index.js';
import copy from './copy.js';
import { unlink } from 'node:fs/promises';

const move = async (source, destination) => {
    if (!source || !destination) {
        console.error('Input error');
        promptUser();
        return;
    }
    try {
        await copy(source, destination);
        await unlink(source);
        console.log(`File "${source}" was moved into "${destination}"`);
    } catch (err) {
        console.error(`Operation failed. ${err.message}`);
    } finally {
        promptUser();
    }
};

export default move;
