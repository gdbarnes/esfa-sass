const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const h = require('./../helpers');

exports.zip = (req, res) => {
  console.log('\nCreating zip... 🗜\n');
  const output = fs.createWriteStream(
    path.join(__dirname, '..', '/public/downloads/esfa-govuk-assets.zip')
  );
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  output.on('close', function() {
    console.log('...zip created (' + h.bytesToSize(archive.pointer()) + ')\n');
  });

  output.on('end', function() {
    console.log('Data has been drained');
  });

  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  archive.on('error', function(err) {
    res.status(500).send({ error: err.message });
  });

  //on stream closed we can end the request
  // archive.on('end', function() {
  //   console.log('Archive wrote %d bytes', archive.pointer());
  // });

  //this is the streaming magic
  archive.pipe(output);

  const directory = path.join(__dirname, '..', '/public/assets/');
  archive.directory(directory, false);
  archive.finalize();

  res.send('<h1>Archive created.</h1>');
};

exports.download = (req, res) => {
  console.log('Downloading');
  const file = path.join(
    __dirname,
    '..',
    '/public/downloads/esfa-govuk-assets.zip'
  );
  res.download(file);
};
