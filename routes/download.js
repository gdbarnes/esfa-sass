const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const h = require('./../helpers');

const downloadFilePath = path.join(__dirname, '..', '/public/downloads/assets.zip');
exports.zip = (req, res) => {
  console.log('\nCreating zip... 🗜\n');
  const output = fs.createWriteStream(downloadFilePath);
  const archive = archiver('zip', {
    zlib: { level: 9 }
  });

  output.on('close', function() {
    console.log('...zip created (' + h.bytesToSize(archive.pointer()) + ')\n');
  });

  output.on('end', function() {
    console.log('Data has been drained');
  });

  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      console.warn(err);
    } else {
      throw err;
    }
  });

  archive.on('error', function(err) {
    res.status(500).send({ error: err.message });
  });

  archive.pipe(output);

  const directory = path.join(__dirname, '..', '/public/assets/');
  archive.directory(directory, false);
  archive.finalize();

  res.send('<h1>Archive created.</h1>');
};

// exports.download = (req, res) => {
//   console.log('Downloading');
//   res.download(downloadFilePath);
// };
