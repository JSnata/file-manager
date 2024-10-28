# File Manager

## Assignment Overview
The **File Manager** is a CLI-based Node.js application that allows users to perform various file operations, obtain system information, calculate file hashes, and handle file compression and decompression. This app is implemented solely using Node.js APIs, without any external dependencies.

## Features
- **File Operations**: Copy, move, delete, rename, and read files.
- **Navigation**: Traverse the file system from the root directory and within directories.
- **System Information**: Retrieve information about the OS, such as EOL, CPUs, home directory, current username, and architecture.
- **Hash Calculation**: Generate a hash for file content.
- **Compression & Decompression**: Compress and decompress files using the Brotli algorithm.

## Installation and Usage

1. **Clone the Repository**:
   git clone https://github.com/yourusername/file-manager.git
   cd file-manager
   
2. **Run the Application**: Start the app with your username:
   npm run start -- --username=your_username

3. Exit by pressing Ctrl + C or typing .exit, which will display:

## Commands
### Navigation & Working Directory (nwd)
- Up one level: `up`
- Change directory (path can be relative or absolute): `cd path_to_directory`
- List directory contents in alphabetical order, with folders listed first: `ls`

### File Operations

- Read a file: `cat path_to_file`
- Create a new file in the current directory: `add new_file_name`
- Rename a file: `rn path_to_file new_filename`
- Copy a file: `cp path_to_file path_to_new_directory`
- Move a file: `mv path_to_file path_to_new_directory`
- Delete a file: `rm path_to_file`

### Operating System Info

- Get system EOL (End-Of-Line) symbol: `os --EOL`
- Get CPU information: `os --cpus`
- Get home directory: `os --homedir`
- Get system user name: `os --username`
- Get CPU architecture: `os --architecture`

### Hash Calculation

- Calculate file hash: `hash path_to_file`

### Compression & Decompression

- Compress a file: `compress path_to_file path_to_destination`
- Decompress a file: `decompress path_to_file path_to_destination`
