const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'tcnapi-grpc-web/src');
const globalContent = `const global = {proto: {}};\nmodule.exports = global;\n`;

// Function to write or overwrite the global.js file at the root of src
function createGlobalFile() {
    const globalFilePath = path.join(srcDir, 'global.js');
    fs.writeFileSync(globalFilePath, globalContent, 'utf8');
}

// Function to recursively traverse the src directory and modify files
function modifyFiles(dirPath, depth) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Recurse into a subdirectory
            modifyFiles(filePath, depth + 1);
        } else if (stat.isFile() && path.extname(file) === '.js') {
            // Modify .js files
            const content = fs.readFileSync(filePath, 'utf8');
            if (content.includes("var jspb = require('google-protobuf');")) {
                const relativePath = '../'.repeat(depth) + 'global.js';
                const replacement = `var jspb = require('google-protobuf');\nvar globalThis = require("${relativePath}");\nvar proto = globalThis.proto;`;
                const newContent = content.replace(
                    "var jspb = require('google-protobuf');",
                    replacement
                );
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Modified: ${filePath}`);
            }
        }
    });
}

// Create or overwrite global.js in the src directory
createGlobalFile();

// Start modifying files from the root of the src directory
modifyFiles(srcDir, 0);