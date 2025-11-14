import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';

import { MedicoPerfilService } from '../../../core/services/medico/medico-perfil.service';
import { MedicoCitaService } from '../../../core/services/medico/medico-cita.service';
import { PacienteCitaService } from '../../../core/services/paciente/paciente-cita.service';
import { TokenService } from '../../../core/interceptors/token.service';
import { LogoutService } from '../../../core/interceptors/logout.service';

import { MedicoDto } from '../../../core/models/dto/medico/medico.dto';
import { CitaDto } from '../../../core/models/dto/cita/cita.dto';
import { AgendaDto } from '../../../core/models/dto/agenda/agenda.dto';
import { EstadoCita } from '../../../core/models/enums/estado-cita.enum';

@Component({
  selector: 'app-medico-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './medico-dashboard.html',
  styleUrls: ['./medico-dashboard.css'],
})
export class MedicoDashboardComponent implements OnInit {
  activeLink = 'agenda';
  medico: MedicoDto | null = null;

  mesActual = 'Noviembre 2025';
  diaSeleccionado: number = new Date().getDate();

  calendario = [
    [null, null, null, null, null, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30],
  ];
  calendarioColor: { [key: number]: string } = {};

  citas: CitaDto[] = [];
  agendas: AgendaDto[] = [];
  citasDiaSeleccionado: { cita: CitaDto; agenda: AgendaDto }[] = [];

  constructor(
    private router: Router,
    private medicoPerfilService: MedicoPerfilService,
    private medicoCitaService: MedicoCitaService,
    private pacienteCService: PacienteCitaService,
    private tokenService: TokenService,
    private logoutService: LogoutService
  ) {}

  ngOnInit() {
    const email = this.tokenService.getEmail();
    if (email) {
      this.medicoPerfilService.obtenerMedicoPorEmail(email).subscribe((resp) => {
        if (resp && resp.mensaje) {
          this.medico = resp.mensaje;
          this.obtenerCitasYAgendas(this.medico.id);
        }
      });
    }
  }

  obtenerCitasYAgendas(idMedico: number) {
    this.medicoCitaService.obtenerCitasMedico(idMedico).subscribe((resp) => {
      if (resp && resp.mensaje) {
        this.citas = resp.mensaje;

        const agendas$ = this.citas.map((cita) =>
          this.pacienteCService.obtenerAgendaPorId(cita.idAgenda)
        );

        forkJoin(agendas$).subscribe((agendasResp) => {
          this.agendas = agendasResp;
          this.marcarCalendario(agendasResp);
          this.seleccionarDia(this.diaSeleccionado);
        });
      }
    });
  }

  marcarCalendario(agendas: AgendaDto[]) {
    agendas.forEach((a) => {
      const dia = new Date(a.dia).getDate();
      if (dia != null) this.calendarioColor[dia] = '#007bff';
    });
  }

  seleccionarDia(dia: number) {
    if (!dia) return;
    this.diaSeleccionado = dia;

    const citasAgendadas = this.citas.filter((c) => c.estadoCita === EstadoCita.AGENDADA);
    this.citasDiaSeleccionado = citasAgendadas
      .map((cita) => {
        const agenda = this.agendas.find((a) => a.id === cita.idAgenda);
        if (!agenda) return null;
        const fechaCita = new Date(agenda.dia).getDate();
        return fechaCita === dia ? { cita, agenda } : null;
      })
      .filter((item) => item !== null) as { cita: CitaDto; agenda: AgendaDto }[];
  }

  goToToday(event: Event) {
    event.preventDefault();
    this.seleccionarDia(new Date().getDate());
  }

  verDetalles(cita: CitaDto) {
    alert(
      `Detalles de la cita:\nID: ${cita.id}\nObservaciones: ${cita.observaciones || 'Ninguna'}`
    );
  }

  logout() {
    this.logoutService.logout();
  }
}
