// Helper function to take a screenshot
async function takeScreenshot(page, path) {
    await page.screenshot({ path });
  }

module.exports = { login, takeScreenshot };
