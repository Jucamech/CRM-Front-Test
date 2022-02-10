import { HttpClient} from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UsuarioModel, ClientModel, RespUser, ClienteModelGen } from '../models/usuario.model';
import { environment } from '../../../environments/environment';
import { DataNotas, DataPachCampaV2, DataPostCampaV2, DataPostHistorial, DataStatusAgent, FechasLlamadas, FechasPagos,
  FechasPost, FechasPostParam, MsgWhatsapp, ResCampañaV2, RespCalling } from '../models/otros.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ///////////////////////////////////////////////////////////////////////////
  ////////////// ↓↓↓ TODAS LAS PETICIONES DE HTTP ESTA AQUI ↓↓↓ /////////////
  ///////////////////////////////////////////////////////////////////////////

  url = environment.URLendP;

  /**
   * Emite toda  la respuesta de llamada
   */
  extLlamada$ = new EventEmitter<RespCalling | null>();

  /**
   * Emite el Data del cliente
   */
  dataClienteE$ = new EventEmitter<Partial<ClientModel> | null>();

  /**
   * Emite el Data de los usuarios
   */
  dataUsersE$ = new EventEmitter< RespUser[] | null>();

  /**
   * Emite el id Del Cliente xx/
   */
  idClienteE$ = new EventEmitter< number | null>();

  /**
   * Emite si se esta llamando a alguien;
   */
  llamadaSaliente$ = new EventEmitter< boolean >();

  userResp: RespUser;
  TipoPet: number;
  userLogin: boolean;
  token: string;
  clienteServ: ClientModel;
  idC: string = '';

