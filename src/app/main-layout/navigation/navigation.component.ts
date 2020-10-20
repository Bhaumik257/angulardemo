import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/localdataservice/localsession';
import { AuthService } from 'src/app/servces/auth.service';
import { DataSharingService } from 'src/app/servces/shareData';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: ElementRef;

  clicked: boolean;

  constructor(public dataSharingService:DataSharingService,public authService:AuthService,private router: Router,public sessionService:SessionService) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {

  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }
  logout() {
    if(this.sessionService.HasExternalLogin){
      this.authService.logout().subscribe();
      window.location.href = window.location.href = 'https://demoappangular.auth.us-east-2.amazoncognito.com/logout?response_type=token&client_id=5tpfa75o3bpk9rra8bgb4jpci3&&logout_uri=http://localhost:4200/auth/login';
    }
    else {
      this.authService.logout().subscribe();
      this.router.navigate(['auth/login']);
    }
    
  }
}
