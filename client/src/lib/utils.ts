export const setCookie = (name: string, value: string, days: number) => {
    let expires

    if (days) {
        let date = new Date()
        date.setTime(date.getTime() + (days*24*60*60*1000))
        expires = "; expires=" + date.toUTCString()
    }

    document.cookie = name + "=" + (value || "")  + expires + "; path=/"
}

export const getCookie = (cookieName: string) => {
    const cookies = document.cookie.split(';');
    const searchedCookie = cookies.find(name => name.indexOf(cookieName) > -1);

    if(searchedCookie && searchedCookie !== '') {
        let returnedCookie = searchedCookie.split('=')[1];
        return returnedCookie.trim();
    }
    else return false;
}

export const deleteCookie = (name: string) => {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}