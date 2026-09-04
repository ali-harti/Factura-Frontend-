const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /walkDom\(document\.body, \(node\) => \{[\s\S]*?\}\);/;
const match = html.match(regex);
if(match) console.log(match[0]);

