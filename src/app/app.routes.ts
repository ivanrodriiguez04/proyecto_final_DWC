import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { loginGuard } from './guards/login/login.guard';
import { CuentasComponent } from './componentes/cuentas/cuentas.component';
import { AdministradorComponent } from './componentes/administrador/administrador.component';
import { usuarioGuard } from './guards/usuario/usuario.guard';
import { HomeComponent } from './componentes/home/home.component';
import { RecuperarPasswordComponent } from './componentes/recuperar-password/recuperar-password.component';
import { CambiarPasswordComponent } from './componentes/cambiar-password/cambiar-password.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:"login",component:LoginComponent},
    {path:"registro",component:RegistroComponent},
    { path: 'cuentas', component: CuentasComponent, canActivate: [usuarioGuard]},
    { path: 'administrador', component: AdministradorComponent, canActivate: [loginGuard]},
    { path: 'recuperar-password', component: RecuperarPasswordComponent },
    { path: 'cambiar-password', component: CambiarPasswordComponent },
    { path: '**', redirectTo: '' }
];
