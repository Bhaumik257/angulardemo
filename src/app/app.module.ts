import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { AppComponent } from './app.component';

import { ViewsModule } from './views/views.module';
import { SharedModule } from './shared/shared.module';
import { ErrorModule } from './views/errors/error.module';

import { Map1Component } from './views/maps/map1/map1.component';
import { ModalsComponent } from './views/modals/modals.component';
import { BasicTableComponent } from './views/tables/basic-table/basic-table.component';
import { Profile1Component } from './views/profile/profile1/profile1.component';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';
import { Dashboard1Component } from './views/dashboards/dashboard1/dashboard1.component';

// main layout
import { NavigationModule } from './main-layout/navigation/navigation.module';
import { DataSharingService } from './servces/shareData';
import { HttpClientModule } from '@angular/common/http';
import { SessionService } from './localdataservice/localsession';
import { AuthGuardService } from './guard/auth-guard.service';
import { LoginComponent } from './views/login/login.component';
import { AuthService } from './servces/auth.service';
const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'mycart/cart1' },
  { path: 'dashboards', children:
    [
      { path: 'v1', component: Dashboard1Component },
    ]
  },
  { path: 'profiles',canActivate: [AuthGuardService], children:
    [
      { path: 'profile1', component: Profile1Component },
    ]
  },
  { path: 'mycart',canActivate: [AuthGuardService], children:
    [
      { path: 'cart1', component: BasicTableComponent },
    ]
  },
  { path: 'auth', children:
    [
      { path: 'login', component: LoginComponent },
    ]
  },
  { path: 'maps', children:
    [
      { path: 'map1', component: Map1Component},
    ]
  },

  { path: 'modals', component: ModalsComponent},
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    BrowserModule,
    BrowserAnimationsModule,
    NavigationModule,
    RouterModule.forRoot(routes),
    FormsModule,
    SharedModule,
    ViewsModule,
    ErrorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DataSharingService,SessionService,AuthGuardService,AuthService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
