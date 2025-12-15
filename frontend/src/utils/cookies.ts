import Cookies from 'js-cookie'

export function setCookie(name: string, value: string, expiration_date: Date){
    Cookies.set(name, value, { expires: expiration_date })
}

export function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}