document.getElementById('startBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, 'start');
  });
});

document.getElementById('stopBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, 'stop');
  });
});

document.getElementById('searchGoogleBtn').addEventListener('click', () => {
  const keyword = document.getElementById('keyword').value;
  const siteUrl = document.getElementById('siteUrl').value;
  const waitTime = document.getElementById('waitTime').value;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'searchGoogle',
      keyword: keyword,
      siteUrl: siteUrl,
      waitTime: waitTime
    });
  });
});
