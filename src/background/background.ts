import { getStoredCode, setStoredCode } from '../utils/storage';


let contextMenuItem: chrome.contextMenus.CreateProperties  = { 

    id: 'qrExtensionId', 

    title: 'Generate QR-code for the link\'s url', 

    contexts: ['link'],

    }

    const copyToPopup = (content: chrome.contextMenus.OnClickData) => {
         setStoredCode(content.linkUrl)
         chrome.action.setBadgeBackgroundColor({ color: "green" });
         chrome.action.setBadgeText({ text: 'qr' });
    }

    chrome.contextMenus.removeAll(function() {
        chrome.contextMenus.create(contextMenuItem )
    })

    chrome.contextMenus.onClicked.addListener((info, tab) => {
        if (info.menuItemId === 'qrExtensionId') {
            copyToPopup(info); // Передаем URL ссылки
        }
    });

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (newValue === '') chrome.action.setBadgeText({ text: '' });
    }
});