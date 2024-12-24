import { getStoredCode, setStoredCode } from '../utils/storage';


let contextMenuItem: chrome.contextMenus.CreateProperties  = { 

    id: 'qrExtensionId', 

    title: 'Generate QR-code for the link\'s url', 

    contexts: ['link'],

    }

    const copyToPopup = (content: chrome.contextMenus.OnClickData) => {
         setStoredCode(content.linkUrl)
    }

    chrome.contextMenus.removeAll(function() {
        chrome.contextMenus.create(contextMenuItem )
    })

    chrome.contextMenus.onClicked.addListener((info, tab) => {
        if (info.menuItemId === 'qrExtensionId') {
            copyToPopup(info); // Передаем URL ссылки
        }
    });