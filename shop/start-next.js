// start-next.js
const { exec } = require('child_process');

// Change port to 3002
const port = process.env.PORT || 3002;

exec(`next start -p ${port}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error starting Next.js server: ${err.message}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
