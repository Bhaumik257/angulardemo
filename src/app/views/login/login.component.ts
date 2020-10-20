import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/servces/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-modals',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;loading = false;submitted = false;returnUrl: string;error :boolean=false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        public authService:AuthService,
        private route: ActivatedRoute
    ) {
      this.route.fragment.subscribe(fragment => {
        var idToken = this.decodeToken(new URLSearchParams(fragment).get('id_token'));
        var accessToken = this.decodeToken(new URLSearchParams(fragment).get('access_token'));
        if(idToken != null && idToken != undefined && idToken != "" && accessToken != null && accessToken != undefined && accessToken != "") {
          this.authService.initUserSessionfromAWS(idToken);
          
          this.router.navigate(['mycart/cart1']);
        }
      });
     }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.login(this.f.username.value, this.f.password.value).subscribe(data => {
            if(data)
                this.router.navigate(['mycart/cart1']);
            else{
                this.error = true;
                this.loading = false;
            }
         });
    }
    //------------Jwt decoder ---------------------
  decodeToken(token: any): any {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken
    }
    //-----------------AWS Login ------------------
    awsOAuth2Authentication() {
      window.location.href = 'https://demoappangular.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=5tpfa75o3bpk9rra8bgb4jpci3&&redirect_uri=http://localhost:4200/auth/login';
    }
    //----------------- Google Authentication  code-------------------
    gapiSetup: boolean = false;
    authInstance: gapi.auth2.GoogleAuth;
    user: gapi.auth2.GoogleUser;
    
    async initGoogleAuth(): Promise<void> {
        const pload = new Promise((resolve) => {
          gapi.load('auth2', resolve);
        });
        return pload.then(async () => {
          await gapi.auth2
            .init({ client_id: '247186602510-oi1n95e6u5nopqgm3rlcv8dgf6huknbg.apps.googleusercontent.com' })
            .then(auth => {
              this.gapiSetup = true;
              this.authInstance = auth;
            });
        });
      }
      async authenticate(): Promise<gapi.auth2.GoogleUser> {
        
        if (!this.gapiSetup) await this.initGoogleAuth();
    
        return new Promise(async () => {
          await this.authInstance.signIn().then(
            user => {
                  this.user = user;
                  this.authService.initUserSessionfromGoogle(this.user);
                  this.router.navigate(['mycart/cart1']);
            },
            error => this.error = error);
        });
      }
      async checkIfUserAuthenticated(): Promise<boolean> {
        if (!this.gapiSetup) {
          await this.initGoogleAuth();
        }
        return this.authInstance.isSignedIn.get();
      }

}
