import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { VentasComponent } from './pages/ventas/ventas.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

/* firebase */
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { IngresarClienteComponent } from './pages/ingresar-cliente/ingresar-cliente.component';
import { ConsultarClienteComponent } from './pages/consultar-cliente/consultar-cliente.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { InfoAdicionalComponent } from './components/info-adicional/info-adicional.component';
import { VerClienteComponent } from './pages/ver-cliente/ver-cliente.component';
import { DocumentacionComponent } from './components/documentacion/documentacion.component';
import { CartasComponent } from './components/cartas/cartas.component';
import { InterceptorsService } from './shared/services/interceptors.service';
import { PagosComponent } from './components/pagos/pagos.component';
import { HistorialCrediticioComponent } from './components/historial-crediticio/historial-crediticio.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FiltroClientesComponent } from './components/filtro-clientes/filtro-clientes.component';
import { CitasCliComponent } from './components/citas-cli/citas-cli.component';
import { VentasDiaComponent } from './components/ventas-dia/ventas-dia.component';
import { ProspectosComponent } from './components/prospectos/prospectos.component';
import { SupervisorComponent } from './pages/supervisor/supervisor.component';
import { CitasListaComponent } from './components/citas-lista/citas-lista.component';
import { Speech800Component } from './Utils/speech-llamada-radio/speech800.component';
import { SpeechsComponent } from './pages/speechs/speechs.component';
import { SpeechRapidosComponent } from './Utils/speech-rapidos/speech-rapidos.component';
import { SpeechTaxIdComponent } from './Utils/speech-tax-id/speech-tax-id.component';
import { SpeechAdcComponent } from './pages/speech-adc/speech-adc.component';
import { SpeechPrisioneroComponent } from './Utils/speech-prisionero/speech-prisionero.component';
import { AlertasComponent } from './components/alertas/alertas.component';
import { MonitorNotasComponent } from './components/monitor-notas/monitor-notas.component';

