const { crawlPage } = require('./crawl.js');

function main() {
  if (process.argv.length < 3) {
    console.log('No website porvided');
    process.exit(1);
  } else if (process.argv.length > 3) {
    console.log('too many command line args');
    process.exit(1);
  }

  const baseURL = process.argv[2];
  console.log(`started crawling - ${baseURL}`);
  crawlPage(baseURL);
}

main();
