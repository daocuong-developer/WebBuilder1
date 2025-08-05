// src/utils/exportHtml.js
export function handleExport() {
    const project = JSON.parse(localStorage.getItem("currentProject"));
    const pageId = localStorage.getItem("currentPageId");
    const pages = JSON.parse(localStorage.getItem("pages")) || [];
    const posts = JSON.parse(localStorage.getItem(`posts_project_${project?.id}`)) || [];

    const page = pages.find((p) => p.id === pageId);
    const pagePosts = posts.filter((p) => p.pageId === pageId);

    const html = `
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${page?.name}</title>
      </head>
      <body>
        <h1>${page?.name}</h1>
        ${pagePosts.map((p) => `<h2>${p.title}</h2><p>${p.content}</p>`).join("")}
      </body>
    </html>
  `;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${page?.name || "export"}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
