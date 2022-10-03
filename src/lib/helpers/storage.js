const AsyncStorage = {
    setItem: async (key, value, fn = null) => {
        try {
            if (typeof fn !== "function") {
                fn = () => {};
            }
            return await localStorage.setItem(key, value);
        } catch (error) {
            console.log({"`Storage Util Error \n Set Item`": error});
        }
    },

    getItem: async (key, fn = null) => {
        try {
            return await localStorage.getItem(key);
        } catch (error) {
            console.log({"`Storage Util Error \n Get Item`": error});
        }
    },

    removeItem: async (key, fn = null) => {
        try {
            return await localStorage.removeItem(key);
        } catch (error) {
            console.log({"`Storage Util Error \n Remove Item`": error});
        }
    },

    clear: () => {
        try {
            return localStorage.clear();
        } catch (error) {
            console.log({"`Storage Util Error \n Remove Item`": error});
        }
    }
};

export {AsyncStorage};