import { SanitizerSafe } from './shared/pipe/sanitizer.pipe';
import { EditorSpeechComponent } from './components/editor-notas/editor-notas.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { PlantillaFacturaComponent } from './Utils/plantilla-factura/plantilla-factura.component';
import { MonitorcitasComponent } from './components/monitorcitas/monitorcitas.component';
import { SafeTestPipe } from './shared/pipe/safe-test.pipe';
import { LlamadasModalComponent } from './components/llamadas-modal/llamadas-modal.component';
import { PagosSACComponent } from './pages/pagos-sac/pagos-sac.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { VentanaHistorialPagosComponent } from './components/ventana-historial-pagos/ventana-historial-pagos.component';
import { PopUpConfirmacionComponent } from './components/pop-up-confirmacion/pop-up-confirmacion.component';
import { InfoPerfilComponent } from './components/info-perfil/info-perfil.component';
import { CreditoSpeechIninicioComponent } from './Utils/credito-speech-ininicio/credito-speech-ininicio.component';
import { RanaReneComponent } from './Utils/rana-rene/rana-rene.component';
import { Speech800914Component } from './Utils/speech800914/speech800914.component';
import { SpeechLlamadaVentaComponent } from './Utils/speech-llamada-venta/speech-llamada-venta.component';
import { SpeechRecoverComponent } from './Utils/speech-recover/speech-recover.component';
import { ModTelPipe } from './shared/pipe/mod-tel.pipe';
import { SpeechEnviarBillComponent } from './Utils/speech-enviar-bill/speech-enviar-bill.component';
import { SpeechNoCartasComponent } from './Utils/speech-no-cartas/speech-no-cartas.component';
import { SpeechNoPagoComponent } from './Utils/speech-no-pago/speech-no-pago.component';
import { SpeechSiDiosQuiereComponent } from './Utils/speech-si-dios-quiere/speech-si-dios-quiere.component';
import { SpeechDoblePagoComponent } from './Utils/speech-doble-pago/speech-doble-pago.component';
import { InicioServicioComponent } from './Utils/inicio-servicio/inicio-servicio.component';
import { PlanPagoComponent } from './Utils/speech-plan-pago/plan-pago.component';
import { SpeechCobroComponent } from './Utils/speech-cobro/speech-cobro.component';
import { SpeechSieteProspectosComponent } from './Utils/speech-siete-prospectos/speech-siete-prospectos.component';
import { SemanalMenuComponent } from './Utils/semanal-menu/semanal-menu.component';
import { SpeechNoPagoAbogadoComponent } from './Utils/speech-no-pago-abogado/speech-no-pago-abogado.component';
import { SpeechComoCobrarComponent } from './Utils/speech-como-cobrar/speech-como-cobrar.component';
import { SpeechVerifiedDeleteComponent } from './Utils/speech-verified-delete/speech-verified-delete.component';
import { SpeechTrabajaAlguienMasComponent } from './Utils/speech-trabaja-alguien-mas/speech-trabaja-alguien-mas.component';
import { SpeechDocumentosClienteAyNComponent } from './Utils/speech-documentos-cliente-ay-n/speech-documentos-cliente-ay-n.component';
import { SpeechBorradoCuentasComponent } from './Utils/speech-borrado-cuentas/speech-borrado-cuentas.component';
import { SpeechAvancesPositivosComponent } from './Utils/speech-avances-positivos/speech-avances-positivos.component';
import { SpeechCalificoTarjetasComponent } from './Utils/speech-califico-tarjetas/speech-califico-tarjetas.component';
import { SpeechRescateComponent } from './Utils/speech-rescate/speech-rescate.component';
import { SpeechCreeQuePagaAcredorOriginalComponent } from './Utils/speech-cree-que-paga-acredor-original/speech-cree-que-paga-acredor-original.component';
import { SpeechCashappComponent } from './Utils/speech-cashapp/speech-cashapp.component';
import { SpeechFirmarcontratoComponent } from './Utils/speech-firmarcontrato/speech-firmarcontrato.component';
import { SpeechAccionesComponent } from './Utils/speech-acciones/speech-acciones.component';
import { SpeechDepositoComponent } from './Utils/speech-deposito/speech-deposito.component';
import { SpeechLeFaltanDocumentosComponent } from './Utils/speech-le-faltan-documentos/speech-le-faltan-documentos.component';
import { SpeechArronrentComponent } from './Utils/speech-arronrent/speech-arronrent.component';
import { SpeechPuedeSerReferidoComponent } from './Utils/speech-puede-ser-referido/speech-puede-ser-referido.component';
import { SpeechLlamadaSegTieneComponent } from './Utils/speech-llamada-seg-tiene/speech-llamada-seg-tiene.component';
import { SpeechTrackingComponent } from './Utils/speech-tracking/speech-tracking.component';
import { SpeechEvidenciaTrackingsComponent } from './Utils/speech-evidencia-trackings/speech-evidencia-trackings.component';
import { SpeechTercerServicioAlClienteComponent } from './Utils/speech-tercer-servicio-al-cliente/speech-tercer-servicio-al-cliente.component';
import { SpeechPrimerPagoComponent } from './Utils/speech-primer-pago/speech-primer-pago.component';
import { SpeechReferidoComponent } from './Utils/speech-referido/speech-referido.component';
import { SpeechPrePaidCcComponent } from './Utils/speech-pre-paid-cc/speech-pre-paid-cc.component';
import { SpeechDivisionCreditoComponent } from './Utils/speech-division-credito/speech-division-credito.component';
import { SpeechCuentaDisputadaComponent } from './Utils/speech-cuenta-disputada/speech-cuenta-disputada.component';
import { SpeechCrediKarmaComponent } from './Utils/speech-credi-karma/speech-credi-karma.component';
import { SpeechComprasComponent } from './Utils/speech-compras/speech-compras.component';
import { SpeechRevisarBuzonComponent } from './Utils/speech-revisar-buzon/speech-revisar-buzon.component';
import { SpeechRecibioDepositoComponent } from './Utils/speech-recibio-deposito/speech-recibio-deposito.component';
import { SpeechNoTengoCartasComponent } from './Utils/speech-no-tengo-cartas/speech-no-tengo-cartas.component';
import { SpeechNoHeHechoNadaComponent } from './Utils/speech-no-he-hecho-nada/speech-no-he-hecho-nada.component';
import { SpeechNoAceptoCancelacionComponent } from './Utils/speech-no-acepto-cancelacion/speech-no-acepto-cancelacion.component';
import { SpeechDevuelvoLaLlamadaComponent } from './Utils/speech-devuelvo-la-llamada/speech-devuelvo-la-llamada.component';
import { SpeechNiMeInteresaComponent } from './Utils/speech-ni-me-interesa/speech-ni-me-interesa.component';
import { SpeechCitaIncumplidaPorElClienteComponent } from './Utils/speech-cita-incumplida-por-el-cliente/speech-cita-incumplida-por-el-cliente.component';
import { SpeechFrasesDePoderComponent } from './Utils/speech-frases-de-poder/speech-frases-de-poder.component';
import { SpeechBancoMeAyudaComponent } from './Utils/speech-banco-me-ayuda/speech-banco-me-ayuda.component';
import { SpeechTengoReporteDeCreditoComponent } from './Utils/speech-tengo-reporte-de-credito/speech-tengo-reporte-de-credito.component';
import { SpeechTimesquareComponent } from './Utils/speech-timesquare/speech-timesquare.component';
import { SpeechYaArregleMiCreditoComponent } from './Utils/speech-ya-arregle-mi-credito/speech-ya-arregle-mi-credito.component';
import { SpeechTelefonoEquivocadoComponent } from './Utils/speech-telefono-equivocado/speech-telefono-equivocado.component';
import { SpeechMecanicoComponent } from './Utils/speech-mecanico/speech-mecanico.component';
import { SpeechZapateroComponent } from './Utils/speech-zapatero/speech-zapatero.component';
import { SpeechCristianoShakiraComponent } from './Utils/speech-cristiano-shakira/speech-cristiano-shakira.component';
import { SpeechLecturaReparacionCreditoComponent } from './Utils/speech-lectura-reparacion-credito/speech-lectura-reparacion-credito.component';
import { Speech50PuntosComponent } from './Utils/speech50-puntos/speech50-puntos.component';
import { SpeechAbogadoComponent } from './Utils/speech-abogado/speech-abogado.component';
import { SpeechMensajeComponent } from './Utils/speech-mensaje/speech-mensaje.component';
import { SpeechVerifiedComponent } from './Utils/speech-verified/speech-verified.component';
import { SpeechYoPuedoComponent } from './Utils/speech-yo-puedo/speech-yo-puedo.component';
import { SpeechRoboIdentidadComponent } from './Utils/speech-robo-identidad/speech-robo-identidad.component';
import { SpeechBancarrotaComponent } from './Utils/speech-bancarrota/speech-bancarrota.component';
import { SpeechCampanaComponent } from './Utils/speech-campana/speech-campana.component';
import { SpeechLecturaCreditoComponent } from './Utils/speech-lectura-credito/speech-lectura-credito.component';
import { CuadroComponent } from './Utils/cuadro/cuadro.component';
import { DeducirPipe } from './shared/pipe/deducir.pipe';
import { Hora24Pipe } from './shared/pipe/hora24.pipe';
import { SpeechBuenasNoticiasComponent } from './Utils/speech-buenas-noticias/speech-buenas-noticias.component';
import { SpeechRetornarLlamadaComponent } from './Utils/speech-retornar-llamada/speech-retornar-llamada.component';
import { SpeechCrearCashAppComponent } from './Utils/speech-crear-cash-app/speech-crear-cash-app.component';
import { NotasClienteComponent } from './components/notas-cliente/notas-cliente.component';
import { NotasClientelistaMinComponent } from './components/notas-clientelista-min/notas-clientelista-min.component';
import { environment } from 'src/environments/environment.prod';
import { SerAlCliNewPageComponent } from './pages/ser-al-cli-new-page/ser-al-cli-new-page.component';
import { LlamadasSacComponent } from './pages/llamadas-sac/llamadas-sac.component';
import { SecToMinPipe } from './shared/pipe/sec-to-min.pipe';
import { MonitoreoComponent } from './pages/monitoreo/monitoreo.component';
import { PagingPipe } from './shared/pipe/paging.pipe';
import { SearchCliPipe } from './shared/pipe/search-cli.pipe';
import { SearchCliIDPipe } from './shared/pipe/search-cli-id.pipe';
import { DiaSemanalPipe } from './shared/pipe/dia-semanal.pipe';
import { SearchDidPipe } from './shared/pipe/search-did.pipe';
import { SpeechCierreVentaComponent } from './Utils/speech-cierre-venta/speech-cierre-venta.component';
import { SearchAgentePipe } from './shared/pipe/search-agente.pipe';
import { MonitorSuperComponent } from './pages/monitor-super/monitor-super.component';
import { MonitorEstadoCallComponent } from './components/monitor-components_call/monitor-estado-call/monitor-estado-call.component';
import { MinLlamadasSacComponent } from './components/monitor-components_call/min-llamadas-sac/min-llamadas-sac.component';
import { ModalListaAgentesComponent } from './components/monitor-components_call/modal-lista-agentes/modal-lista-agentes.component';
import { MonitorAgentesComponent } from './components/monitor-components_call/monitor-agentes/monitor-agentes.component';
import { MonitorCitasComponent } from './components/monitor-components_call/monitor-citas/monitor-citas.component';
import { NavBarMonSuperComponent } from './components/monitor-components_call/nav-bar-mon-super/nav-bar-mon-super.component';
import { SuperMonitorCitasComponent } from './components/monitor-components_call/super-monitor-citas/super-monitor-citas.component';
import { SearchAgente2Pipe } from './shared/pipe/search-agente2.pipe';
import { CalendarioCitasComponent } from './components/Home/calendario-citas/calendario-citas.component';
import { ListaStatusComponent } from './components/Home/lista-status/lista-status.component';
import { ListaStatus1Pipe } from './shared/pipe/lista-status1.pipe';
import { ListaStatus2Pipe } from './shared/pipe/lista-status2.pipe';
import { ListaStatus3Pipe } from './shared/pipe/lista-status3.pipe';
import { StatusAgenteComponent } from './components/status-agente/status-agente.component';
import { SpeechJamasComponent } from './Utils/speech-jamas/speech-jamas.component';
import { SpeechGuionSACComponent } from './Utils/speech-guion-sac/speech-guion-sac.component';
import { SpeechMultaAtrazoComponent } from './Utils/speech-multa-atrazo/speech-multa-atrazo.component';
import { SpeechQuiereCancelarComponent } from './Utils/Objecciones/speech-quiere-cancelar/speech-quiere-cancelar.component';
import { CuadroObjecComponent } from './Utils/Objecciones/cuadro-objec/cuadro-objec.component';
import { SpeechTengoMas45DiasComponent } from './Utils/Objecciones/speech-tengo-mas45-dias/speech-tengo-mas45-dias.component';
import { SpeechCorteYelJuradoComponent } from './Utils/Objecciones/speech-corte-yel-jurado/speech-corte-yel-jurado.component';
import { SpeechNoHanHechoNadaComponent } from './Utils/Objecciones/speech-no-han-hecho-nada/speech-no-han-hecho-nada.component';
import { SpeechDijoEnviabanRapidoComponent } from './Utils/Objecciones/speech-dijo-enviaban-rapido/speech-dijo-enviaban-rapido.component';
import { SpeechNosotrosCumplimosComponent } from './Utils/Objecciones/speech-nosotros-cumplimos/speech-nosotros-cumplimos.component';
import { SpeechAmarilloComponent } from './Utils/speech-amarillo/speech-amarillo.component';
import { SpeechVerdeComponent } from './Utils/speech-verde/speech-verde.component';
import { SpeechDeudaHospitalComponent } from './Utils/speech-deuda-hospital/speech-deuda-hospital.component';
import { SpeechTieneNoTieneTiempoComponent } from './Utils/speech-tiene-no-tiene-tiempo/speech-tiene-no-tiene-tiempo.component';
import { SpeechLecturaReporteComponent } from './Utils/speech-lectura-reporte/speech-lectura-reporte.component';
import { PagosSacPipe } from './shared/pipe/pagos-sac.pipe';
import { HistorialLlamadasClienteComponent } from './components/historial-llamadas-cliente/historial-llamadas-cliente.component';
import { SuperMonitorAgentesComponent } from './components/monitor-components_call/super-monitor-agentes/super-monitor-agentes.component';
import { SuperCampanaComponent } from './components/monitor-components_call/super-campana/super-campana.component';
import { ConsultarCliPipe } from './shared/pipe/consultar-cli.pipe';
import { VentaCampanaAgenteComponent } from './components/venta-campana-agente/venta-campana-agente.component';
import { SplitPipe } from './shared/pipe/split.pipe';
import { CampanaLlamarComponent } from './pages/campana-llamar/campana-llamar.component';
import { ContestacionesComponent } from './components/contestaciones/contestaciones.component';
import { SpeechNoPuedoHablarComponent } from './Utils/speech-no-puedo-hablar/speech-no-puedo-hablar.component';
import { CitasRecicladasComponent } from './components/monitor-components_call/citas-recicladas/citas-recicladas.component';
import { CalendarioClienteComponent } from './components/calendario-cliente/calendario-cliente.component';
import { SuperCampaV2Component } from './components/monitor-components_call/super-campa-v2/super-campa-v2.component';
import { SpeechRoboIdentidadV2Component } from './Utils/speech-robo-identidad-v2/speech-robo-identidad-v2.component';
import { PagCitasPipe } from './shared/pipe/pag-citas.pipe';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { ListChatsWhtPipe } from './shared/pipe/list-chats-wht.pipe';
import { WhatsappClienteComponent } from './components/whatsapp-cliente/whatsapp-cliente.component';
import { SafeHtmlPipe } from './shared/pipe/safe-html.pipe';
import { SpeechCartaTransunionComponent } from './Utils/speech-carta-transunion/speech-carta-transunion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    VentasComponent,
    IngresarClienteComponent,
    ConsultarClienteComponent,
    DatosPersonalesComponent,
    InfoAdicionalComponent,
    VerClienteComponent,
    DocumentacionComponent,
    CartasComponent,
    PagosComponent,
    HistorialCrediticioComponent,
    SpinnerComponent,
    FiltroClientesComponent,
    CitasCliComponent,
    VentasDiaComponent,
    ProspectosComponent,
    SupervisorComponent,
    CitasListaComponent,
    Speech800Component,
    SpeechsComponent,
    SpeechRapidosComponent,
    SpeechTaxIdComponent,
    SpeechAdcComponent,
    SpeechPrisioneroComponent,
    AlertasComponent,
    MonitorNotasComponent,
    SanitizerSafe,
    EditorSpeechComponent,
    PlantillaFacturaComponent,
    MonitorcitasComponent,
    SafeTestPipe,
    LlamadasModalComponent,
    PagosSACComponent,
    PopUpComponent,
    VentanaHistorialPagosComponent,
    PopUpConfirmacionComponent,
    InfoPerfilComponent,
    CreditoSpeechIninicioComponent,
    RanaReneComponent,
    Speech800914Component,
    SpeechLlamadaVentaComponent,
    SpeechRecoverComponent,
    ModTelPipe,
    SpeechEnviarBillComponent,
    SpeechNoCartasComponent,
    SpeechNoPagoComponent,
    SpeechSiDiosQuiereComponent,
    SpeechDoblePagoComponent,
    InicioServicioComponent,
    PlanPagoComponent,
    SpeechCobroComponent,
    SpeechSieteProspectosComponent,
    SemanalMenuComponent,
    SpeechNoPagoAbogadoComponent,
    SpeechComoCobrarComponent,
    SpeechVerifiedDeleteComponent,
    SpeechTrabajaAlguienMasComponent,
    SpeechDocumentosClienteAyNComponent,
    SpeechBorradoCuentasComponent,
    SpeechAvancesPositivosComponent,
    SpeechCalificoTarjetasComponent,
    SpeechRescateComponent,
    SpeechCreeQuePagaAcredorOriginalComponent,
    SpeechCashappComponent,
    SpeechFirmarcontratoComponent,
    SpeechAccionesComponent,
    SpeechDepositoComponent,
    SpeechLeFaltanDocumentosComponent,
    SpeechArronrentComponent,
    SpeechPuedeSerReferidoComponent,
    SpeechLlamadaSegTieneComponent,
    SpeechTrackingComponent,
    SpeechEvidenciaTrackingsComponent,
    SpeechTercerServicioAlClienteComponent,
    SpeechPrimerPagoComponent,
    SpeechReferidoComponent,
    SpeechPrePaidCcComponent,
    SpeechDivisionCreditoComponent,
    SpeechCuentaDisputadaComponent,
    SpeechCrediKarmaComponent,
    SpeechComprasComponent,
    SpeechRevisarBuzonComponent,
    SpeechRecibioDepositoComponent,
    SpeechNoTengoCartasComponent,
    SpeechNoHeHechoNadaComponent,
    SpeechNoAceptoCancelacionComponent,
    SpeechDevuelvoLaLlamadaComponent,
    SpeechNiMeInteresaComponent,
    SpeechCitaIncumplidaPorElClienteComponent,
    SpeechFrasesDePoderComponent,
    SpeechBancoMeAyudaComponent,
    SpeechTengoReporteDeCreditoComponent,
    SpeechTimesquareComponent,
    SpeechYaArregleMiCreditoComponent,
    SpeechTelefonoEquivocadoComponent,
    SpeechMecanicoComponent,
    SpeechZapateroComponent,
    SpeechCristianoShakiraComponent,
    SpeechLecturaReparacionCreditoComponent,
    Speech50PuntosComponent,
    SpeechAbogadoComponent,
    SpeechMensajeComponent,
    SpeechVerifiedComponent,
    SpeechYoPuedoComponent,
    SpeechRoboIdentidadComponent,
    SpeechBancarrotaComponent,
    SpeechCampanaComponent,
    SpeechLecturaCreditoComponent,
    CuadroComponent,
    DeducirPipe,
    Hora24Pipe,
    SpeechBuenasNoticiasComponent,
    SpeechRetornarLlamadaComponent,
    SpeechCrearCashAppComponent,
    NotasClienteComponent,
    NotasClientelistaMinComponent,
    SerAlCliNewPageComponent,
    LlamadasSacComponent,
    SecToMinPipe,
    MonitoreoComponent,
    PagingPipe,
    SearchCliPipe,
    SearchCliIDPipe,
    DiaSemanalPipe,
    SearchDidPipe,
    SpeechCierreVentaComponent,
    MonitorEstadoCallComponent,
    MinLlamadasSacComponent,
    ModalListaAgentesComponent,
    MonitorAgentesComponent,
    MonitorCitasComponent,
    SearchAgentePipe,
    MonitorSuperComponent,
    NavBarMonSuperComponent,
    SuperMonitorCitasComponent,
    SearchAgente2Pipe,
    CalendarioCitasComponent,
    ListaStatusComponent,
    ListaStatus1Pipe,
    ListaStatus2Pipe,
    ListaStatus3Pipe,
    StatusAgenteComponent,
    SpeechJamasComponent,
    SpeechGuionSACComponent,
    SpeechMultaAtrazoComponent,
    SpeechQuiereCancelarComponent,
    CuadroObjecComponent,
    SpeechTengoMas45DiasComponent,
    SpeechCorteYelJuradoComponent,
    SpeechNoHanHechoNadaComponent,
    SpeechDijoEnviabanRapidoComponent,
    SpeechNosotrosCumplimosComponent,
    SpeechAmarilloComponent,
    SpeechVerdeComponent,
    SpeechDeudaHospitalComponent,
    SpeechTieneNoTieneTiempoComponent,
    SpeechLecturaReporteComponent,
    PagosSacPipe,
    HistorialLlamadasClienteComponent,
    SuperMonitorAgentesComponent,
    SuperCampanaComponent,
    ConsultarCliPipe,
    VentaCampanaAgenteComponent,
    SplitPipe,
    CampanaLlamarComponent,
    ContestacionesComponent,
    SpeechNoPuedoHablarComponent,
    CitasRecicladasComponent,
    CalendarioClienteComponent,
    SuperCampaV2Component,
    SpeechRoboIdentidadV2Component,
    PagCitasPipe,
    WhatsappComponent,
    ListChatsWhtPipe,
    WhatsappClienteComponent,
    SafeHtmlPipe,
    SpeechCartaTransunionComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    CKEditorModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorsService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
