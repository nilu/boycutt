import 'webextension-polyfill'

chrome.runtime.onInstalled.addListener(() => {
  console.log('Boycott extension installed')
})
