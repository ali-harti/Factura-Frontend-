const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The issue is likely a dangling `});` caused by the way I removed the mouse-glow JS.
// Looking at the grep output:
// 2052:    });
// 2053-
// 2054-  
// 2055-    
// 2056:    });   <--- THIS IS THE DANGLING TOKEN
// 2057-
// 2058-  
// 2059-    // Sparkle Canvas Particle System

html = html.replace(/    \}\);\s*\n\s*\n\s*\n\s*\}\);\s*\n\s*\n\s*\/\/ Sparkle Canvas/, '    });\n\n  // Sparkle Canvas');
fs.writeFileSync('index.html', html);
console.log('fixed js syntax');
