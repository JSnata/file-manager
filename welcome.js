 const welcome = () => {
    let username;
    if (process.argv.length === 2) {
        console.error('Error: You should provide your name in the format --username=your_name!');
        process.exit(1);
    }

    process.argv.slice(2).map((arg) => {
        if (arg.includes('--username')){
            username = arg.split('=')[1];
            console.log(`Welcome to the File Manager, ${username}!`);
        }
    });
    if (!username) {
        console.error('Error: You should provide your name in the format --username=your_name!');
        process.exit(1);
    }
    return username;
}

export default welcome;