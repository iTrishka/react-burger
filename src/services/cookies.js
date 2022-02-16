

export function setCookie(name, value, props) {
    props = props || {};
    let updatedCookie = name + '=' + value;
    document.cookie = updatedCookie;
  } 


  export function getCookie(name) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  } 