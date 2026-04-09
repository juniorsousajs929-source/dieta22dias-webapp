const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ margin: 50, size: 'A4' });

// Salvar diretamente na pasta Downloads
const downloadPath = 'C:\\Users\\Ryzen 5 5600G\\Downloads\\Acesso_Dieta_22_Dias.pdf';
const stream = fs.createWriteStream(downloadPath);
doc.pipe(stream);

// Cover or Title
doc.rect(0, 0, doc.page.width, 140).fill('#2ecc71'); // Green theme for the Main Diet

doc.fontSize(24)
   .fillColor('white')
   .font('Helvetica-Bold')
   .text('Dieta 22 Dias', 50, 40, { align: 'center' })
   .fontSize(16)
   .font('Helvetica')
   .text('Acceso a la Aplicación Principal', { align: 'center' });

doc.moveDown(5);

// Main Body
doc.fontSize(20)
   .fillColor('#333333')
   .font('Helvetica-Bold')
   .text('¡Bienvenida a tu viaje de transformación!', { align: 'center' });

doc.moveDown(1.5);

doc.fontSize(14)
   .font('Helvetica')
   .fillColor('#555555')
   .text('Tu cuenta ha sido creada con éxito. A partir de ahora, todo tu contenido, recetas y guías estarán disponibles en un solo lugar: nuestra Aplicación Exclusiva de Miembros.', { align: 'center', lineGap: 6 });

doc.moveDown(2);

doc.fontSize(16)
   .fillColor('#000000')
   .font('Helvetica-Bold')
   .text('Sigue estos pasos para entrar:', { align: 'center' });

doc.moveDown(1.5);

// URL Section
doc.rect(50, doc.y, doc.page.width - 100, 60).fill('#f9fcfb').stroke('#2ecc71');
const linkY = doc.y + 15;
doc.fontSize(14)
   .fillColor('#555555')
   .text('1. Ve al siguiente enlace desde tu celular o computadora:', 50, linkY-25, { align: 'center' })
   .fontSize(16)
   .fillColor('#2980b9')
   .font('Helvetica-Bold')
   .text('https://dieta22dias-webapp.vercel.app', 50, linkY, { align: 'center' });

doc.moveDown(4);

// Password Section
doc.fontSize(14)
   .fillColor('#555555')
   .font('Helvetica')
   .text('2. En la pantalla de ingreso protegido, escribe el correo electrónico que usaste al realizar tu compra y utiliza tu Contraseña Universal Abajo:', { align: 'center', lineGap: 6 });

doc.moveDown(1.5);

doc.rect(50, doc.y, doc.page.width - 100, 70).fill('#f1fcf5').stroke('#2ecc71');
const passY = doc.y + 20;
doc.fontSize(28)
   .fillColor('#27ae60')
   .font('Helvetica-Bold')
   .text('empezar22', 50, passY, { align: 'center' });

doc.moveDown(4);

// Footer
doc.fontSize(12)
   .fillColor('#888888')
   .font('Helvetica')
   .text('Nota: Si adquiriste algún Pase VIP (Escáner o Doces), podrás desbloquearlos directo adentro de la Aplicación con tu código especial. ¡Disfruta tu Dieta!', { align: 'center', lineGap: 4 });

doc.end();

stream.on('finish', () => {
    console.log('PDF Principal gerado com sucesso em: ' + downloadPath);
});
