const express = require('express');
const app = express();
const exec = require('child_process').exec;
var serveIndex = require('serve-index');

app.use(express.static('public'));

// shows a list of files in this folder
app.use(
  '/assets',
  serveIndex(__dirname + '/public/assets', { icons: true, view: 'details' })
);

app.use('/root', express.static(__dirname));

app.post('/send', function(req, res) {
  console.log('Gulp tasks started 🥤...');
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
    console.log('...Gulp tasks complete ✅ ');
  });
  res.send('<h1>Styles built :)</h1>');
});

app.set('port', process.env.PORT || 7070);

app.listen(app.get('port'), function() {
  console.log('ESFA Sass compiler running on port ' + app.get('port'));
});
