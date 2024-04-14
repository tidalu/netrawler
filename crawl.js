const { JSDOM } = require('jsdom');

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  if (baseURLObj.hostname !== new URL(currentURL).hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }
  pages[normalizedCurrentURL] = 1;

  console.log(`Actively crawling:  ${currentURL}`);

  try {
    const resp = await fetch(currentURL);

    if (resp.status > 399) {
      console.log(
        `Error in fetch with status code ${resp.status} on page  ${currentURL}`
      );
      return pages;
    }

    const contentType = resp.headers.get('content-type');
    if (!contentType.startsWith('text/html')) {
      console.log(
        `non html response : content type  ${contentType} on page  ${currentURL}`
      );
      return pages;
    }

    const htmlBody = await resp.text();

    const nextURLs = getURLsFromHTML(htmlBody, baseURL);
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }

    return pages;
  } catch (error) {
    console.log(`error in fetch ${error.message}, on page ${currentURL}`);
    return pages;
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
