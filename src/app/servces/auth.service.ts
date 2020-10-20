import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SessionService } from '../localdataservice/localsession';
import{Users} from '../user/user'
@Injectable()
export class AuthService {
  users: any;
    constructor(public sessionService:SessionService) {
      this.users=Users;
    }
  // ...
  public isAuthenticated(): boolean {
    return this.sessionService.UserId != null;
  }

  public login(username:string,password:string):Observable<boolean>
  {
    
      let user = this.users.find((x:any)=> x.username === username && x.password === password);
      if(!user) return of(false);
      localStorage.setItem('userid',user.id);
      localStorage.setItem('username',user.firstName +' '+ user.lastName);
      localStorage.setItem('email',user.email);
      localStorage.setItem('role',user.role);
      return of(true);
  }
  public logout():Observable<null>
  {
    this.sessionService.ClearLocalSession();  
    return of(null)
  }
  public findUser(userid:any):Observable<any>{
    let user = this.users.find((x:any)=> x.id === userid);
    return of(user);
  }
  public initUserSessionfromGoogle(user:gapi.auth2.GoogleUser){
    localStorage.setItem('userid', user.getId());
    localStorage.setItem('username',user.getBasicProfile().getName());
    localStorage.setItem('role', 'admin');
    localStorage.setItem('profilepic', user.getBasicProfile().getImageUrl());
    localStorage.setItem('email', user.getBasicProfile().getEmail());
  }
  public initUserSessionfromAWS(user:any){
    localStorage.setItem('userid', user.sub);
    localStorage.setItem('username',user.email);
    localStorage.setItem('role', 'admin');
    localStorage.setItem('profilepic', user.picture != undefined ? user.picture : '');
    localStorage.setItem('email', user.email);
    localStorage.setItem('hasexternallogin','true');
  }
  
}