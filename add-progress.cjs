const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const css = `
    /* Scroll Progress Bar */
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 4px;
      background: linear-gradient(to right, var(--primary), #fca048, #ff6b6b);
      width: 0%;
      z-index: 9999;
      pointer-events: none;
    }
`;
html = html.replace('</style>', css + '</style>');

const htmlEl = `\n  <div class="scroll-progress" id="scrollProgress"></div>`;
html = html.replace('<body>', '<body>' + htmlEl);

const js = `
    // Scroll Progress
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = progress + '%';
    });
`;
html = html.replace('</script>', js + '\n  </script>');

fs.writeFileSync('index.html', html);
console.log('patched');
