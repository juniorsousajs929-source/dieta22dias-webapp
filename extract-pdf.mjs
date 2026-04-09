import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

let dataBuffer = fs.readFileSync('public/materiais/200_RECETAS.pdf');
pdf(dataBuffer).then(function(data) {
    const lines = data.text.split('\n');
    let output = [];
    for(let i=0; i<lines.length; i++) {
        // Look for typical recipe titles or page numbers in the index
        if(/^[A-Z]{3,}/.test(lines[i]) || /[0-9]+/.test(lines[i])) {
            output.push(lines[i]);
        }
    }
    console.log(output.slice(0, 300).join('\n'));
}).catch(e => console.error(e));
