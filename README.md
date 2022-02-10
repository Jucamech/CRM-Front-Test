
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="readme.css">
</head>
<body>
  <h1 class="text-align-center">CRM CREDITOMEJOR.COM</h1>
  <div class="prol">
    <ul>
      <li>
        <a href="#instal">Instalación</a>
      </li>
      <li>
        <a href="#compo">Componentes</a>
      </li>
      <li>
        <a href="#pag">Páginas</a>
      </li>
      <li>
        <a href="#pipe">Pipes</a>
      </li>
      <li>
        <a href="#">Constantes</a>
      </li>
      <li>
        <a href="#">Guardias</a>
      </li>
      <li>
        <a href="#">Modelos</a>
      </li>
      <li>
        <a href="#">Services</a>
      </li>
      <li>
        <a href="#">Speechs</a>
      </li>
    </ul>
  </div>
  <div class="instala" id="instal">
    * Para la instalación se recomienda una vez descargado/clonado, NO hacerlo desde la rama <b>MAIN</b>, <br>
    la rama main quedo a con un mal merge. <br>
    Y por eso la instalación de dependencias va a fallar. :) <br>
    * SOLUCION: Hacer <# npm install > desde de la rama más actualizada.
  </div>

  <div class="compo" id="compo">
    <h3> CRM-Front/src/app/components/ </h3>
    <br> * En esta carpeta estan los componentes del proyecto, excepto los componentes q tienen q ver con los <b>Speech</b>
    <br> * Los componentes de los speech estan en <b>CRM-Front/src/app/Utils/</b>
    <br> * En componentes hay SubCarpetas
    <div class="car">
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">monitor-components_call</a>
        </li>
      </ul>
    </div>
      <ul>
        <li>
          <a href="#alertas">alertas</a>
        </li>
        <li>
          <a href="#">Cartas</a>
        </li>
        <li>
          <a href="#">cartas-cli</a>
        </li>
        <li>
          <a href="#">datos-personales</a>
        </li>
        <li>
          <a href="#">documentacion</a>
        </li>
        <li>
          <a href="#editor_txt">editor-notas</a>
        </li>
        <li>
          <a href="#">filtro-clientes</a>
        </li>
        <li>
          <a href="#">header</a>
        </li>
        <li>
          <a href="#">historial-crediticio</a>
        </li>
        <li>
          <a href="#">info-adicional</a>
        </li>
        <li>
          <a href="#">llamadas-modal</a>
        </li>
        <li>
          <a href="#">monitor-components_call</a>
        </li>
        <li>
          <a href="#">monitor-notas</a>
        </li>
        <li>
          <a href="#">monitorcitas</a>
        </li>
        <li>
          <a href="#">notas-cliente</a>
        </li>
        <li>
          <a href="#">pagos</a>
        </li>
        <li>
          <a href="#">pop-up-confirmacion</a>
        </li>
        <li>
          <a href="#">pop-up</a>
        </li>
        <li>
          <a href="#">prospectos</a>
        </li>
        <li>
          <a href="#">spinner</a>
        </li>
        <li>
          <a href="#">ventana-historial-pagos</a>
        </li>
        <li>
          <a href="#">ventas-dia</a>
        </li>
        <li>
          <a href="#">status-agente</a>
        </li>
      </ul>
  </div>

  <div class="pagin" id="pag">
    <h3>CRM-Front/src/app/pages/</h3>
    <br> * Estos son los componentes q tienen actualmente, o tuvieron rutas vinculas al mismo
    <ul>
      <li>
        <a href="#">consultar-cliente</a>
      </li>
      <li>
        <a href="#">home</a>
      </li>
      <li>
        <a href="#">ingresar-cliente</a>
      </li>
      <li>
        <a href="#">llamadas-sac</a>
      </li>
      <li>
        <a href="#">login</a>
      </li>
      <li>
        <a href="#">monitor-super</a>
      </li>
      <li>
        <a href="#">monitoreo</a>
      </li>
      <li>
        <a href="#pagos_sac">pagos-sac</a>
      </li>
      <li>
        <a href="#">ser-al-cli-new-page</a>
      </li>
      <li>
        <a href="#">speech-adc</a>
      </li>
      <li>
        <a href="#">speechs</a>
      </li>
      <li>
        <a href="#">supervisor</a>
      </li>
      <li>
        <a href="#">ventas</a>
      </li>
      <li>
        <a href="#">ver-cliente</a>
      </li>
    </ul>
  </div>
  <div class="pipe" id="pipe">
    <h3>CRM-Front/src/app/shared/pipe/</h3>
    <br> * Si no se sabe q es un pipe => <a href="https://desarrolloweb.com/articulos/crear-usar-pipes-angular" target="_blank" rel="noopener noreferrer">Click</a>.
    <br> * Todos los pipe estan creados con generadores.
    <br> * Para eliminar un pipe ,se debe eliminar en el modulo principal tambn.
    <ul>
      <li>
        <a href="#">deducir.pipe.ts</a>
      </li>
      <li>
        <a href="#">dia-semanal.pipe.ts</a>
      </li>
      <li>
        <a href="#">hora24.pipe.ts</a>
      </li>
      <li>
        <a href="#">lista-status1.pipe.ts</a>
      </li>
      <li>
        <a href="#">lista-status2.pipe.ts</a>
      </li>
      <li>
        <a href="#">lista-status3.pipe.ts</a>
      </li>
      <li>
        <a href="#">mod-tel.pipe.ts</a>
      </li>
      <li>
        <a href="#">paging.pipe.ts</a>
      </li>
      <li>
        <a href="#">safe-test.pipe.ts</a>
      </li>
      <li>
        <a href="#">sanitizer.pipe.ts</a>
      </li>
      <li>
        <a href="#">search-agente.pipe.tsl</a>
      </li>
      <li>
        <a href="#">search-agente2.pipe.ts</a>
      </li>
      <li>
        <a href="#">search-cli-id.pipe.ts</a>
      </li>
      <li>
        <a href="#">search-cli.pipe.ts</a>
      </li>
      <li>
        <a href="#">search-did.pipe.ts</a>
      </li>
      <li>
        <a href="#">sec-to-min.pipe.ts</a>
      </li>
    </ul>
  </div>
  <hr>
  <div class="editor" id="editor_txt">
    <h3>Editor Texto</h3>
    <br> * Componente para crear y enviar las notas.
    <br> * @Output() => Emite un evento al padre para cerrar la modal den se encuetra
    <br> * @Input() citaHome => recibe la cita a la q se asocian las notas
    <br> * @Input() did => recibe el did usado en la llamada, falla si se refresca la pagina
    <br> * @Input() dids => si no recibe un did, vuleve a ponen la lista para una seleccion manual
    <br> * @Input() cliente => Opcional / el nombre del cliente para ser mostrado en el html
    ### Componentes o Pages con este componente
    <ul>
      <ol>llamadas-modal</ol>
      <ol>notas-cliente</ol>
      <ol>supervisor-component</ol>
    </ul>
    ### Funciones Importantes
    <div class="func">
      <hr>
      ngAfterViewChecked()
      <br> * Este ciclo se es el q convierte la entrada de texto del editor en la entrada de datos
      <br> en el innerHTML del componente.
      <hr>
      buscarDidsUsados()
      <br> * Funcion q busca en los registros de la citas cuales son los dids usados para llamar
      <hr>
      sendNotas()⭐
      <br> * Funcion encargada de gestionar el envio de las notas y editar la citas basandose en el resultado
      <br> * Tiene dos ramificaciones principales q son cuando tiene un cita vinculada y cuando no la tiene
      <br> * Si tiene cita vinculada entra a validar en un Switch
      <hr>
      enviarNota()
      <br> * Envia la nota a la DB
      <br> * DEsbloque el guardian con respecto a la llamada
      <br> * Si hay q actualizar los datos o pagos crea otro bloqueo del guardian
      <br> * No se encarga del desbloque si hay q actualizar los datos o pagos del cliente
      <hr>
      ()()()()()
      <br> * El resto de funciones esta comentadas en el código
    </div>
  </div>
  <hr>
  <br>
  <br>
  <br>
  <br>
  <hr>
  <div id="pagos_sac">
    <h3>PAGOS SAC</h3>
    <br> * Componente tipo pag, Administra los pagos/cobros basandose en los propios pagos y cobros
    <br> * @ViewChild('cont_tabla1') content: ElementRef; => referencia a una tabla para controlar el scroll
    <br> * @ViewChild('cont_tabla1') content: ElementRef; => referencia a la segunda tabla para controlar el scroll
    <br> * @Input() set metodo(v: number) => funbcion tipo SET q escucha un evento desde el pop-up, para ocultar la segunda tabla
    <br>
    ### Componentes dentro de este Page
    <ul>
      <ol>pop-up</ol>
      <ol>ventana-historial-pagos</ol>
      <ol>spinner</ol>
    </ul>
    ### Funciones Importantes
    <div class="func">
      <hr>
      getHoyNuevo()⭐
      <br> * No requiere parametros
      <br> * Trae los cobros y pagos separados en un array [cobros, pagos]
      <br> * Actualiza los datos de las tablas
      <br> * Crea con esos los resumenes de cuenta
      <hr>
      getFechaNuevo()⭐
      <br> * Requiere parametros q son dos fechas "ver tipado de fechas!"
      <br> * Se usa dentro de la funcion  -filtrarFecha()
      <br> * Trae los cobros y pagos separados en un array [cobros, pagos]
      <br> * Actualiza los datos de las tablas
      <br> * Crea con esos los resumenes de cuenta
      <hr>
      filtrarFecha()⭐
      <br> * Requiere un parametro "V" q es un valor con con el se activa el switch
      <br> * Requiere un parametro "F" q es una parte de la fecha ese quiere optener
      <br> * Cada q se llama abre el menu lateral en los pagos
      <br> * El swtch es el pide los datos basandose en "V" y completanto las fechas con "f" si es necesario
      <hr>
      ()()()()()
      <br> * El resto de funciones esta comentadas en el código
    </div>

  </div>
  <hr>
  <br>
  <br>
  <br>
  <br>
  <hr>
  <div id="alertas">
    <h3>ALERTAS</h3>
    <br> * Componente encargado de administrar las alarmas de las citas
    <br> * No contiene HTML, ya se apoya en SweetAlert y Toast-Tr para mostar notificaciones
    <br> * Este componente se inyecta en la raiz de la app para tener las noticaciones disponibles en toda la app
    ### Funcionamiento General
    <br> Existen 3 tipos de citas q son :
    <br> 1 - Citas estandar q su pueden crear para cualquier momento y para cualquier agente
    <br> 2 - Citas de Stack q se apilan y es el mismo app q las distribuye a los agentes de cada Stack -citas-stack.service.ts
    <br> 3 - Citas/Llamadas Inmeditas totalmente agresivas si se da un click redirige al agente a esa llamada sin mas
    <br>
    <br> Citas estandar => Estas son administradas con shotAlert()⭐
    <br> Citas de Stack => Estas son administradas por su propio service debido a la complejidad de las misma
    <br> Citas/Llamadas Inmeditas => Estas son administradas con shotAlertaInmediata()⭐
    <hr>
    ### Funciones Importantes
    <div class="func">
      <hr>
      ()()()PREPARADORES DE ALERTAS()()()⭐
      <br> * Preparan el terreno para los disparadores de alertas
      <br> * Funciones q le inyectan informacion a la cita a nivel Front solamante
      <br> * Esa informacion son los tiempos de las alertas
      <hr>
      ()()()DISPARADORES DE ALERTAS()()()
      <br> * Funciones q lanzan las alertas
      <br> * Estas son el motor del componente
      <br> * Las alertas de la citas de Stack son tambn administradas por el citas-stack.service.ts
      <hr>
      buscarCitas()⭐
      <br> * Recibe las citas y las suministra a las demas funciones
      <br> * Principal objetivo es minimizar el codigo en el ngOnInit()
      <hr>
      shotAlertaInmediata()⭐
      <br> * Maneja las alarmas de la citas citas inmediatas
      <br> * si la cita no es recibida en 3 minutos cambia la cita y la devuelve al supervisor
      <hr>
      shotAlert()⭐
      <br> * Maneja las alarmas de la citas comunes
      <br> * Utiliza los tiempos de alarmas inyectados por las funciones PREPARADORES DE ALERTAS()()
      <br> para poder dispara las alarmas correspondientes a cada hora creada
      <br> * Permite la opcion de pedir reasignacion de la cita en caso de q el agente este ocupado
      <br> * Las alertas son meramente informativas, excepto la alarmaFinal
      <br> * La alarmaF son 5 min antes de la hora de la cita y redirige al agente a llamar al cliente
      <br> * Discrimina y elige el tipo de alerta y el sonido dependiendo que sea supervisor o no
      <hr>
      showToast()
      <br> * Funcion exclusiva de alertas para el supervisor
      <br> * Muestra las alertas de Citas al supervisor
      <br> * Estas se pueden apilar varias en el monitos del supervisor
      <br> * tambien permiten silenciar la alerta con un click
      <hr>
      ()()()()()
      <br> * El resto de funciones esta comentadas en el código
    </div>
  </div>

  </div>
  <div class="img">
    <img src="./src/assets/images/cm.png" >
  </div>
</body>
</html>
