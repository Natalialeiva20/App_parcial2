import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ClassesService } from 'src/app/utils/services/classes.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
  
})
export class ClasesPage implements OnInit {
  sectionId: number | null = null;
  profesorId!: number;
  groupedClasses: { [date: string]: any[] } = {};
  qrData: string | undefined = undefined;
  today!: string;
  openQrClassId: string | null = null;
  lastDate: string | null = null;
  nombreSeccion: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private classesService: ClassesService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.nombreSeccion = localStorage.getItem('nombre_seccion');
    this.profesorId = Number(localStorage.getItem('userId'));
    this.sectionId = Number(this.route.snapshot.paramMap.get('sectionId'));
    if (this.sectionId) {
      this.loadClasses();
    }
  }

  loadClasses() {
    this.classesService.getClassesBySection(this.sectionId!).subscribe(
      (classes) => {
        this.groupClassesByDate(classes);
      },
      (error) => {
        console.error('Error al cargar las clases', error);
      }
    );
  }

  groupClassesByDate(classes: any[]) {
    this.groupedClasses = classes.reduce((groups, classItem) => {
      const date = new Intl.DateTimeFormat('es-CL', {
        timeZone: 'America/Santiago',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(classItem.fecha_hora));

      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(classItem);
      return groups;
    }, {});

    const dates = Object.keys(this.groupedClasses);
    dates.sort();
    this.lastDate = dates[dates.length - 1];
  }

  getGroupedClassDates(): string[] {
    return Object.keys(this.groupedClasses);
  }

  formatTime(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Santiago',
    };
    return new Intl.DateTimeFormat('es-CL', options).format(new Date(dateString));
  }

  startClass() {
    if (this.sectionId !== null && this.nombreSeccion) {
      // Usa el nombre de la sección para generar automáticamente el nombre de la clase
      const nombreClass = this.nombreSeccion;

      this.classesService.startClass(this.profesorId, this.sectionId, nombreClass).subscribe(
        (response) => {
          console.log('Clase iniciada con éxito', response);
          this.loadClasses(); // Recarga las clases para mostrar la nueva clase en la lista
        },
        (error) => {
          console.error('Error al iniciar la clase', error);
        }
      );
    } else {
      console.error('No se pudo iniciar la clase. Faltan datos.');
    }
  }

  toggleQR(classId: string) {
    this.qrData = this.qrData === classId ? undefined : classId;
  }

  openQR(classId: string) {
    if (this.openQrClassId === classId) {
      this.openQrClassId = null;
      this.qrData = undefined;
    } else {
      this.openQrClassId = classId;
      this.qrData = classId;
    }
  }
}