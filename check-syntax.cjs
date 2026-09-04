const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatches = html.match(/<script>([\s\S]*?)<\/script>/g);
if (scriptMatches) {
  scriptMatches.forEach((script, idx) => {
    const code = script.replace(/<\/?script>/g, '');
    try {
      new (require('vm').Script)(code);
      console.log(`Script ${idx} is valid.`);
    } catch (e) {
      console.error(`Script ${idx} Error:`, e.message);
      // find line of error
      fs.writeFileSync(`temp_script_${idx}.cjs`, code);
    }
  });
}
