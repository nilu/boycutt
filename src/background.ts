import 'webextension-polyfill'

const DEMO_LISTS_URL = 'https://boycott-demo-data.nilu.workers.dev/lists.json' // TODO: replace <your-subdomain>

async function fetchAndStoreLists() {
  try {
    const res = await fetch(DEMO_LISTS_URL)
    if (!res.ok) throw new Error('Failed to fetch lists.json')
    const lists = await res.json()
    await chrome.storage.local.set({ lists })
    console.log('Fetched and stored lists:', lists)
  } catch (err) {
    console.error('Error fetching lists.json:', err)
  }
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('Boycott extension installed')
  fetchAndStoreLists()
})
