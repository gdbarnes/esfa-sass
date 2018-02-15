const exec = require('child_process').exec;

exports.gulp = (req, res) => {
  console.log('\nGulp tasks started... 🥤\n');
  exec('gulp', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error} ❌`);
      return;
    }

    if (stderr) {
      console.error(`exec stderr: ${stderr} ❌`);
      return;
    }

    console.log(stdout);
    console.log('...Gulp tasks complete ✅');
  });
  res.send('<h1>Styles built.</h1>');
};
