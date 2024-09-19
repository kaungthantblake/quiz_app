import { UserControlComponent } from './user-control/user-control.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { QuestionsComponent } from './questions/questions.component';
import { AuthGuard } from './auth.guard';
import { nonAdminAuthGuard } from './non-admin-auth.guard';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [nonAdminAuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signIn', component: SignInComponent },
  // { path: 'A', component:UserComponent},
  // { path: 'B', component:UserControlComponent},
  { path: 'questions/:quizId', component: QuestionsComponent, canActivate: [nonAdminAuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
