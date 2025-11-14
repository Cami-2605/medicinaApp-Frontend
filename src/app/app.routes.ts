import { Routes } from '@angular/router';

// 👩‍⚕️ Paciente
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
import { RegistroPacientesComponent } from './pages/administrador/registro-pacientes/registro-pacientes';
import { RegistroMedicosComponent } from './pages/administrador/registro-medicos/registro-medicos';
import { AgregarEditarMedicamentoComponent } from './pages/administrador/agregar-editar-medicamento/agregar-editar-medicamento';
import { AgregarEditarEspecialidadComponent } from './pages/administrador/agregar-editar-especialidad/agregar-editar-especialidad';
import { AgregarAdministradorComponent } from './pages/administrador/agregar-administrador/agregar-administrador';

// Login
import { LoginComponent } from './pages/banner-principal/login/login.component';

// Guards
import { AuthGuard } from './core/interceptors/auth.guard';

export const routes: Routes = [
  // Página principal → login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Login (público)
  { path: 'login', component: LoginComponent },

  // 👩‍⚕️ Paciente
  {
    path: 'paciente',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardPacienteComponent },
      { path: 'agendar-cita', component: AgendarCitaComponent },
      { path: 'mis-citas', component: MisCitasComponent },
      { path: 'mis-formulas', component: MisFormulasComponent },
      { path: 'perfil', component: PerfilPacienteComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // 🩺 Médico
  {
    path: 'medico',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: MedicoDashboardComponent },
      { path: 'crear-formula', component: CrearFormulaMedicaComponent },
      { path: 'agenda', component: AgendaComponent },
      { path: 'pacientes', component: PacientesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // 🧑‍💼 Administrador
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardAdministradorComponent },
      { path: 'registro-pacientes', component: RegistroPacientesComponent },
      { path: 'registro-medicos', component: RegistroMedicosComponent },
      { path: 'agregar-medicamento', component: AgregarEditarMedicamentoComponent },
      { path: 'agregar-especialidad', component: AgregarEditarEspecialidadComponent },
      { path: 'agregar-administrador', component: AgregarAdministradorComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // Redirección por defecto
  { path: '**', redirectTo: '/login' },
];
