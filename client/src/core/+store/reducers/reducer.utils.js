export const reducerUtils = {
    handleAjaxErrors: (e) => {
        console.error(e);
        if (e.message) {
            console.error(e.message);
        }
    }
};
