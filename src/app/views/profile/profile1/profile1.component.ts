import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/localdataservice/localsession';
import { AuthService } from 'src/app/servces/auth.service';

@Component({
  selector: 'app-profile1',
  templateUrl: './profile1.component.html',
  styleUrls: ['./profile1.component.scss']
})
export class Profile1Component implements OnInit {
  
  constructor(private sessionService:SessionService,private authService:AuthService) { }
  user: any;
  ngOnInit() {
    this.authService.findUser(this.sessionService.UserId).subscribe(data=>{
      this.user = data;
    })
  }

}
