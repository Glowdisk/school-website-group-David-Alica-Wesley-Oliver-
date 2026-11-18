const pages = [
  { path: "index.html", title: "Reference Links" },
  { path: "Athletics.html", title: "Athletics" },
  { path: "schoolStatsPage.html", title: "School Statistics" },
  { path: "Staff-Directory.html", title: "Staff Directory" },
  { path: "gradeProgression.html", title: "Course Progression" }
];

function createSnippet(text, match) {
  const start = Math.max(0, match.index - 55);
  const endOfMatch = match.index + match[0].length;
  const end = Math.min(text.length, endOfMatch + 55);
  const highlight = document.createElement("mark");
  highlight.textContent = match[0];

  const item = document.createElement("li");
  item.append(
    (start ? "…" : "") + text.slice(start, match.index),
    highlight,
    text.slice(endOfMatch, end) + (end < text.length ? "…" : "")
  );
  return item;
}

async function searchPage(page, pattern) {
  const response = await fetch(page.path);
  if (!response.ok) throw new Error("Could not load " + page.path);

  const doc = new DOMParser().parseFromString(await response.text(), "text/html");
  doc.querySelectorAll("script, style, template, noscript, form").forEach(element => element.remove());

  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  const parts = [];
  while (walker.nextNode()) {
    parts.push(walker.currentNode.textContent);
  }
  if (page.path === "Athletics.html") {
    for (const { name, coach, hours, location } of sportsData) {
      parts.push(name, coach, hours || "n/a", location || "n/a");
    }
  }

  const text = parts.join(" ").replace(/\s+/g, " ").trim();
  const matches = Array.from(text.matchAll(pattern));
  return { page, text, matches };
}

async function showSearchResults() {
  const query = (new URLSearchParams(location.search).get("q") || "").trim();
  const status = document.getElementById("search-status");
  const results = document.getElementById("searchResults");
  document.querySelector('input[name="q"]').value = query;

  if (!query) {
    status.textContent = "Enter a word to search the website.";
    return;
  }

  const terms = [...new Set(query.toLowerCase().split(/\s+/))];
  terms.sort((first, second) => second.length - first.length);
  const pattern = new RegExp(terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "gi");

  status.textContent = "Searching…";
  const outcomes = await Promise.allSettled(pages.map(page => searchPage(page, pattern)));
  let matchCount = 0;
  let pageCount = 0;

  for (const outcome of outcomes) {
    if (outcome.status !== "fulfilled" || !outcome.value.matches.length) continue;

    const { page, text, matches } = outcome.value;
    matchCount += matches.length;
    pageCount++;

    const link = document.createElement("a");
    link.href = page.path;
    link.textContent = page.title;
    const heading = document.createElement("h2");
    heading.append(link);

    const snippets = document.createElement("ul");
    snippets.append(...matches.map(match => createSnippet(text, match)));

    const section = document.createElement("section");
    section.append(heading, snippets);
    results.append(section);
  }

  const matchLabel = matchCount === 1 ? "match" : "matches";
  const pageLabel = pageCount === 1 ? "page" : "pages";
  status.textContent = matchCount
    ? `${matchCount} ${matchLabel} for “${query}” across ${pageCount} ${pageLabel}.`
    : `No matches found for “${query}”.`;

  const unavailable = outcomes.filter(outcome => outcome.status === "rejected").length;
  if (unavailable) {
    status.textContent += unavailable === pages.length
      ? " The website pages could not be loaded. Open the site through a web server to search."
      : " Some pages could not be loaded.";
  }
}

showSearchResults();
