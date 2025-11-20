import Cookies from 'js-cookie'

export function setCookie(name: string, value: string, expiration_date: Date){
    Cookies.set(name, value, expiration_date)
}