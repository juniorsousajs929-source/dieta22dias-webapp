const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ margin: 50, size: 'A4' });

// Salvando direto na pasta Downloads do cliente!
const downloadPath = 'C:\\Users\\Ryzen 5 5600G\\Downloads\\Acesso_Escaner_AI_Nutricionista.pdf';
const stream = fs.createWriteStream(downloadPath);
doc.pipe(stream);

// Cover or Title
doc.rect(0, 0, doc.page.width, 140).fill('#1c1c1e'); // Dark theme for AI

doc.fontSize(24)
   .fillColor('#ff4d4d')
   .font('Helvetica-Bold')
   .text('Dieta 22 Dias', 50, 40, { align: 'center' })
   .fontSize(16)
   .fillColor('white')
   .font('Helvetica')
   .text('Nutricionista AI De Bolsillo (Escaner)', { align: 'center' });

doc.moveDown(5);

// Main Body
doc.fontSize(20)
   .fillColor('#333333')
   .font('Helvetica-Bold')
   .text('Felicidades por adquirir la Inteligencia Artificial!', { align: 'center' });

doc.moveDown(1.5);

doc.fontSize(14)
   .font('Helvetica')
   .fillColor('#555555')
   .text('Has desbloqueado el pase premium para utilizar el escáner de calorias, la tecnología más avanzada para garantizar que tus platos cumplan con la Dieta de 22 Días.', { align: 'center', lineGap: 6 });

doc.moveDown(3);

doc.fontSize(16)
   .fillColor('#000000')
   .font('Helvetica-Bold')
   .text('Sigue estos 3 pasos simples para desbloquearla:', { align: 'center' });

doc.moveDown(1.5);

doc.fontSize(14)
   .font('Helvetica')
   .text('1. Abre la aplicación Dieta 22 Dias.', { align: 'left' })
   .moveDown(0.5)
   .text('2. Ve a la sección superior que dice "Escaner AI".', { align: 'left' })
   .moveDown(0.5)
   .text('3. Aparecerá un bloqueo. En la caja blanca ingresa tu código VIP secreto:', { align: 'left' });

doc.moveDown(3);

// The Password Box
doc.rect(50, doc.y, doc.page.width - 100, 80).fill('#2c2c2e').stroke('#ff4d4d');
const passY = doc.y + 25;
doc.fontSize(28)
   .fillColor('white')
   .font('Helvetica-Bold')
   .text('VIPSCANNER', 50, passY, { align: 'center' });

doc.moveDown(4);

// Footer
doc.fontSize(12)
   .fillColor('#888888')
   .font('Helvetica')
   .text('Guarda este documento en un lugar seguro. ¡Disfruta el poder de la IA!', { align: 'center' });

doc.end();

stream.on('finish', () => {
    console.log('PDF Scanner gerado com sucesso em ' + downloadPath);
});
