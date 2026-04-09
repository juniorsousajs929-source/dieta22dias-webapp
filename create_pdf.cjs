const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ margin: 50, size: 'A4' });

const stream = fs.createWriteStream('public/materiais/Acesso_Receitas_Doces.pdf');
doc.pipe(stream);

// Cover or Title
doc.rect(0, 0, doc.page.width, 140).fill('#a03b5b');

doc.fontSize(24)
   .fillColor('white')
   .font('Helvetica-Bold')
   .text('Dieta 22 Dias', 50, 40, { align: 'center' })
   .fontSize(16)
   .font('Helvetica')
   .text('100 Recetas Dulces Sin Azucar', { align: 'center' });

doc.moveDown(5);

// Main Body
doc.fontSize(20)
   .fillColor('#333333')
   .font('Helvetica-Bold')
   .text('Felicidades por tu excelente decision!', { align: 'center' });

doc.moveDown(1.5);

doc.fontSize(14)
   .font('Helvetica')
   .fillColor('#555555')
   .text('Tu expansion de recetas ya esta disponible. Has desbloqueado el pase premium para acceder a nuestra exclusiva coleccion de postres cetogenicos, para que puedas quemar grasa mientras comes lo que mas te gusta.', { align: 'center', lineGap: 6 });

doc.moveDown(3);

doc.fontSize(16)
   .fillColor('#000000')
   .font('Helvetica-Bold')
   .text('Sigue estos 3 pasos simples para desbloquearla:', { align: 'center' });

doc.moveDown(1.5);

doc.fontSize(14)
   .font('Helvetica')
   .text('1. Abre la aplicacion de la Dieta 22 Dias.', { align: 'left' })
   .moveDown(0.5)
   .text('2. Ve a la seccion de Postres (Recetas).', { align: 'left' })
   .moveDown(0.5)
   .text('3. Toca cualquier receta bloqueada e ingresa tu codigo VIP secreto:', { align: 'left' });

doc.moveDown(3);

// The Password Box
doc.rect(50, doc.y, doc.page.width - 100, 80).fill('#fef9f6').stroke('#a03b5b');
const passY = doc.y + 25;
doc.fontSize(28)
   .fillColor('#a03b5b')
   .font('Helvetica-Bold')
   .text('VIPDOCES', 50, passY, { align: 'center' });

doc.moveDown(4);

// Footer
doc.fontSize(12)
   .fillColor('#888888')
   .font('Helvetica')
   .text('Guarda este documento en un lugar seguro. Disfruta tus postres!', { align: 'center' });

doc.end();

stream.on('finish', () => {
    console.log('PDF stream fechado e criado perfeitamente com sucesso!');
});
