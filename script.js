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
  if (!table) return;

  papers.forEach((paper, index) => {
    const row = document.createElement("tr");

    // PDF & Code
    let links = [];
    if (paper.pdf) {
      links.push(`<a href="${paper.pdf}" target="_blank">[PDF]</a>`);
    }
    if (paper.code) {
      links.push(`<a href="${paper.code}" target="_blank">[Code]</a>`);
    }

    // Source 和链接在同一行
    let linksAndSource = "";
    if (links.length > 0 || paper.source) {
      linksAndSource =
        `<div class="paper-links">${links.join(" ")} ${paper.source || ""}</div>`;
    }

    row.innerHTML = `
      <td>${index + 1}.</td>
      <td>
        <strong>${paper.title}</strong><br>
        ${paper.authors}<br>
        <em>${paper.venue}</em><br>
        ${linksAndSource}
      </td>
    `;
    table.appendChild(row);
  });
}

// 学术会议论文
function renderConfPapers(confpapers) {
  const table = document.querySelector(".confpaper-list");
  if (!table) return;

  confpapers.forEach((paper, index) => {
    const row = document.createElement("tr");

    let links = [];
    if (paper.pdf) {
      links.push(`<a href="${paper.pdf}" target="_blank">[PDF]</a>`);
    }
    if (paper.code) {
      links.push(`<a href="${paper.code}" target="_blank">[Code]</a>`);
    }

    let linksAndSource = "";
    if (links.length > 0 || paper.source) {
      linksAndSource =
        `<div class="paper-links">${links.join(" ")} ${paper.source || ""}</div>`;
    }

    row.innerHTML = `
      <td>${index + 1}.</td>
      <td>
        <strong>${paper.title}</strong><br>
        ${paper.authors}<br>
        <em>${paper.venue}</em><br>
        ${linksAndSource}
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
