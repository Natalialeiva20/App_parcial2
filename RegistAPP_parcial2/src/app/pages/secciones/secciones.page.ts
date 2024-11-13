import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendancesService } from 'src/app/utils/services/attendances.service';
import { SectionsService } from 'src/app/utils/services/sections.service';

// Interfaz para definir la estructura de una sección
interface Section {
  section_id: number;
  nombre_seccion: string;
  nombre_asignatura: string;
  
}


@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.page.html',
  styleUrls: ['./secciones.page.scss'],
})
export class SeccionesPage implements OnInit {
  sections: Section[] = [];          // Todas las secciones recibidas
  filteredSections: Section[] = [];   // Secciones después de aplicar el filtro
  subjectId: string | null = null;
  userId: number | null = null;
 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private attendancesService: AttendancesService
  ) {}

  ngOnInit() {
    this.subjectId = this.route.snapshot.paramMap.get('subjectId'); // Obtener subjectId como string directamente
    this.userId = Number(localStorage.getItem('userId'));

    console.log(`Subject ID: ${this.subjectId}, User ID: ${this.userId}`);

    if (this.userId) {
      this.loadUserSections();
    } else {
      console.error('userId no está definido.');
    }
  }

  loadUserSections() {
    this.attendancesService.getStudentSections(this.userId!).subscribe(
      (data: Section[]) => {
        console.log('Received data from service:', data);

        // Almacenar todas las secciones recibidas
        this.sections = data;

       
      },
      error => {
        console.error('Error al cargar las secciones', error);
      }
    );
  }

  

  goToClases(sectionId: number, sectionName:string) { 
    
    localStorage.setItem('nombre_seccion', sectionName)
    this.router.navigate([`/menu-profesor/secciones`, this.subjectId, 'clases', sectionId]);
  }
}