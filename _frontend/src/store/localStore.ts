export const LocalStore = {
    getLocalStore: (key: string) => {
        try {
            const serializedState = localStorage.getItem(key);
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch (error) {
            return undefined;
        }
    },
    setLocalStore: (key: string, data: { [key: string]: any }) => {
        localStorage.setItem(key, JSON.stringify(data))
    }
}