const information = document.getElementById("info");
information.innerText = `Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`;

const stat = document.getElementById("stats");
setInterval(async () => {
  const stats = await window.renderStats.getStats();
  stat.innerText = `CPU usage: ${Math.floor(stats.cpu * 100)}%,
   Free memory: ${Math.floor(stats.mem)}%, 
   Total memory: ${Math.floor(stats.totalMem)} GB`;
}, 1000);
