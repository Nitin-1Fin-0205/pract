// const fs = require('fs');
// const path = require('path');
// const PDFDocument = require('pdfkit');
// const cwd = process.cwd();

// function px2MM(px) {
//     // Convert pixels to millimeters
//     const mm = px * 0.264583;
//     return mm;
// }

// function mm2PX(mm, dpi = 96) {
//     const inches = mm / 25.4;
//     const pixels = inches * dpi;
//     return pixels;
// }

// function scalePage(doc) {
//     const width = 2381.12;
//     const height = 3367.56;

//     let scaleX = width / doc.page.width;
//     let scaleY = height / doc.page.height;
//     let scale = Math.min(scaleX, scaleY);

//     return scale;
// }

// function bank_trace_report(json) {
//     const doc = new PDFDocument({
//         size: 'a4',
//         margin: 0,
//         layout: 'portrait',
//     });

//     doc.scale(scalePage(doc));


//     doc.registerFont('calibri', path.join(cwd, 'assets', 'fonts', 'Calibri', 'Calibri.ttf'));
//     doc.registerFont('calibrib', path.join(cwd, 'assets', 'fonts', 'Calibri', 'calibrib.ttf'));

//     doc.font('calibrib').fontSize(px2MM(11))

//     ////////////////////////  Page 1

//     doc.fontSize(px2MM(11))
//         .text("Bank Traceability Report", px2MM(80), px2MM(78), {
//             width: px2MM(600),
//             height: px2MM(14),
//         });
//     let undelineWidth = doc.fontSize(px2MM(11)).widthOfString('1 Finance Log of Customer Onbarding');

//     doc.lineWidth(0.2);
//     doc.moveTo(px2MM(80), px2MM(88))
//         .lineTo(px2MM(80) + undelineWidth, px2MM(88))
//         .stroke();

//     let table2_c1_val = ['Name', 'Amount', 'Mode of Payment : UPI', 'Client UPI ID', 'Date & time'];
//     let table2_col2_vals = [json.name || '', json.amount || '', json.mode_of_payment || '', json.client_upi_id || '', json.date_time || ''];

//     console.log(table2_c1_val, table2_col2_vals)

//     let y = px2MM(14) + doc.y;
//     for (let i = 0; i < table2_c1_val.length; i++) {
//         let lineoftext = Math.ceil(doc.fontSize(px2MM(10)).widthOfString(table2_col2_vals[i]) / px2MM(220));
//         lineoftext = lineoftext > 0 ? lineoftext : 1;

//         const height = doc.currentLineHeight();
//         let cellHeight = mm2PX(lineoftext * (height + 1)) + 4;

//         doc.lineWidth(px2MM(0.5)).rect(px2MM(80), y, px2MM(160), px2MM(cellHeight))
//             .stroke();

//         doc.font('calibri').fontSize(px2MM(10))
//             .text(table2_c1_val[i], px2MM(82), y + px2MM(5), {
//                 width: px2MM(400),
//                 height: px2MM(12)
//             });

//         doc.lineWidth(px2MM(0.5)).rect(px2MM(240), y, px2MM(230), px2MM(cellHeight))
//             .stroke();

//         doc.font('calibri').fontSize(px2MM(10))
//             .text(table2_col2_vals[i], px2MM(247), y + px2MM(5), {
//                 width: px2MM(220),
//             });

//         y += px2MM(cellHeight);
//     }


//     doc.pipe(fs.createWriteStream(path.join(cwd, 'output.pdf')));
//     console.log('pdf generated successfully');
//     doc.end()

//     return;

//     // const chunks: Buffer[] = [];
//     // doc.on('data', (chunk: Buffer) => chunks.push(chunk));

//     // return new Promise((resolve, reject) => {
//     //     doc.on('end', () => resolve(Buffer.concat(chunks)));
//     //     doc.on('error', reject);
//     //     doc.end();
//     // });
// }

// const json = {
//     name: 'John Doe',
//     amount: '1000',
//     mode_of_payment: 'UPI',
//     client_upi_id: 'john@upi',
//     date_time: '2021-07-21 12:00:00'
// };

// bank_trace_report(json);