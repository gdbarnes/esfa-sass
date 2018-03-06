exports.bytesToSize = function(bytes, decimalPlaces) {
  if (0 === bytes) return '0 Bytes';
  const divisor = 1024,
    decimals = decimalPlaces || 2,
    unit = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    unitChooser = Math.floor(Math.log(bytes) / Math.log(divisor));
  return (
    parseFloat((bytes / Math.pow(divisor, unitChooser)).toFixed(decimals)) + ' ' + unit[unitChooser]
  );
};
