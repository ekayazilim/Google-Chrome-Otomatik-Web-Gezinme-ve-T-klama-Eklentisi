let shouldStop = false;
let currentIndex = 0;

function performActions(menuItems) {
  if (shouldStop || currentIndex >= menuItems.length) return;

  let item = menuItems[currentIndex];
  item.click(); // Menü öğesine tıkla

  setTimeout(() => {
    window.scrollBy(0, window.innerHeight); // Aşağı in
    setTimeout(() => {
      window.scrollBy(0, -window.innerHeight); // Yukarı çık

      currentIndex++;
      performActions(menuItems); // Bir sonraki menüye geç
    }, 3000); // 3 saniye bekle ve yukarı çık
  }, 5000); // 5 saniye bekle
}

function startActions() {
  shouldStop = false;
  currentIndex = 0;
  let menuItems = document.querySelectorAll('nav a'); // Menü bağlantılarını seç
  performActions(menuItems);
}

function stopActions() {
  shouldStop = true;
}

function searchAndClickOnGoogle(keyword, siteUrl, waitTime) {
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}`;

  window.location.href = searchUrl;

  const checkLinksInterval = setInterval(() => {
    let links = document.querySelectorAll('a');

    for (let link of links) {
      if (link.href && link.href.includes(siteUrl)) {
        clearInterval(checkLinksInterval);
        console.log('Hedef site bulundu, yeniden yönlendiriliyor...');

        // Hedef siteye yeniden yönlendir
        window.location.href = link.href;

        setTimeout(() => {
          console.log(`Sitede ${waitTime} saniye bekleniyor...`);
        }, waitTime * 1000);
        return;
      }
    }

    // Hedef site bulunamadıysa, bir sonraki sayfaya geç
    const nextPageButton = document.querySelector('#pnnext');
    if (nextPageButton) {
      nextPageButton.click();
    } else {
      clearInterval(checkLinksInterval); // Daha fazla sayfa yoksa durdur
      console.log('Hedef site bulunamadı.');
    }
  }, 2000); // Her 2 saniyede bir kontrol et
}


chrome.runtime.onMessage.addListener((message) => {
  if (message === 'start') {
    startActions();
  } else if (message === 'stop') {
    stopActions();
  } else if (message.action === 'searchGoogle') {
    searchAndClickOnGoogle(message.keyword, message.siteUrl, message.waitTime);
  }
});
