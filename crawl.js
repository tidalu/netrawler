const { JSDOM } = require('jsdom');

async function crawlPage(currentURL) {
  console.log(`Acitvely crawling ${currentURL}`);
  try {
    const resp = await fetch(currentURL);

    if (resp.status > 399) {
      console.log(
        `Error in fetch with status code ${resp.status} on page  ${currentURL}`
      );
      return;
    }

    const contentType = resp.headers.get('content-type');
    if (!contentType.startsWith('text/html')) {
      console.log(
        `non html response : content type  ${contentType} on page  ${currentURL}`
      );
      return;
    }

    console.log(await resp.text());
  } catch (error) {
    console.log(`error in fetch ${error.message}, on page ${currentURL}`);
  }
}

function getURLsFromHTML(htmlBody, basURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  let linkElements = dom.window.document.querySelectorAll('a');
  for (const link of linkElements) {
    if (link.href.slice(0, 1) === '/') {
      try {
        const urlObj = new URL(`${basURL}${link.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log('errro', err.message);
      }
    } else {
      try {
        const urlObj = new URL(link.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log('errro', err.message);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);

  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1);
  }

  return hostPath;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
