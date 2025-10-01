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

// 学术论文
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

// 科研项目
function renderProjects(projects) {
  const ul = document.querySelector(".project-list");
  projects.forEach(proj => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${proj.name}</strong> （${proj.period}，${proj.role}）<br>${proj.desc}`;
    ul.appendChild(li);
  });
}

// 教学经历
function renderTeaching(teaching) {
  const ul = document.querySelector(".teaching-list");
  teaching.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.time}，${item.course}，${item.role}`;
    ul.appendChild(li);
  });
}

// 荣誉与获奖
function renderAwards(awards) {
  const ul = document.querySelector(".award-list");
  awards.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.year} 年，${item.award}`;
    ul.appendChild(li);
  });
}

// 学术会议论文
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
    li.innerHTML = `<strong>${item.degree}</strong>, ${item.school} (${item.year})<br>${item.detail}`;
    ul.appendChild(li);
  });
}




/* ===== 页面加载后执行 ===== */
document.addEventListener("DOMContentLoaded", () => {
  loadData("data/news.json", renderNews);
  loadData("data/papers.json", renderPapers);
  loadData("data/confpapers.json", renderConfPapers); // 新增
  loadData("data/projects.json", renderProjects);
  loadData("data/teaching.json", renderTeaching);
  loadData("data/awards.json", renderAwards);
  loadData("data/education.json", renderEducation);
});