/*   header_node = {
    Accept: 'application/json',
    rejectUnauthorized: 'false',
    requestCert: 'false',
    insecure: 'true'
  } */

  constructor(private http: HttpClient) { }

  login(usuario: UsuarioModel) {
    const authdata = {
      user: usuario.user,
      password: usuario.password
    };
/*     const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8') */
    return this.http.post(`${this.url}/auth`, authdata/* , {
      headers: this.header_node
    } */);
  }


  guardarLogin(token: string): void {
    this.token = token;
    localStorage.setItem('token', String(this.token));
    this.userLogin = true;
  }

  leerLogin(): boolean {
    if (localStorage.getItem('token') !== null) {
      this.token = localStorage.getItem('token');
      return true;
    } else {
      return false;
    }
  }
  /**
   * Retorno los un Json con los Dids
   */
  getJsonDid(url:string){
    return this.http.get(url);
  }

  ///////////////////////////////////////////////////////////

  putCliente(cliente: any) {
    return this.http.post(`${this.url}/clients/`, cliente);
  }

  pacthCliente(cliente: Partial<ClientModel> | ClienteModelGen, id: string) {
    return this.http.patch(`${this.url}/clients/${id || cliente.id}`, cliente);
  }

  getClientes() {
    return this.http.get(`${this.url}/clients/`);
  }

  getCliente(id: string) {
    return this.http.get(`${this.url}/clients/${id}`);
  }

  getIdCliente(tel: string){
    return this.http.get(`${this.url}/clientid/${tel}`);
  }

  ///////         /////////users////////          ////////

  getUsers() {
    return this.http.get(`${this.url}/users/`);
  }
  postUser(data) {
    return this.http.post(`${this.url}/users/`, data);
  }
  getUser(id:string) {
    return this.http.get(`${this.url}/users/${id}`);
  }
  delUser(id:string) {
    return this.http.delete(`${this.url}/users/${id}`);
  }
  patchUser(id:string, data) {
    return this.http.patch(`${this.url}/users/${id}`, data);
  }

  ///////         /////////pagos////////          ////////

  postPago(id: string, formPago) {
    return this.http.post(`${this.url}/pagos/${id}`, formPago);
  }

  getPagos() {
    return this.http.get(`${this.url}/pagos/`);//ok
  }

  getPago(id: string) {
    return this.http.get(`${this.url}/pagos/${id}`);// ok
  }

  getPagosFechas(data: FechasPagos) {
    return this.http.post(`${this.url}/pagos/`, data);
  }

  patchPago(id: string, formPago) {
    return this.http.patch(`${this.url}/pagos/${id}`, formPago)
  }


  ///////         ///////// cobros ////////          ////////

  getCobroCli(id: string) {
    return this.http.get(`${this.url}/cobros/${id}`);
  }

  getCobroS() {
    return this.http.get(`${this.url}/cobros/`);
  }

  getCobrosFechas(data: FechasPagos) {
    return this.http.post(`${this.url}/cobros/`, data);
  }

  eliminarCobro(id: string) {
    return this.http.delete(`${this.url}/cobros/${id}`);
  }

  ///////         /////////documentos////////          ////////
  getDocument(id: string) {
    return this.http.get(`${this.url}/documents/${id}`);
  }

  postDocumentos(id, formDocum) {
    return this.http.post(`${this.url}/documents/${id}`, formDocum);
  }

  editDocumentos(id, formDocum) {
    return this.http.patch(`${this.url}/documents/${id}`, formDocum);
  }

  delDocument(id: string){
    return this.http.delete(`${this.url}/documents/${id}`);
  }
  ///////         ///////// historial cred ///////          ////////
  getHistorCredi(id: string) {
    return this.http.get(`${this.url}/creditreport/${id}`);
  }

  postHistorCredi(id: string, formCartas) {
    return this.http.post(`${this.url}/creditreport/${id}`, formCartas);
  }

  pacthHistorCredi(id:string, data){
    return this.http.patch(`${this.url}/creditreport/${id}`,data);
  }

  delHistorCred(id: string) {
    return this.http.delete(`${this.url}/creditreport/${id}`);
  }
  ///////         /////////cartas////////          ////////
  getCartas(id: string) {
    return this.http.get(`${this.url}/letter/${id}`);
  }
  delCartas(id: string) {
    return this.http.delete(`${this.url}/letter/${id}`);
  }

  postCartas(id: string, formCartas) {
    return this.http.post(`${this.url}/letter/${id}`, formCartas);
  }

  patchCarta(id: string, data){
    return this.http.patch(`${this.url}/letter/${id}`, data)
  }
  ///////         ///////// citas ////////          ////////

  getCitas() {
    return this.http.get(`${this.url}/dates`);
  }
  getCitasUser(id: string) {
    return this.http.get(`${this.url}/dates/${id}`);
  }
  postCita(id: string, formCita) {
    return this.http.post(`${this.url}/dates/${id}`, formCita);
  }

  putCita(id: string, formCita) {
    if (formCita['nombres']) {
      delete formCita['nombres'];
    }
    if (formCita['apellidos']) {
      delete formCita['apellidos'];
    }

    return this.http.patch(`${this.url}/dates/${id}`, formCita);
  }


  /* fgdfgdfhgdfg */
  fechasfetch(data: FechasPagos){
    return this.http.post(`${this.url}/datesfetch/`, data);
  }

  ///////         ///////// llamadas ////////          ////////

  getLlamadas() {
    return this.http.get(`${this.url}/calling`);
  }

  ///////         ///////// llamadas ////////          ////////
  getUserPhones() {
    return this.http.get(`${this.url}/phones`);
  }
  ///////         ///////// llamadas ////////          ////////
  getUDids() {
    return this.http.get(`${this.url}/dids`);
  }
  getCall(data) {
    return this.http.post(`${this.url}/call`, data);
  }

  //////////////////////////////////////////////////////////////////////////////

  cambiarPass(obj) {
    return this.http.post(`${this.url}/passwd`, obj);
  }
  //////////////////////////////////////////////////////////////////////////////



  /* --------------------------------notas--------------------------------------------- */
  postNotas( id: string, nota: DataNotas ){
    return this.http.post(`${this.url}/notes/${id}`, nota);
  }

  getNotas(){
    return this.http.get(`${this.url}/notes`);
  }

  getNotasCliente( id:string ){
    return this.http.get(`${this.url}/notes/${id}`);
  }
  editNotasCliente( id:string, data ){
    return this.http.patch(`${this.url}/notes/${id}`, data);
  }

  getNotasFechas( fechas:FechasPost ){
    return this.http.post(`${this.url}/notes`, fechas);
  }

  deleteNotas(id: string){
    return this.http.delete(`${this.url}/notes/${id}`);
  }

  /////////////////////////////// llamadas perdidas ///////////////////////////////////////////////

  getLlamadasCDR( fechas:FechasLlamadas ){
    return this.http.post(`${this.url}/cdr`, fechas);
  }

  getHistClientCDR( id: string ){
    return this.http.get(`${this.url}/cdr/${id}`);
  }

  /////////////////////////////// contestaciones //////////////////////////////////

  getContestaciones(id: string){
    return this.http.get(`${this.url}/contest/${id}`);
  }

  postContestaciones(id: string, data){
    return this.http.post(`${this.url}/contest/${id}`, data);
  }

  patchContestaciones(id_doc: string, data){
    return this.http.patch(`${this.url}/contest/${id_doc}`, data);
  }

  delContestaciones(id: string){
    return this.http.delete(`${this.url}/contest/${id}`);
  }

  /////////////////////////////// stalker //////////////////////////////////

  postStalker(data: DataStatusAgent){
    return this.http.post(`${this.url}/stalker`, data);
  }

  patchStalker(id: string, data: DataStatusAgent){
    return this.http.patch(`${this.url}/stalker/${id}`, data);
  }

  getStalker(key: string){
    return this.http.get(`${this.url}/stalker${key}`);
  }

  getPostStalker(id: string, data: FechasPostParam){
    return this.http.post(`${this.url}/stalker/${id}`, data);
  }

  //////////////////////// base64 ///////////////////////////
  post64(data){
    return this.http.post(`${this.url}/archivos`, data);
  }

  get64(id: string){
    return this.http.get(`${this.url}/archivos/${id}`);
  }

  del64(id: string){
    return this.http.delete(`${this.url}/archivos/${id}`);
  }

  //////////////////////// Campañas v2 ///////////////////////////

  getCampagnas(){
    return this.http.get(`${this.url}/campagnas/`);
  }

  delCampagnas(id: string){
    return this.http.get(`${this.url}/campagnas/${id}`);
  }

  postCampagnas(data: ResCampañaV2){
    return this.http.post(`${this.url}/campagnas`, data);
  }

  patchCampagnas(id: string,data: ResCampañaV2){
    return this.http.patch(`${this.url}/campagnas/${id}`, data);
  }
  /*~~~~~~~~~~~~~~~~~~~ data campañas ~~~~~~~~~~~~~~~~~~~*/

  getDataCampagnas(id_camp: string){
    return this.http.get(`${this.url}/data_campagnas/${id_camp}`);
  }

  postDataCampagnas(data:DataPostCampaV2){
    return this.http.post(`${this.url}/data_campagnas`, data);
  }

  patchDataCampagnas(id: string, data:DataPachCampaV2){
    return this.http.patch(`${this.url}/data_campagnas/${id}`, data);
  }
  ////////////////////////////// HISTORIAL CLIENTE //////////////////////////////

  getDataCalendario(id: string){
    return this.http.get(`${this.url}/historial_cliente/${id}`);
  }

  postGetDataCalendario(id: string, data: FechasPost){
    return this.http.post(`${this.url}/historial_cliente/${id}`, data);
  }

  postDataCalendario(data: DataPostHistorial){
    return this.http.post(`${this.url}/historial_cliente/`, data);
  }

  //////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////// WHATSAPP //////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////



  ////////////////////////////////// WHATSAPP CLIENTE //////////////////////////////////

  /**
   * Trae el chat del cliente
   */
  getChatsWhatsapp(id: string){
    return this.http.get(`${this.url}/whatsapp_client/${id}`);
  }

  /**
   * Envio de mensajes y archivos para chat con clientes
   */
  postMsgfileWhatsapp(id: string, data){
    return this.http.post(`${this.url}/whatsapp_client/${id}`, data);
  }

  ////////////////////////////////// WHATSAPP TELEFONO /////////////////////////////////

  /**
   * Trae todas las conversaciones del chat
   */
  getAllChatsWhatsapp(){
    return this.http.get(`${this.url}/whatsapp/`);
  }

  /**
   * Trae el chat del cliente para el interface telefono
   */
  getWhatsappChatId(id: string){
    return this.http.get(`${this.url}/whatsapp/${id}`);
  }

  /**
   * Solo usar para el reporte de citas
   */
  postMsgWhatsapp( data ){
    return this.http.post(`${this.url}/whatsapp/`, data);
  }
  /**
   * Solo usar para chat general
   */
  postMsgWhatsapp2(id: string, data ){
    return this.http.post(`${this.url}/whatsapp/${id}`, data);
  }

  ////////////////////////////// ↑↑↑ WHATSAPP TELEFONO ↑↑↑ /////////////////////////////
















}

