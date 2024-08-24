export function encodeUrlParam(param: string): string {
    return encodeURIComponent(param).replace(/%20/g, '+');
  }
  
  export function decodeUrlParam(param: string): string {
    return decodeURIComponent(param.replace(/\+/g, ' '));
  }