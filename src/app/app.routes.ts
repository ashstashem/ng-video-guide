import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'details', component: DetailsComponent, canActivate: [AuthGuard],
    children: [
        {
            path: ':id',
            component: DetailsComponent,
            canActivateChild: [AuthGuard]
        }
    ]
  },
  { path: '**', component: LoginComponent },
];
