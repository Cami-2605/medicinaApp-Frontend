import { Routes } from '@angular/router';

// 🧍‍♂️ Login
import { LoginComponent } from './pages/banner-principal/login/login.component';

// 👩‍⚕️ Paciente
import { RegistroPacientesComponent } from './pages/administrador/registro-pacientes/registro-pacientes';
import { DashboardPacienteComponent } from './pages/paciente/dashboard-paciente/dashboard-paciente';
import { AgendarCitaComponent } from './pages/paciente/agendar-cita/agendar-cita';
import { MisCitasComponent } from './pages/paciente/mis-citas/mis-citas';
import { MisFormulasComponent } from './pages/paciente/mis-formulas/mis-formulas';
import { PerfilPacienteComponent } from './pages/paciente/perfil-paciente/perfil-paciente';

// 🩺 Médico
import { MedicoDashboardComponent } from './pages/medico/medico-dashboard/medico-dashboard';
import { CrearFormulaMedicaComponent } from './pages/medico/crear-formula-medica/crear-formula-medica';
import { AgendaComponent } from './pages/medico/agenda/agenda';
import { PacientesComponent } from './pages/medico/pacientes/pacientes';

// 🧑‍💼 Administrador
import { DashboardAdministradorComponent } from './pages/administrador/dashboard-administrador/dashboard-administrador';
import { RegistroMedicosComponent } from './pages/administrador/registro-medicos/registro-medicos';
import { AgregarEditarMedicamentoComponent } from './pages/administrador/agregar-editar-medicamento/agregar-editar-medicamento';
import { AgregarEditarEspecialidadComponent } from './pages/administrador/agregar-editar-especialidad/agregar-editar-especialidad';
import { AgregarAdministradorComponent } from './pages/administrador/agregar-administrador/agregar-administrador';

export const serverRoutes: Routes = [
  // Página principal
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // 🧍‍♂️ Login
  { path: 'login', component: LoginComponent },

  // 👩‍⚕️ Paciente
  { path: 'registro-pacientes', component: RegistroPacientesComponent },
  { path: 'dashboard-paciente', component: DashboardPacienteComponent },
  { path: 'agendar-cita', component: AgendarCitaComponent },
  { path: 'mis-citas', component: MisCitasComponent },
  { path: 'mis-formulas', component: MisFormulasComponent },
  { path: 'perfil-paciente', component: PerfilPacienteComponent },

  // 🩺 Médico
  { path: 'medico-dashboard', component: MedicoDashboardComponent },
  { path: 'crear-formula-medica', component: CrearFormulaMedicaComponent },
  { path: 'agenda', component: AgendaComponent },          // 👈 Nueva ruta: agenda del médico
  { path: 'pacientes', component: PacientesComponent },    // 👈 Nueva ruta: pacientes del médico

  // 🧑‍💼 Administrador
  { path: 'dashboard-administrador', component: DashboardAdministradorComponent },
  { path: 'agregar-administrador', component: AgregarAdministradorComponent },
  { path: 'registro-medicos', component: RegistroMedicosComponent },
  { path: 'agregar-editar-medicamento', component: AgregarEditarMedicamentoComponent },
  { path: 'agregar-editar-especialidad', component: AgregarEditarEspecialidadComponent },

  // Redirección por defecto
  { path: '**', redirectTo: '/login' },
];