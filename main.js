const { crawlPage } = require('./crawl.js');

async function main() {
  if (process.argv.length < 3) {
    console.log('No website porvided');
    process.exit(1);
  } else if (process.argv.length > 3) {
    console.log('too many command line args');
    process.exit(1);
  }

  const baseURL = process.argv[2];

  if (!isValidURL(baseURL)) {
    console.log('Invalid URL provided');
    process.exit(1);
  }

  console.log(`started crawling - ${baseURL}`);
  const pages = await crawlPage(baseURL, new URL(baseURL), {});

  for (const page of Object.entries(pages)) {
    console.log('# ', page);
  }
}

function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

main();
