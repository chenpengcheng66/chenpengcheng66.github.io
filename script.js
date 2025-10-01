// 通用加载函数
async function loadData(url, callback) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error(`加载 ${url} 失败：`, error);
  }
}

/* ===== 渲染函数 ===== */
// 新闻动态（只显示最新3条）
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
    row.innerHTML = `
      <td>${index + 1}.</td>
      <td>
        <strong>${paper.title}</strong><br>
        ${paper.authors}<br>
        <em>${paper.venue}</em><br>
        <a href="${paper.pdf}" target="_blank">[PDF]</a>
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
    row.innerHTML = `
      <td>${index + 1}.</td>
      <td>
        <strong>${paper.title}</strong><br>
        ${paper.authors}<br>
        <em>${paper.venue}</em><br>
        <a href="${paper.pdf}" target="_blank">[PDF]</a>
      </td>
    `;
    table.appendChild(row);
  });
}

// 教育经历
function renderEducation(education) {
  const ul = document.querySelector(".education-list");
  education.forEach(item => {
    const li = document.createElement("li");

    // 拼接导师信息
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

/* ===== 页面加载后执行 ===== */
document.addEventListener("DOMContentLoaded", () => {
  loadData("data/news.json", renderNews);
  loadData("data/papers.json", renderPapers);
  loadData("data/confpapers.json", renderConfPapers);
  loadData("data/education.json", renderEducation);
});
