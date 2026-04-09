const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('public/materiais/200_RECETAS.pdf');

(async () => {
    try {
        let fn = pdf.default || pdf;
        const data = await fn(dataBuffer);
        const text = data.text;
        
        let lines = text.split('\n');
        let recipes = [];
        let count = 0;
        for(let i=0; i<lines.length; i++) {
           let line = lines[i].trim();
           if(line.length > 5 && line === line.toUpperCase() && !line.includes('RECETAS')) {
               recipes.push(`L: ${i} -> ${line}`);
               count++;
               if(count > 100) break;
           }
        }
        console.log("Found titles:", recipes.join('\n'));
    } catch(e) {
        console.error("Error:", e);
    }
})();
