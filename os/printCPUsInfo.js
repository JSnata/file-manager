import os from 'os';

const printCPUsInfo = () => {
    console.log(`Amount of CPUs: ${os.cpus().length}`);
    
    os.cpus().forEach((cpu, i) => {
        const clockRate = (cpu.speed / 1000).toFixed(2);
        console.log(`CPU ${i + 1}: model: ${cpu.model}, clock rate: ${clockRate} GHz`);
    });
};

export default printCPUsInfo;
