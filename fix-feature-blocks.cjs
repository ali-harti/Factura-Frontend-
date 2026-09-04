const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove feature-block from hover transforms
html = html.replace(/\.feature-block, \.problem-card/g, '.problem-card');
html = html.replace(/\.feature-block:hover, \.problem-card/g, '.problem-card');
html = html.replace(/\[data-theme='dark'\] \.feature-block:hover, \s*\[data-theme='dark'\] \.problem-card/g, "[data-theme='dark'] .problem-card");
html = html.replace(/\[data-theme='light'\] \.feature-block:hover, \s*\[data-theme='light'\] \.problem-card/g, "[data-theme='light'] .problem-card");

// 2. Remove feature-block from glossy shine sweep
html = html.replace(/\.feature-block, \.problem-card/g, '.problem-card'); // in case it appears again
html = html.replace(/\.feature-block::after, \.problem-card/g, '.problem-card');
html = html.replace(/\[data-theme='light'\] \.feature-block::after, \s*\[data-theme='light'\] \.problem-card/g, "[data-theme='light'] .problem-card");
html = html.replace(/\.feature-block:hover::after, \.problem-card/g, '.problem-card');
html = html.replace(/\.feature-block > \*, \.problem-card/g, '.problem-card');

// 3. Mouse glow removal - just remove the whole block of CSS and JS for feature-block mouse glow
html = html.replace(/\/\* Mouse-following Radial Glow \*\/[\s\S]*?\[data-theme='light'\] \.feature-block::before \{[\s\S]*?\}/, '');

html = html.replace(/\/\/ Mouse-following Radial Glow for Feature Blocks[\s\S]*?\}\);/g, '');


fs.writeFileSync('index.html', html);
console.log('fixed feature blocks');
