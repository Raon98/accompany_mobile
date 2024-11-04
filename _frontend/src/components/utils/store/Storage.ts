export const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const saveItem = localStorage.getItem(key)
    if (saveItem != null) {
      setSelf(JSON.parse(saveItem))
    }

    onSet((newItem: any) => {
      localStorage.setItem(key, JSON.stringify(newItem))
    })
  }

export const sessionStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedItem = sessionStorage.getItem(key)
    if (savedItem != null) {
      setSelf(JSON.parse(savedItem))
    }

    onSet((newItem: any) => {
      sessionStorage.setItem(key, JSON.stringify(newItem))
    })
  }

export const clearSessionStorage = (key: string) => {
  sessionStorage.removeItem(key)
}
