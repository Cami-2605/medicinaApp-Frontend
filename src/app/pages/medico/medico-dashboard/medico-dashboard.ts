import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-medico-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './medico-dashboard.html',
  styleUrls: ['./medico-dashboard.css'],
})
export class MedicoDashboardComponent {
  // 🔹 Barra de navegación
  activeLink = 'agenda';

  constructor(private router: Router) {}

  // 🔹 Calendario
  mesActual = 'Noviembre 2025';
  diaSeleccionado: number = 11;

  calendario = [
    [null, null, null, null, null, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30],
  ];

  // 🔹 Filtros
  filtros = ['Todos', 'Pendientes', 'Completadas', 'Canceladas'];
  filtroActivo = 'Todos';

  // 🔹 Citas
  citas = [
    { paciente: 'Juan Pérez', hora: '9:00 AM - 9:30 AM', motivo: 'Chequeo general', color: 'yellow', estado: 'Pendientes' },
    { paciente: 'Ana Gómez', hora: '10:30 AM - 11:00 AM', motivo: 'Control postoperatorio', color: 'green', estado: 'Completadas' },
    { paciente: 'Carlos Ruiz', hora: '2:00 PM - 2:30 PM', motivo: 'Revisión de exámenes', color: 'orange', estado: 'Pendientes' },
  ];

  citasFiltradas = [...this.citas];

  // 🔹 Próximas citas
  proximasCitas = [
    { paciente: 'Sofía Vargas', fecha: '12 de Noviembre, 2025', hora: '11:00 AM', motivo: 'Consulta general' },
    { paciente: 'María García', fecha: '13 de Noviembre, 2025', hora: '8:30 AM', motivo: 'Chequeo de rutina' },
  ];

  // 🔹 Navegación
  setActive(link: string) {
    this.activeLink = link;
  }

  // 🔹 Ir a crear fórmula médica
  irAMisFormulas() {
    this.router.navigate(['/crear-formula-medica']);
  }

  // 🔹 Selección de día
  seleccionarDia(dia: number) {
    if (dia) {
      this.diaSeleccionado = dia;
    }
  }

  // 🔹 Filtros
  setFiltro(filtro: string) {
    this.filtroActivo = filtro;
    this.citasFiltradas =
      filtro === 'Todos'
        ? [...this.citas]
        : this.citas.filter(c => c.estado === filtro);
  }

  // 🔹 Volver al día actual
  goToToday(event: Event) {
    event.preventDefault();
    this.diaSeleccionado = 11;
    alert('Volviendo al día actual');
  }

  // 🔹 Detalles de cita
  verDetalles(cita: any) {
    alert(`Detalles de la cita con ${cita.paciente}:\nMotivo: ${cita.motivo}\nHora: ${cita.hora}`);
  }

  // 🔹 Cerrar sesión
  logout() {
    this.router.navigate(['/login']);
  }
}