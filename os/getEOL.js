import os from 'os';

const getEOL = () => {
    console.log(`Default  system End-Of-Line: ${JSON.stringify(os.EOL)}`); 
}

export default getEOL;