import fs from 'fs';
import path from 'path';

const result = fs.cpSync(path.join(__dirname, '..'), path.join(__dirname, '..', '..'), {
  recursive: true,
  dereference: true,
});

console.log('Reset complete.');
