import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TecnicoListComponent } from './component/tecnico/tecnico-list/tecnico-list.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent } ,
  {
    path:'', component: NavComponent, canActivate:[AuthGuard], children:[
      { path: 'home', component: HomeComponent },
      { path: 'tecnicos', component: TecnicoListComponent }
    ]

  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
