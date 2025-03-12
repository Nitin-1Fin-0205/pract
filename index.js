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



function Person(name, age) {
    this.name = name;
    this.age = age;

}

Person.prototype.greet = function () {
    console.log(`Hello, my name is ${this.name}`);
}
Person.prototype.isAdult = 18;


let person = new Person('John', 30);

person.name = "Nitin"

function Employee(name, age, salary) {
    Person.call(this, name, age);
    this.salary = salary;
}


Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;



const employee = new Employee('John', 30, 50000);

console.log(employee, 'abcd');



const obj = {
    name: "Nitin",
    age: 30,
}

function greet(say) {
    console.log(`${say}, my name is ${this.name}`);
}

greet.call(obj, "Hello");    // this.name = obj.name 
greet.apply(obj, ["Hi"]);
greet.bind(obj, "Dear")();




//#region  Closures

function outer() {
    let outerVar = "I am outer variable";
    return function inner() {
        console.log(outerVar);
    }
}

const innerFunc = outer();
innerFunc();
//#endregion

//#region  Array in JS


let array = new Array();
array.push(1);
array.push(2);
array.push(32);
array.push(4);
array.push(5);

console.log(array);

array.sort((a, b) => {
    return b - a;
});
console.log(array);
console.log(array.slice(0, 2));

const sum = array.reduce((acc, curr) => {
    return acc + curr;
});

console.log(sum);




const fruits = ['Apple', 'Banana', 'Cherry'];

fruits.forEach(function (fruit, indx, arr) {
    console.log(fruit, indx, arr);
});


const newFruits = fruits.map(function (fruit) {
    return fruit + ' Pie';
}
);

console.log(newFruits);


const filterFruits = fruits.filter(function (fruit) {
    return fruit === 'Apple';
}
);

console.log(filterFruits);


const fruit = fruits.find(function (fruit) {
    return fruit === 'Apple';
}
);

console.log(fruit);


//#endregion

//#region  Promise

// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Data fetched successfully');
//     }, 2000);
// }
// );

// console.log('Start');

// promise.then((data) => {
//     console.log(data);
// }
// );

// promise.catch((error) => {
//     console.log(error);
// }
// );

// promise.finally(() => {
//     console.log('Promise completed');
// }
// );

//#endregion

//#region  Async Await

// console.log('\n---------------------------Async Await -----------------------------------\n');
// async function fetchData() {
//     try {
//         const data = await promise;
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }
// }


// fetchData();

// console.log('End');

// //#endregion

//#region  Object in JS

const personObj = {
    name: 'John',
    age: 30,
    greet: function () {
        console.log(`Hello, my name is ${this.name}`);
    }
}

console.log(personObj.name);

personObj.greet();

personObj.age = 40;

console.log(personObj.age);

delete personObj.age;

console.log(personObj.age);


console.log(Object.keys(personObj));
console.log(Object.values(personObj));

console.log(Object.entries(personObj));

for (const [key, value] of Object.entries(personObj)) {
    console.log(key, value);
}

let n = "1A";

let val = parseInt(n,);
console.log(val)


//#endregion

//#region     Event loop 

console.log('Start');

setTimeout(() => {
    console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
    console.log('Promise');
});

console.log('End')

const people = [
    { name: "Nitin", age: 30 },
    { name: "Doe", age: 50 },
    { name: "John", age: 40 },
];

const filteredPeople = people.filter((person) => {
    return person.age > 30;
});
const sortedPeople = people.toSorted((a, b) => {
    return a.age - b.age;
});

console.log(sortedPeople);

for (const person of sortedPeople) {
    for (const [key, value] of Object.entries(person)) {
        console.log(key, value);
    }
}

//#endregion 

//#region  Inheritance in JS
function Animal(name, color) {
    this.name = name;
    this.color = color;
}
let dog = new Animal('Dog', 'White');

console.log(dog);

Animal.prototype.speak = function () {
    console.log('Animal Speak');
}

console.log(dog.speak());



let fish = new Object();
fish.name = "Fish";
fish.color = "Blue";
const man = Object.create(fish);

function livingBeing() {
    this.name = "John";
    this.age = 30;
}



//#endregion

//#region Polyfill for bind

// Function.prototype.toBind = function (arg) {
//     let self = this;
//     let params = arg.slice(1);
//     return function () {
//         self.apply(arg[0], ...params);
//     }
// }

// const obj3 = {
//     name: "Nitin",
//     age: 30,
// }

// function reet(say) {
//     console.log(`${say}, my name is ${this.name}`);
// }

// reet.toBind(obj3, "Hello")();

//#endregion


//#region  Polyfill for call
// map ,filter and reduce (Polyfils for Map):

Array.prototype.toMap = function (callback) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
}

Array.prototype.toFilter = function (callback) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i])) {
            result.push(this[i]);
        }
    }
    return result;
}

console.log([1, 2, 3, 4, 5].toFilter(item => (item % 2 == 0)));

Array.prototype.toReduce = function (callback, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < this.length; i++) {
        accumulator = callback(accumulator, this[i]);
    }
    return accumulator;
}

console.log([1, 2, 3, 4, 5].toReduce((acc, curr) => acc + curr, 0));


//#endregion

//#region  Polyfill for bind

function toBind(func, context, ...args) {
    return function (...newArgs) {
        return func.apply(context, [...args, ...newArgs]);
    }
}

const obj3 = {
    name: "Nitin",
    age: 30,
}

function reet(say) {
    console.log(`${say}, my name is ${this.name}`);
}

toBind(reet, obj3, "Hello")();
//#endregion

//#region  Polyfill for call

Function.prototype.toCall = function (context, ...args) {

    let uniqueId = Date.now();
    context[uniqueId] = this;
    let result = context[uniqueId](...args);
    delete context[uniqueId];
    return result;
}

const obj4 = {
    name: "Nitin",
    age: 30,
}

function callGreet(say) {
    console.log(`${say}, my name is ${this.name}`);
}

callGreet.toCall(obj4, "Hello");


//#endregion

//#region  Polyfill for apply

Function.prototype.toApply = function (context, args) {

    let uniqueId = Date.now();
    context[uniqueId] = this;
    let result = context[uniqueId](...args);
    delete context[uniqueId];
    return result;
}

const obj5 = {
    name: "Nitin",
    age: 30,
}

function applyGreet(say) {
    console.log(`${say}, my name is ${this.name}`);
}

applyGreet.toApply(obj5, ["Hello"]);

//#endregion

//#region  Polyfill for new

function toNew(constructor, ...args) {
    let obj = {};
    Object.setPrototypeOf(obj, constructor.prototype);
    constructor.apply(obj, args);
    return obj;
}

function NewPerson(name, age) {
    this.name = name;
    this.age = age;
}

person = toNew(NewPerson, 'Nitin', 30);

console.log(person);

//#endregion


let name = "Nitin";

for (let char of name) {
    console.log(char);
}
