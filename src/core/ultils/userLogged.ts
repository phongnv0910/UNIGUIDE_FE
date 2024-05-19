export class UserLogged {
    private readonly TOKENKEY: string = 'token';

    constructor() {
        this.TOKENKEY = 'token';
    }
    getToken(): string {
        return this.getCookie(this.TOKENKEY);
      }
      setCurrentUser(
        token: string,
      ): void {
        debugger
        this.setCookie(this.TOKENKEY, token);
      }
      saveToken(token: string) {
        this.setCookie(this.TOKENKEY, token);
      }
    
      isLogged(): boolean {
        let token = this.getCookie(this.TOKENKEY);
        if (token === '' || token === null) return false;
        else return true;
      }
      logout(): void {
        this.deleteCookie(this.TOKENKEY);
      }
      private deleteCookie(key: any): void {
        document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
      private setCookie(key: string, value: string): void {
        document.cookie = key + '=' + value + ';path=/';
      }
      private getCookie(cname: any): string {
        let name = cname + '=';
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return '';
      }
}