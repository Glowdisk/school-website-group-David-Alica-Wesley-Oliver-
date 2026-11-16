
const pages = [
  "index.html",
  "Athletics.html",
  "schoolStatsPage.html",
  "Staff-Directory.html"
];

async function searchWebsite() {
  const query = document.getElementById("searchBar")
    .value.toLowerCase().trim();

  const results = document.getElementById("searchResults");
  results.innerHTML = "";

  if (!query) return;

  for (const page of pages) {
    try {
      const response = await fetch(page);
      if (!response.ok) continue;

      const html = await response.text();
      const doc = new DOMParser().parseFromString(
        html, "text/html"
      );

      // Search visible page text, not HTML tags
      doc.querySelectorAll(
        "script, style, nav, footer"
      ).forEach(el => el.remove());

      const text = doc.body.textContent
        .replace(/\s+/g, " ").trim();

      if (text.toLowerCase().includes(query)) {
        const link = document.createElement("a");
        link.href = page;
        link.textContent =
          doc.title || page;

        const item = document.createElement("p");
        item.appendChild(link);
        results.appendChild(item);
      }
    } catch (error) {
      console.error("Could not search:", page, error);
    }
  }

  if (!results.children.length) {
    results.textContent = "No results found.";
  }
}
