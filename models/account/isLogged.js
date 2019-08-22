
export const isLogged = (db, state, body)  => new Promise((res, rej) => {
    try {
        state.currentAccount? res(true): res(false)
    } catch(e) { 
        rej(e)
    }
});
