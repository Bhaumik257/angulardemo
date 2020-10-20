import { Injectable } from '@angular/core';


@Injectable()
export class SessionService  {


 
    get UserId(){
        if (localStorage.getItem('userid') != null && localStorage.getItem('userid') != '' && localStorage.getItem('userid') != undefined) {
            return localStorage.getItem('userid');
        }
        return null;
    }
    
 
    get UserName() {
        if (localStorage.getItem('username') != null && localStorage.getItem('username') != '' && localStorage.getItem('username') != undefined) {
            return localStorage.getItem('username');
        }
        return null;
    }

    get Role() {
        if (localStorage.getItem('role') != null && localStorage.getItem('role') != '' && localStorage.getItem('role') != undefined) {
            return localStorage.getItem('role');
        }
        return null;
    }
    get ProfilePic() {
        if (localStorage.getItem('profilepic') != null && localStorage.getItem('profilepic') != '' && localStorage.getItem('profilepic') != undefined) {
            return localStorage.getItem('profilepic');
        }
        return null;
    }
    get Email() {
        if (localStorage.getItem('email') != null && localStorage.getItem('email') != '' && localStorage.getItem('email') != undefined) {
            return localStorage.getItem('email');
        }
        return null;
    }
    get HasExternalLogin() {
        if (localStorage.getItem('hasexternallogin') != null && localStorage.getItem('hasexternallogin') != '' && localStorage.getItem('hasexternallogin') != undefined) {
            return (localStorage.getItem('hasexternallogin') === 'true');
        }
        return false;
    }
    ClearLocalSession()
    {
        localStorage.clear();
    }
}