import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';

export const routes: Routes = [
    {path:"login",component:LoginComponent},
    {path:"registro",component:RegistroComponent}
];
