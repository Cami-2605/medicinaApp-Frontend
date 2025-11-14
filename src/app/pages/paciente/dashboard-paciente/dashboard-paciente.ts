import { TokenService } from './../../../core/interceptors/token.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { forkJoin, map } from 'rxjs';

import { PacienteDto } from '../../../core/models/dto/paciente/paciente.dto';
import { CitaDto } from '../../../core/models/dto/cita/cita.dto';
import { FormulaDto } from '../../../core/models/dto/formula/formula.dto';

import { PacientePerfilService } from '../../../core/services/paciente/paciente-perfil.service';
import { PacienteCitaService } from '../../../core/services/paciente/paciente-cita.service';
import { PacienteFormulaService } from '../../../core/services/paciente/paciente-formula.service';
import { MedicoPerfilService } from '../../../core/services/medico/medico-perfil.service';
import { ToastService } from '../../../components/toast/service/toast.service';
import { LogoutService } from '../../../core/interceptors/logout.service';
import { EditarPacienteDto } from '../../../core/models/dto/paciente/editar-paciente.dto';

@Component({
  selector: 'app-dashboard-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard-paciente.html',
  styleUrls: ['./dashboard-paciente.css'],
})
export class DashboardPacienteComponent implements OnInit {
  paciente!: PacienteDto;
  citas: any[] = []; // completadas con info de médico y especialidad
  formulas: any[] = []; // completadas con info de médico y detalles

  vistaCitas: 'proximas' | 'pasadas' = 'proximas';

  perfil = {
    nombre: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    genero: '',
  };

  constructor(
    private router: Router,
    private perfilService: PacientePerfilService,
    private citaService: PacienteCitaService,
    private formulaService: PacienteFormulaService,
    private medicoService: MedicoPerfilService,
    private toast: ToastService,
    private tokenService: TokenService,
    private logoutService: LogoutService
  ) {}

  ngOnInit(): void {
    this.cargarDatosPaciente();
  }

  private cargarDatosPaciente() {
    const email = this.tokenService.getEmail();
    if (!email) {
      this.toast.show('No se encontró el correo del paciente', 'error');
      return;
    }

    this.perfilService.obtenerPacientePorEmail(email).subscribe({
      next: (res) => {
        this.paciente = res.mensaje;

        // Datos de perfil
        this.perfil.nombre = this.paciente.nombre;
        this.perfil.email = this.paciente.user.email;
        this.perfil.telefono = this.paciente.telefonos[0]?.numero || '';

        // 🔹 Traer todas las citas del paciente
        this.citaService.obtenerCitasPaciente(this.paciente.id).subscribe({
          next: (citas) => {
            forkJoin(
              citas
                .filter((cita) => cita.idMedico != null)
                .map((cita) =>
                  forkJoin([
                    // Obtener información del médico
                    this.medicoService
                      .obtenerMedicoPorId(cita.idMedico)
                      .pipe(map((resMedico) => resMedico.mensaje)),
                    // Obtener información de la agenda asociada a la cita
                    this.citaService
                      .obtenerAgendaPorId(cita.idAgenda)
                      .pipe(map((agenda) => agenda)),
                  ]).pipe(
                    map(([medico, agenda]) => ({
                      ...cita,
                      medicoNombre: medico.nombre,
                      especialidadNombre: medico.idEspecialidad,
                      fecha: agenda.dia, // fecha desde agenda
                      hora: agenda.horaInicio, // hora desde agenda
                    }))
                  )
                )
            ).subscribe({
              next: (citasCompletas) => {
                this.citas = citasCompletas;
              },
              error: (err) => {
                console.error(err);
                this.toast.show('Error completando la información de citas', 'error');
              },
            });
          },
          error: (err) => {
            console.error(err);
            this.toast.show('Error cargando las citas', 'error');
          },
        });

        // 🔹 Traer todas las fórmulas del paciente
        this.formulaService.obtenerFormulasPaciente(this.paciente.id).subscribe({
          next: (resFormulas) => {
            const formulas = resFormulas.mensaje;
            forkJoin(
              formulas
                .filter((formula) => formula.idCita != null)
                .map((formula) =>
                  forkJoin([
                    this.medicoService
                      .obtenerMedicoPorId(formula.idCita)
                      .pipe(map((medico) => medico.mensaje.nombre)),
                    this.formulaService
                      .obtenerDetallesFormula(formula.id)
                      .pipe(
                        map((detalles) => detalles.mensaje.map((d) => d.idMedicamento).join(', '))
                      ),
                  ]).pipe(
                    map(([medicoNombre, medicamentos]) => ({
                      ...formula,
                      medicoNombre,
                      medicamentos,
                    }))
                  )
                )
            ).subscribe((formulasCompletas) => {
              this.formulas = formulasCompletas;
            });
          },
          error: (err) => {
            console.error(err);
            this.toast.show('Error cargando fórmulas', 'error');
          },
        });
      },
      error: (err) => {
        console.error(err);
        this.toast.show('Error cargando datos del paciente', 'error');
      },
    });
  }

  // Ver detalles: ahora abre un panel con toda la info
  verDetalles(formula: FormulaDto, event: Event) {
    // Evitar que el enlace recargue o navegue fuera de la página
    event.preventDefault();

    this.formulaService.obtenerDetallesFormula(formula.id).subscribe({
      next: (res) => {
        // Generar texto con el nombre de cada medicamento y su información
        const detalles = res.mensaje
          .map((d) => `Medicamento: ${d.idMedicamento}\nCantidad: ${d.cantidad}\nDosis: ${d.dosis}`)
          .join('\n\n');

        // Mostrar los detalles en un alert (o podrías usar un modal en el futuro)
        alert(`Detalles de la fórmula:\n\n${detalles}`);
      },
      error: (err) => {
        console.error(err);
        this.toast.show('Error obteniendo detalles de la fórmula', 'error');
      },
    });
  }

  agendarCita() {
    this.router.navigate(['/paciente/agendar-cita']);
  }

  cancelarCita(cita: CitaDto, event: Event) {
    // Evitar que el enlace recargue la página
    event.preventDefault();

    if (confirm(`¿Deseas cancelar la cita con ID ${cita.id}?`)) {
      this.citaService.cancelarCita({ idCita: cita.id }).subscribe({
        next: (res) => {
          this.toast.show(res.mensaje, 'success'); // mostrar mensaje
          // Actualizar la lista de citas sin recargar la página
          this.citas = this.citas.map((c) =>
            c.id === cita.id ? { ...c, estadoCita: 'Cancelada' } : c
          );
        },
        error: (err) => {
          console.error(err);
          this.toast.show('Error cancelando cita', 'error');
        },
      });
    }
  }

  actualizarPerfil() {
    if (!this.paciente) {
      this.toast.show('No se pudo actualizar el perfil: paciente no cargado', 'error');
      return;
    }

    // Construir DTO para enviar al backend
    const dto: EditarPacienteDto = {
      id: this.paciente.id,
      nombre: this.perfil.nombre, // puedes cambiar si quieres que el usuario elija otra ciudad
    };

    // Llamar al servicio para actualizar perfil
    this.perfilService.editarPerfil(dto).subscribe({
      next: (res) => {
        this.toast.show(res.mensaje, 'success');
        // Actualizar la info local del perfil sin recargar la página
        this.paciente.nombre = this.perfil.nombre;
      },
      error: (err) => {
        console.error(err);
        this.toast.show('Error actualizando el perfil', 'error');
      },
    });
  }

  cambiarVista(vista: 'proximas' | 'pasadas') {
    this.vistaCitas = vista;
  }

  cerrarSesion() {
    this.logoutService.logout();
  }
}
