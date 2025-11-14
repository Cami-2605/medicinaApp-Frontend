import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteCitaService } from '../../../core/services/paciente/paciente-cita.service';
import { ToastService } from '../../../components/toast/service/toast.service';
import { TokenService } from '../../../core/interceptors/token.service';
import { RegistrarCitaDto } from '../../../core/models/dto/cita/registro-cita.dto';
import { EspecialidadDto } from '../../../core/models/dto/especialidad/especialidad.dto';
import { MedicoDto } from '../../../core/models/dto/medico/medico.dto';
import { AgendaDto } from '../../../core/models/dto/agenda/agenda.dto';

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendar-cita.html',
  styleUrls: ['./agendar-cita.css'],
})
export class AgendarCitaComponent implements OnInit {
  fecha: string = '';
  hora: string = '';
  observaciones: string = '';

  especialidades: EspecialidadDto[] = [];
  medicos: MedicoDto[] = [];
  agendas: AgendaDto[] = [];

  selectedEspecialidadId: number | null = null;
  selectedMedicoId: number | null = null;
  selectedAgendaId: number | null = null;

  constructor(
    private citaService: PacienteCitaService,
    private toast: ToastService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades() {
    this.citaService.listarEspecialidades().subscribe({
      next: (res) => {
        this.especialidades = res.mensaje;
      },
      error: (err) => {
        console.error(err);
        this.toast.show('Error cargando especialidades', 'error');
      },
    });
  }

  onEspecialidadChange() {
    this.selectedMedicoId = null;
    this.selectedAgendaId = null;
    this.agendas = [];

    if (!this.selectedEspecialidadId) return;

    this.citaService.listarMedicosPorEspecialidad(this.selectedEspecialidadId).subscribe({
      next: (res) => {
        this.medicos = res.mensaje;
      },
      error: (err) => {
        console.error(err);
        this.toast.show('Error cargando médicos', 'error');
      },
    });
  }

  onMedicoChange() {
    this.selectedAgendaId = null;

    if (!this.selectedMedicoId) return;

    this.citaService.listarAgendaMedico(this.selectedMedicoId).subscribe({
      next: (res) => {
        // Solo agendas activas
        this.agendas = res.mensaje.filter((a) => a.isActivo);
      },
      error: (err) => {
        console.error(err);
        this.toast.show('Error cargando agendas', 'error');
      },
    });
  }

  confirmarCita() {
    const idPaciente = this.tokenService.getUserIdFromToken();

    if (!idPaciente || !this.selectedMedicoId || !this.selectedAgendaId) {
      this.toast.show('Por favor completa todos los campos obligatorios', 'error');
      return;
    }

    const dto: RegistrarCitaDto = {
      idPaciente: idPaciente,
      idMedico: this.selectedMedicoId,
      idAgenda: this.selectedAgendaId,
      observaciones: this.observaciones,
    };

    this.citaService.registrarCita(dto).subscribe({
      next: (res) => {
        this.toast.show(res.mensaje, 'success');
        // Limpiar selección
        this.fecha = '';
        this.hora = '';
        this.observaciones = '';
        this.selectedEspecialidadId = null;
        this.selectedMedicoId = null;
        this.selectedAgendaId = null;
        this.medicos = [];
        this.agendas = [];
      },
      error: (err) => {
        console.error(err);
        this.toast.show('Error registrando la cita', 'error');
      },
    });
  }
}
