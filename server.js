const express = require('express');
const app = express();
const serveIndex = require('serve-index');
const gulpTasks = require('./routes/gulp-tasks');
const download = require('./routes/download');

app.use(express.static('public'));
// serveIndex allows user to use browser to view files in this folder
app.use('/assets', serveIndex(__dirname + '/public/assets', { icons: true, view: 'details' }));

app.use('/root', express.static(__dirname));

app.post('/gulp', gulpTasks.gulp);
app.post('/create-zip', download.zip);
// app.post('/download', download.download);

app.set('port', process.env.PORT || 7070);

app.listen(app.get('port'), function() {
  console.log('ESFA Sass compiler running on port ' + app.get('port'));
});
