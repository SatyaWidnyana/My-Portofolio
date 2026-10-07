const fs = require('fs');
const path = require('node:path');

function readPNGDimensions(filePath) {
    const buffer = Buffer.alloc(24);
    const fd = fs.openSync(filePath, 'r');
    fs.readSync(fd, buffer, 0, 24, 0);
    fs.closeSync(fd);
    
    // Check PNG signature
    if (buffer.toString('hex', 0, 8) !== '89504e470d0a1a0a') {
        throw new Error('Not a PNG file');
    }
    
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
}

console.log('Light:', readPNGDimensions(path.join(__dirname, '../image/Foto_card_dekstop.png')));
console.log('Dark:', readPNGDimensions(path.join(__dirname, '../image/Foto_card_desktop_darkmode.png')));
