const express = require('express');
const app = express();
const exec = require('child_process').exec;

app.use(express.static('public'));
app.use('/root', express.static(__dirname));

app.post('/send', function(req, res) {
  console.log('Gulp task started...');
  exec('gulp build');
  console.log('Gulp task complete');
  res.send('Styles built');
});

app.listen(3000, function() {
  console.log('ESFA Sass compiler: http://localhost:3000/');
});
