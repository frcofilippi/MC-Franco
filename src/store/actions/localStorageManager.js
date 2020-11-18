const ID_TOKEN = 'ID_TOKEN';
const USER_ID = 'USER_ID';
const TOKEN_EXP_DATE = 'TOKEN_EXP_DATE'


export const writeLocalStorage = (token, uid, expDate) => {
    localStorage.setItem(ID_TOKEN, token);
    localStorage.setItem(USER_ID, uid);
    localStorage.setItem(TOKEN_EXP_DATE, expDate)
}

export const readLocalStorage = () => {
    const token = localStorage.getItem(ID_TOKEN)
    const uid = localStorage.getItem(USER_ID);
    const exp = new Date(+localStorage.getItem(TOKEN_EXP_DATE));
    const user = {
        idToken: token,
        uid:uid ,
        expDate: exp
    }
    return user;
}

export const clearLocalStorage = () => {
    try {
        localStorage.removeItem(ID_TOKEN);
        localStorage.removeItem(USER_ID);
        localStorage.removeItem(TOKEN_EXP_DATE);
    } catch (error) {
        console.error(error);
    }

}