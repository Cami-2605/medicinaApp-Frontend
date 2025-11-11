import { Routes } from '@angular/router';

// 🧍‍♂️ Login
import { LoginComponent } from './pages/banner-principal/login/login.component';

// 👩‍⚕️ Paciente
import { RegistroPacientesComponent } from './pages/administrador/registro-pacientes/registro-pacientes';
import { DashboardPacienteComponent } from './pages/paciente/dashboard-paciente/dashboard-paciente';
import { AgendarCitaComponent } from './pages/paciente/agendar-cita/agendar-cita';

// 🩺 Médico
import { MedicoDashboardComponent } from './pages/medico/medico-dashboard/medico-dashboard';
import { CrearFormulaMedicaComponent } from './pages/medico/crear-formula-medica/crear-formula-medica';

// 🧑‍💼 Administrador
import { DashboardAdministradorComponent } from './pages/administrador/dashboard-administrador/dashboard-administrador';
import { RegistroMedicosComponent } from './pages/administrador/registro-medicos/registro-medicos';
import { AgregarEditarMedicamentoComponent } from './pages/administrador/agregar-editar-medicamento/agregar-editar-medicamento';
import { AgregarEditarEspecialidadComponent } from './pages/administrador/agregar-editar-especialidad/agregar-editar-especialidad';

export const routes: Routes = [
  // Página principal
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Login
  { path: 'login', component: LoginComponent },

  // 👩‍⚕️ Paciente
  { path: 'registro-pacientes', component: RegistroPacientesComponent },
  { path: 'dashboard-paciente', component: DashboardPacienteComponent },
  { path: 'agendar-cita', component: AgendarCitaComponent },

  // 🩺 Médico
  { path: 'medico-dashboard', component: MedicoDashboardComponent },
  { path: 'crear-formula-medica', component: CrearFormulaMedicaComponent },

  // 🧑‍💼 Administrador
  { path: 'dashboard-administrador', component: DashboardAdministradorComponent },
  { path: 'registro-medicos', component: RegistroMedicosComponent },
  { path: 'agregar-editar-medicamento', component: AgregarEditarMedicamentoComponent },
  { path: 'agregar-editar-especialidad', component: AgregarEditarEspecialidadComponent },

  // Redirección por defecto
  { path: '**', redirectTo: '/login' },
];