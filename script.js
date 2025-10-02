async function loadData(url, callback) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error(`加载 ${url} 失败：`, error);
  }
}

function renderNews(news) {
  const ul = document.querySelector(".news-list");
  news.slice(0, 3).forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>[${item.date}]</strong> ${item.text}`;
    ul.appendChild(li);
  });
}

// 学术期刊论文
function renderPapers(papers) {
  const table = document.querySelector(".paper-list");
  papers.forEach((paper, index) => {
    const row = document.createElement("tr");

    // 可选的 PDF 和 Code
    let links = [];
    if (paper.pdf) {
      links.push(`<a href="${paper.pdf}" target="_blank">[PDF]</a>`);
    }
    if (paper.code) {
      links.push(`<a href="${paper.code}" target="_blank">[Code]</a>`);
    }
    let linksHtml = links.length > 0 ? links.join(" ") : "";

    // 来源（source）
    let sourceHtml = paper.source ? `<div class="paper-source">${paper.source}</div>` : "";

    row.innerHTML = `
      <td>${index + 1}.</td>
      <td>
        <strong>${paper.title}</strong><br>
        ${paper.authors}<br>
        <em>${paper.venue}</em><br>
        ${linksHtml}
        ${sourceHtml}
      </td>
    `;
    table.appendChild(row);
  });
}

// 会议论文
function renderConfPapers(confpapers) {
  const table = document.querySelector(".confpaper-list");
  confpapers.forEach((paper, index) => {
    const row = document.createElement("tr");

    let links = [];
    if (paper.pdf) {
      links.push(`<a href="${paper.pdf}" target="_blank">[PDF]</a>`);
    }
    if (paper.code) {
      links.push(`<a href="${paper.code}" target="_blank">[Code]</a>`);
    }
    let linksHtml = links.length > 0 ? links.join(" ") : "";

    let sourceHtml = paper.source ? `<div class="paper-source">${paper.source}</div>` : "";

    row.innerHTML = `
      <td>${index + 1}.</td>
      <td>
        <strong>${paper.title}</strong><br>
        ${paper.authors}<br>
        <em>${paper.venue}</em><br>
        ${linksHtml}
        ${sourceHtml}
      </td>
    `;
    table.appendChild(row);
  });
}


function renderEducation(education) {
  const ul = document.querySelector(".education-list");
  education.forEach(item => {
    const li = document.createElement("li");

    let advisorParts = [];
    if (item.advisor && item.advisor.name && item.advisor.link) {
      advisorParts.push(`Advisor: <a href="${item.advisor.link}" target="_blank">${item.advisor.name}</a>`);
    }
    if (item.coAdvisor && item.coAdvisor.name && item.coAdvisor.link) {
      advisorParts.push(`Co-advisor: <a href="${item.coAdvisor.link}" target="_blank">${item.coAdvisor.name}</a>`);
    }
    const advisorsHtml = advisorParts.length > 0 ? `<br>${advisorParts.join(" &nbsp;&nbsp; ")}` : "";

    li.innerHTML = `
      <strong>${item.degree}</strong>, ${item.school} (${item.year})
      ${advisorsHtml}
    `;
    ul.appendChild(li);
  });
}

function renderWork(work) {
  const ul = document.querySelector(".work-list");
  work.forEach(item => {
    const li = document.createElement("li");

    let advisorParts = [];
    if (item.advisor && item.advisor.name && item.advisor.link) {
      advisorParts.push(`Advisor: <a href="${item.advisor.link}" target="_blank">${item.advisor.name}</a>`);
    }
    if (item.coAdvisor && item.coAdvisor.name && item.coAdvisor.link) {
      advisorParts.push(`Co-advisor: <a href="${item.coAdvisor.link}" target="_blank">${item.coAdvisor.name}</a>`);
    }
    const advisorsHtml = advisorParts.length > 0 ? `<br>${advisorParts.join(" &nbsp;&nbsp; ")}` : "";

    li.innerHTML = `
      <strong>${item.degree}</strong>, ${item.school} (${item.year})
      ${advisorsHtml}
    `;
    ul.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadData("data/news.json", renderNews);
  loadData("data/papers.json", renderPapers);
  loadData("data/confpapers.json", renderConfPapers);
  loadData("data/education.json", renderEducation);
  loadData("data/work.json", renderWork);
});
