// 通用加载函数
async function loadData(url, renderFn) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderFn(data);
  } catch (err) {
    console.error("加载失败:", url, err);
  }
}

// 渲染论文
function renderPapers(papers) {
  const table = document.querySelector(".paper-list");
  papers.forEach((p, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}.</td>
      <td>
        <strong>${p.title}</strong><br>
        ${p.authors}<br>
        <em>${p.venue}</em><br>
        <a href="${p.pdf}" target="_blank">[PDF]</a>
      </td>
    `;
    table.appendChild(row);
  });
}

// 渲染项目
function renderProjects(projects) {
  const ul = document.querySelector(".project-list");
  projects.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${p.title}</strong> (${p.year})<br>${p.desc}`;
    ul.appendChild(li);
  });
}

// 渲染教学
function renderTeaching(teaching) {
  const ul = document.querySelector(".teaching-list");
  teaching.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.course} (${t.semester})`;
    ul.appendChild(li);
  });
}

// 渲染获奖
function renderAwards(awards) {
  const ul = document.querySelector(".award-list");
  awards.forEach(a => {
    const li = document.createElement("li");
    li.textContent = `${a.year} - ${a.title}`;
    ul.appendChild(li);
  });
}

// 渲染新闻
function renderNews(news) {
  const ul = document.querySelector(".news-list");
  news.forEach(n => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>[${n.date}]</strong> ${n.text}`;
    ul.appendChild(li);
  });
}

// 标签切换
document.addEventListener("DOMContentLoaded", () => {
  loadData("data/papers.json", renderPapers);
  loadData("data/projects.json", renderProjects);
  loadData("data/teaching.json", renderTeaching);
  loadData("data/awards.json", renderAwards);
  loadData("data/news.json", renderNews);

  const buttons = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".tab-content");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });
});
