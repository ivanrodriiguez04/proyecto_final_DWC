import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { loginGuard } from './guards/login/login.guard';
import { CuentasComponent } from './componentes/cuentas/cuentas.component';
import { AdministradorComponent } from './componentes/administrador/administrador.component';

export const routes: Routes = [
    {path:"login",component:LoginComponent},
    {path:"registro",component:RegistroComponent},
    { path: 'cuentas', component: CuentasComponent, canActivate: [loginGuard], data: { role: 'cuentas' } },
    { path: 'administrador', component: AdministradorComponent, canActivate: [loginGuard], data: { role: 'administrador' } },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
