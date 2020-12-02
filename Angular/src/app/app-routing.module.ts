import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//Rutas
import {LoginComponent} from './modules/auth/login/login.component';
import {HomeComponent} from './modules/pages/home/home.component'

// Guards
import {AuthGuard} from './core/guards/auth.guard';

const routes: Routes = [

  { path: '', component: LoginComponent},

  { path: 'admin/login', component: LoginComponent},

  //{ path: 'home', loadChildren:'./modules/pages/home.module#HomeModule'},sdfsdfsdf

  {
    path: 'home', loadChildren: () =>
      import('./modules/pages/home/home.module').then(m => m.HomeModule)
  },

  { path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
