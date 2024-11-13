import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './utils/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'menu-alumno',
    loadChildren: () => import('./pages/menu-alumno/menu-alumno.module').then(m => m.MenuAlumnoPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'menu-profesor',
    loadChildren: () => import('./pages/menu-profesor/menu-profesor.module').then(m => m.MenuProfesorPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'menu-profesor/secciones/:subjectId',
    loadChildren: () => import('./pages/secciones/secciones.module').then(m => m.SeccionesPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'menu-profesor/secciones/:subjectId/clases/:sectionId',
    loadChildren: () => import('./pages/clases/clases.module').then(m => m.ClasesPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'asistencias/:sectionId',
    loadChildren: () => import('./pages/asistencias/asistencias.module').then(m => m.AsistenciasPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordPageModule)
  },
  {
    path: 'noauthorized',
    loadChildren: () => import('./pages/noauthorized/noauthorized.module').then( m => m.NoauthorizedPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
