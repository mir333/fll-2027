// Renders the page from progress.json — edit that file to update the site.
const $ = (id) => document.getElementById(id);
const pct = (done, total) => (total ? Math.round((done / total) * 100) : 0);
const fmtDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

function el(tag, props = {}, children = []) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

function render(data) {
  document.title = `${data.team} · FLL Progress`;
  $("team").textContent = data.team;
  $("season").textContent = data.season;
  $("updated").textContent = fmtDate(data.updated);

  let doneAll = 0, totalAll = 0;
  $("areas").replaceChildren(
    ...data.areas.map((area) => {
      const done = area.tasks.filter((t) => t.done).length;
      doneAll += done;
      totalAll += area.tasks.length;
      const p = pct(done, area.tasks.length);
      const fill = el("div", { className: "fill" });
      requestAnimationFrame(() => (fill.style.width = p + "%"));
      return el("article", { className: "card" }, [
        el("h3", {}, [area.name, el("span", { textContent: `${done}/${area.tasks.length}` })]),
        el("p", { textContent: area.description }),
        el("div", { className: "bar" }, [fill]),
        el("ul", {}, area.tasks.map((t) => el("li", { className: t.done ? "done" : "" }, [el("span", { textContent: t.title })]))),
      ]);
    })
  );

  const overall = pct(doneAll, totalAll);
  $("overall-pct").textContent = overall + "%";
  requestAnimationFrame(() => ($("overall-fill").style.width = overall + "%"));

  if (data.competitionDate) {
    const days = Math.ceil((new Date(data.competitionDate + "T00:00:00") - new Date()) / 86400000);
    $("countdown").textContent =
      days > 0 ? `${days} days until competition (${fmtDate(data.competitionDate)})` : days === 0 ? "Competition day! 🎉" : "";
  }

  $("log").replaceChildren(
    ...data.log.map((entry) =>
      el("li", {}, [el("time", { dateTime: entry.date, textContent: fmtDate(entry.date) }), entry.text])
    )
  );
}

fetch("/progress.json", { cache: "no-store" })
  .then((r) => r.json())
  .then(render)
  .catch((err) => {
    console.error(err);
    $("areas").textContent = "Could not load progress data.";
  });
