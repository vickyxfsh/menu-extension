'use strict';

chrome.alarms.onAlarm.addListener(() => {
  chrome.action.setBadgeText({ text: '' });
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'stay_hydrated.png',
    title: 'Time to Hydrate',
    message: "Everyday I'm Guzzlin'!",
    buttons: [{ title: 'Keep it Flowing.' }],
    priority: 0
  });
});

chrome.notifications.onButtonClicked.addListener(async () => {
  const item = await chrome.storage.sync.get(['minutes']);
  chrome.action.setBadgeText({ text: '' });
  chrome.alarms.create({ delayInMinutes: item.minutes });
});

// Listen for "Time's Up" message from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'notifyTimeUp') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'stay_hydrated.png',
      title: "Time's Up!",
      message: 'Your timer has ended.',
      priority: 2
    });
  }
});
