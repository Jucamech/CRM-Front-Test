import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ConsultarClienteComponent } from './pages/consultar-cliente/consultar-cliente.component';
import { IngresarClienteComponent } from './pages/ingresar-cliente/ingresar-cliente.component';
import { VerClienteComponent } from './pages/ver-cliente/ver-cliente.component';

import { AuthGuard } from './shared/guards/auth.guard';
import { SupervisorComponent } from './pages/supervisor/supervisor.component';
import { SpeechsComponent } from './pages/speechs/speechs.component';
import { SupervisorGuard } from './shared/guards/supervisor.guard';
import { ServicioGuard } from './shared/guards/servicio.guard';
import { VentasGuard } from './shared/guards/ventas.guard';
import { LlamadasModalComponent } from './components/llamadas-modal/llamadas-modal.component';
import { PagosSACComponent } from './pages/pagos-sac/pagos-sac.component';
import { CreditoSpeechIninicioComponent } from './Utils/credito-speech-ininicio/credito-speech-ininicio.component';
import { SerAlCliNewPageComponent } from './pages/ser-al-cli-new-page/ser-al-cli-new-page.component';
import { LlamadasSacComponent } from './pages/llamadas-sac/llamadas-sac.component';
import { MonitoreoComponent } from './pages/monitoreo/monitoreo.component';
import { MonitoreoGuard } from './shared/guards/monitoreo.guard';
import { MonitorSuperComponent } from './pages/monitor-super/monitor-super.component';
import { LlamadaNotaGuard } from './shared/guards/llamada-nota.guard';
import { PendienteNotaGuard } from './shared/guards/pendiente-nota.guard';
import { CampanaLlamarComponent } from './pages/campana-llamar/campana-llamar.component';
import { SpeechCartaTransunionComponent } from './Utils/speech-carta-transunion/speech-carta-transunion.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard, PendienteNotaGuard] },
  { path: 'ventas', component: VentasComponent, canActivate: [AuthGuard, VentasGuard, PendienteNotaGuard ] },
  { path: 'sac', component: SerAlCliNewPageComponent, canActivate: [AuthGuard, ServicioGuard, PendienteNotaGuard ] },
  { path: 'campanas', component: CampanaLlamarComponent, canActivate: [AuthGuard, ServicioGuard, PendienteNotaGuard ] },
  { path: 'speechs', component: SpeechsComponent, canActivate: [AuthGuard, PendienteNotaGuard ] },
  { path: 'pagosSAC', component: PagosSACComponent, canActivate: [AuthGuard, PendienteNotaGuard ] },
  { path: 'llamadasSAC', component: LlamadasSacComponent, canActivate: [AuthGuard, PendienteNotaGuard ] },
  { path: 'supervisor', component: SupervisorComponent, canActivate: [AuthGuard, SupervisorGuard] },
  { path: 'monitorSuperV', component: MonitorSuperComponent, canActivate: [AuthGuard, SupervisorGuard] },
  { path: 'monitorSAC', component: MonitoreoComponent, canActivate: [AuthGuard, MonitoreoGuard, PendienteNotaGuard ] },
  { path: 'ingresarcliente', component: IngresarClienteComponent, canActivate: [AuthGuard, ServicioGuard, PendienteNotaGuard ] },
  { path: 'consultarcliente', component: ConsultarClienteComponent, canActivate: [AuthGuard, ServicioGuard, PendienteNotaGuard ] },
  { path: 'speechsticket/:id', component: CreditoSpeechIninicioComponent, canActivate: [AuthGuard]},
  { path: 'vercliente/:id', component: VerClienteComponent, canActivate: [AuthGuard, ServicioGuard ] },
  { path: 'llamarcliente/:id', component: LlamadasModalComponent, canActivate: [ AuthGuard,], canDeactivate:[ LlamadaNotaGuard ] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
