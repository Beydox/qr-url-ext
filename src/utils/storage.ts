export interface LocalStorage {
    lastCode?: string 
  }

export type LocalStorageKey = keyof LocalStorage

export function setStoredCode(lastCode: string): Promise<void> {
    const val: LocalStorage = {
      lastCode
    }

    return new Promise((resolve) => {
        chrome.storage.local.set(val, () => {
          resolve()
        })
    })
}

export function getStoredCode(): Promise<string> {
    const key: LocalStorageKey = 'lastCode'
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (res: LocalStorage) => {
        resolve(res.lastCode ?? '')
      })
    })
}