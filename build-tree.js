const fs = require('fs');
const path = require('path');

const filesDir = path.join(__dirname, 'files');
const result = {};

// Check if the files directory exists
if (fs.existsSync(filesDir)) {
    // Get all subdirectories (Subjects)
    const subjects = fs.readdirSync(filesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const subject of subjects) {
        const subjectPath = path.join(filesDir, subject);
        
        // Get all PDFs in this subject folder
        const pdfs = fs.readdirSync(subjectPath)
            .filter(file => file.toLowerCase().endsWith('.pdf'));
        
        // Only add the subject to our list if it actually contains PDFs
        if (pdfs.length > 0) {
            result[subject] = pdfs;
        }
    }
}

// Write the formatted JSON to files.js
const output = `const pdfData = ${JSON.stringify(result, null, 2)};`;
fs.writeFileSync(path.join(__dirname, 'files.js'), output);
console.log('files.js updated successfully!');
