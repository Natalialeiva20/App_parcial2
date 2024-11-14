import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userRole = localStorage.getItem('userRole');
  const router = inject (Router);

  // Define allowed routes based on role
  const allowedRoutesForProfesor = ['menu-profesor', 'menu-profesor/secciones', 'menu-profesor/secciones/:subjectId/clases'];
  const allowedRoutesForAlumno = ['menu-alumno', 'asistencias'];

  // Get the target route
  const targetRoute = route.routeConfig?.path;

  if (userRole === 'profesor' && allowedRoutesForProfesor.some(path => targetRoute?.startsWith(path))) {
    return true;
  } else if (userRole === 'estudiante' && allowedRoutesForAlumno.some(path => targetRoute?.startsWith(path))) {
    return true;
  } else {
    // Redirect unauthorized users
    return router.navigate(['/noauthorized']);
  }
};