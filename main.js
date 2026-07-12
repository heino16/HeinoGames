const GAMES = [
  { name:'Rắn Săn Mồi', icon:'🐍', cat:'arcade', catLabel:'Arcade', color:'var(--brand)', href:'games/snake.html', popular:true },
  { name:'2048', icon:'🔢', cat:'tri-tue', catLabel:'Trí tuệ', color:'var(--sky)', href:'games/2048.html', popular:true },
  { name:'Cờ Caro', icon:'⭕', cat:'hai-nguoi', catLabel:'2 người chơi', color:'var(--pink)', href:'games/tictactoe.html', popular:true },
  { name:'Lật Thẻ Ghi Nhớ', icon:'🃏', cat:'thu-gian', catLabel:'Thư giãn', color:'var(--mint)', href:'games/memory.html', popular:true },
  { name:'Đập Chuột', icon:'🔨', cat:'arcade', catLabel:'Arcade', color:'var(--brand)', href:'games/whackamole.html', popular:true },
  { name:'Kéo Búa Bao', icon:'✌️', cat:'hai-nguoi', catLabel:'2 người chơi', color:'var(--pink)', href:'games/rps.html', popular:false },
  { name:'Test Phản Xạ', icon:'⚡', cat:'arcade', catLabel:'Arcade', color:'var(--brand)', href:'games/reflex.html', popular:false },
  { name:'Đố Vui Nhanh', icon:'❓', cat:'tri-tue', catLabel:'Trí tuệ', color:'var(--sky)', href:'games/quiz.html', popular:false },
];

function renderTile(game){
  return `
    <a class="tile" href="${game.href}" data-cat="${game.cat}" data-name="${game.name.toLowerCase()}">
      <div class="tile-thumb" style="background:${game.color}">
        <span class="tile-ribbon">${game.catLabel}</span>
        ${game.icon}
      </div>
      <div class="tile-name">${game.name}</div>
      <div class="tile-cat">${game.catLabel}</div>
    </a>`;
}

function renderStripCard(game){
  return `
    <a class="strip-card" href="${game.href}">
      <div class="strip-thumb" style="background:${game.color}">${game.icon}</div>
      <span>${game.name}</span>
    </a>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const tileGrid = document.getElementById('tileGrid');
  const popularStrip = document.getElementById('popularStrip');
  const resultCount = document.getElementById('resultCount');
  const searchInput = document.getElementById('searchInput');

  if(tileGrid){
    tileGrid.innerHTML = GAMES.map(renderTile).join('');
  }
  if(popularStrip){
    popularStrip.innerHTML = GAMES.filter(g => g.popular).map(renderStripCard).join('');
  }

  let activeFilter = 'all';

  function applyFilters(){
    if(!tileGrid) return;
    const query = (searchInput && searchInput.value || '').trim().toLowerCase();
    let visible = 0;
    tileGrid.querySelectorAll('.tile').forEach(tile => {
      const matchesCat = activeFilter === 'all' || tile.dataset.cat === activeFilter;
      const matchesQuery = !query || tile.dataset.name.includes(query);
      const show = matchesCat && matchesQuery;
      tile.style.display = show ? '' : 'none';
      if(show) visible++;
    });
    if(resultCount) resultCount.textContent = `${visible} game`;
  }

  function setActiveChip(filter){
    activeFilter = filter;
    document.querySelectorAll('.nav-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.filter === filter);
    });
    applyFilters();
  }

  document.querySelectorAll('.nav-chip').forEach(chip => {
    chip.addEventListener('click', () => setActiveChip(chip.dataset.filter));
  });

  document.querySelectorAll('[data-filter]:not(.nav-chip)').forEach(el => {
    el.addEventListener('click', (e) => {
      if(el.tagName === 'A'){ e.preventDefault(); }
      setActiveChip(el.dataset.filter);
      document.getElementById('tileGrid')?.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });

  if(searchInput){
    searchInput.addEventListener('input', applyFilters);
  }

  applyFilters();
});
