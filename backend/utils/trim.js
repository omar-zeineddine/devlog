// helper function to trim the contents of a blog and create an excerpt

// arguments
// str: blog body
// length: number of characters to trim out and user as excerpt
// delim: use empty space at end to avoid incomplete words
// appendix: characters to end the excerpt with

exports.textTrim = (str, length, delim, appendix) => {
  if (str.length <= length) {
    return str;
  }

  let trimmedStr = str.substr(0, length + delim.length);
  let lastDelimIndex = trimmedStr.lastIndexOf(delim);

  if (lastDelimIndex >= 0) {
    trimmedStr = trimmedStr.substr(0, lastDelimIndex);
  }

  if (trimmedStr) {
    trimmedStr += appendix;
  }

  return trimmedStr;
};
