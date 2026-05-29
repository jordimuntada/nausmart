const { Resend } = require('resend');
const resend = new Resend('re_gCJNLExH_NYtaBxyA28Ug29L1m5hGJsQN');

const FROM = 'Jordi de RealBrave <hello@realbrave.eu>';

const leads = [
  // ═══════════════════════════════════════════════════
  // ALTA URGENCIA (18)
  // ═══════════════════════════════════════════════════

  {
    name: 'Mitek Systems',
    to: 'info@miteksystems.com',
    subject: 'Crecer en Terrassa: oficina para vuestro hub de I+D',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Habéis pasado de 40 a casi 200 empleados desde 2017 y habéis consolidado vuestro centro global de I+D en Sant Cugat. Sabemos lo que cuesta encontrar espacio de calidad en el Vallès cuando un equipo crece tan rápido.</p><p>Estamos desarrollando un edificio de oficinas en Terrassa, a 10 minutos de Sant Cugat, con 1.440 m² en 3 plantas. Ofrecemos desde 160 m² (12-18 personas) hasta plantas completas de 480 m² (40-60 personas), desde 7 €/m². Apertura prevista para abril de 2026.</p><p>Si necesitáis una segunda sede o espacio adicional para seguir creciendo, podemos adaptar el espacio a vuestras necesidades.</p><p>¿Os parece si lo hablamos?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Factorial',
    to: 'hello@factorialhr.com',
    subject: '8.000 m² en 22@... ¿y una segunda sede en el Vallès?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>8.000 m² en Illacuna y 40 contrataciones semanales. Factorial ya no es una startup, sois un gigante del HR Tech. Con ese ritmo de crecimiento, probablemente necesitaréis contemplar opciones adicionales fuera del 22@.</p><p>Nosotros estamos desarrollando un edificio de oficinas en Terrassa: 1.440 m², 3 plantas, desde 7 €/m². Espacios modulares de 160, 240 y 480 m², con apertura en abril de 2026. A 30 minutos de vuestra sede actual, con parking y fibra óptica de alta velocidad.</p><p>Una segunda sede en el Vallès os daría flexibilidad para seguir escalando sin los precios del 22@.</p><p>¿Os interesa conocer la propuesta?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Revolut',
    to: 'press@revolut.com',
    subject: '¿Barcelona se os queda pequeña? Mirad Terrassa',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Habéis alquilado 2.590 m² en Diagonal 444 y planeáis 300 contrataciones en Barcelona para 2028. Vuestra apuesta por España es clara, y eso requiere espacio.</p><p>Si en algún momento necesitáis una segunda sede o un hub en el Vallès Occidental —más económico y bien conectado— tenemos un edificio en Terrassa que encaja. 1.440 m² repartidos en 3 plantas, desde 160 m² hasta la planta completa. Precios desde 7 €/m², con parking y a 30 minutos de vuestra oficina actual.</p><p>Abrimos en abril de 2026. ¿Os parece interesante?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'deepdots',
    to: 'hello@deepdots.com',
    subject: '¿Buscando oficina en Barcelona? Mirad Terrassa',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Acabáis de levantar 5,5 millones de euros y vuestro objetivo es abrir oficina en Barcelona. Enhorabuena por la ronda.</p><p>Para una startup en crecimiento como la vuestra, os recomiendo echar un vistazo a Terrassa antes de firmar un alquiler caro en Barcelona. Tenemos un edificio con espacios flexibles desde 160 m², desde 7 €/m². A 30 minutos del centro de Barcelona, con fibra y parking.</p><p>Podéis empezar con 160 m² e ir ampliando a medida que crece el equipo. Sin compromisos a largo plazo que os aten.</p><p>¿Queréis que os lo enseñe?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Veeva Systems',
    to: 'info@veeva.com',
    subject: 'Hub europeo en 22@ + una segunda opción en Terrassa',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Habéis alquilado 2.166 m² + terraza en el 22@ para vuestro hub europeo, con entrega prevista para primavera de 2026. Coincide con nuestra apertura.</p><p>Os propongo algo: mientras montáis vuestro hub principal, podríais considerar un espacio adicional en el Vallès Occidental. Nuestro edificio en Terrassa tiene 1.440 m² en 3 plantas, desde 7 €/m². Ideal para equipos de I+D o centros de excelencia que no necesiten estar en el centro de Barcelona.</p><p>Abrimos también en 2026. ¿Os parece que lo conozcamos?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Biorce',
    to: 'hello@biorce.com',
    subject: 'De 200 m² a 2.000 m²... ¿y si necesitáis más?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>¡Enhorabuena por la Serie A de 44 millones! Pasar de un coworking de 200 m² a 2.000 m² en El Dau es un salto bestial. Y con el objetivo de llegar a 250 empleados, seguramente necesitaréis opciones de crecimiento adicionales.</p><p>Terrassa está a 20 minutos de vuestra sede en Diagonal. Nuestro edificio ofrece espacios desde 160 m² hasta 480 m² por planta, a partir de 7 €/m². Un hub satélite en el Vallès os daría flexibilidad y os permitiría descomprimir la oficina principal cuando el equipo crezca.</p><p>¿Queréis conocer la propuesta?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Sanofi',
    to: 'espana@sanofi.com',
    subject: 'Centro de IA en 22@ + espacio en Vallès para 2026',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>300 puestos en vuestro nuevo centro de excelencia de IA en el 22@ es una apuesta impresionante por Barcelona. Con ese nivel de contratación, es probable que busquéis opciones complementarias.</p><p>Nuestro edificio en Terrassa, a 30 minutos del 22@, ofrece 1.440 m² divididos en 3 plantas independientes. Ideal para centros de I+D, laboratorios digitales o equipos que requieran espacio propio sin el coste del centro de Barcelona. Desde 7 €/m².</p><p>Abrimos en abril de 2026. ¿Os parece que lo exploremos?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'EY España',
    to: 'comunicacion@ey.com',
    subject: '900 nuevos profesionales en 2025 — ¿necesitáis más espacio?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>900 contrataciones en 2025, un 20% más que el año anterior. Con ese ritmo, sabemos que la búsqueda de espacio es constante.</p><p>Si necesitáis un hub en el Vallès Occidental para descongestionar vuestras oficinas de Barcelona, tenemos un edificio en Terrassa con 1.440 m² distribuidos en 3 plantas. Espacios desde 160 m² hasta plantas completas de 480 m², desde 7 €/m². Con parking y apertura en abril de 2026.</p><p>Una opción flexible y económica para equipos que no necesiten estar en el centro.</p><p>¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'AstraZeneca',
    to: 'info@astrazeneca.es',
    subject: 'Global Hub en Barcelona + espacio en Vallès para seguir creciendo',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>257,6 millones de inversión y 540 empleos en vuestro nuevo Global Hub en Barcelona. Sois un motor del ecosistema de ciencias de la vida.</p><p>Si en algún momento necesitáis una segunda sede en el Vallès Occidental para equipos de I+D, operaciones o ensayos clínicos, tenemos un edificio en Terrassa con espacios desde 160 m² hasta 480 m² por planta. Precios desde 7 €/m², a 30 minutos de vuestro hub.</p><p>Apertura abril 2026. ¿Os parece que lo conozcamos?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'QIAGEN',
    to: 'info@qiagen.com',
    subject: '8.000 m² en Esplugues + espacio flexible en Terrassa',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>8.000 m² de centro global de innovación en Esplugues, 13 millones de inversión, apertura en 2026. Estáis creciendo de 230 a más de 400 empleados. Un 74% de crecimiento en plantilla es un reto logístico importante.</p><p>Os propongo una opción complementaria: nuestro edificio de oficinas en Terrassa está a 15 minutos de Esplugues, con 1.440 m² en 3 plantas. Espacios desde 160 m² (12-18 personas) hasta 480 m² (40-60 personas), desde 7 €/m². Ideal para equipos de I+D o laboratorios secos.</p><p>Coincidimos en apertura (2026). ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'CrowdStrike',
    to: 'info@crowdstrike.com',
    subject: 'EMEA HQ en Llull 122 + espacio satélite en el Vallès',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>5.027 m² enteros en Llull 122. Habéis apostado fuerte por Barcelona como cuartel general europeo. Impresionante.</p><p>Cuando un equipo crece tanto, tener una segunda opción más flexible en el Vallès puede ser estratégico: un hub de talento técnico, un centro de operaciones o simplemente espacio de respaldo. Nuestro edificio en Terrassa ofrece 1.440 m² en 3 plantas, desde 7 €/m², a 30 minutos del 22@.</p><p>Abrimos en abril de 2026. ¿Os parece interesante?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Scopely',
    to: 'press@scopely.com',
    subject: '8.500 m² en 22@... ¿y una segunda base en el Vallès?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>8.500 m² en vuestro cuarto hub en Barcelona, 161 millones de ingresos, +25%. Vuestra trayectoria es espectacular.</p><p>Para empresas con vuestro volumen de crecimiento, tener opciones de expansión fuera del 22@ os da flexibilidad estratégica. Nuestro edificio en Terrassa, a 30 minutos, ofrece 3 plantas independientes (160-480 m² cada una) desde 7 €/m². Un espacio satélite para equipos concretos, operaciones o I+D.</p><p>Abrimos en 2026. ¿Os parece que lo hablemos?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Inbrain Neuroelectronics',
    to: 'info@inbrain-neuroelectronics.com',
    subject: '2.700 m² en 2028... ¿y mientras tanto?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>78,2 millones levantados, el PCB al 100% de capacidad, y un nuevo edificio de 2.700 m² previsto para 2028. Sabemos que necesitáis espacio intermedio ya.</p><p>Os ofrecemos una solución temporal y flexible: nuestro edificio en Terrassa abre en abril de 2026 con espacios desde 160 m², desde 7 €/m². Suficiente para daros aire hasta que tengáis vuestro edificio definitivo, y lo suficientemente flexible para adaptarse a vuestro crecimiento.</p><p>¿Queréis conocerlo?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Orange Cyberdefense España',
    to: 'info@orangecyberdefense.com',
    subject: '100 expertos en ciberseguridad — ¿dónde los ubicáis?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Estáis lanzando Orange Cyberdefense España con 100 expertos y un SOC en Barcelona. Es un proyecto ambicioso que necesita espacio desde el día uno.</p><p>Nuestro edificio en Terrassa puede alojar equipos de ciberseguridad, SOC o I+D con espacio flexible desde 7 €/m². Ofrecemos 1.440 m² en 3 plantas, parking y fibra de alta velocidad. A 30 minutos de Barcelona y con buena conexión al Vallès.</p><p>Apertura abril 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Kleinanzeigen (Adevinta)',
    to: '',
    subject: 'Subsidiaria en 22@ + espacio en Terrassa para I&D',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Acabáis de abrir vuestra primera filial española en el 22@ con 36 millones de usuarios mensuales. Estáis contratando desarrolladores y montando un hub de I&D en Barcelona.</p><p>Para equipos de ingeniería que no necesiten estar en el centro, Terrassa es una alternativa excelente. Nuestro edificio ofrece 1.440 m² en 3 plantas, desde 160 m² a 480 m², desde 7 €/m². Un entorno tranquilo y bien conectado para que vuestro equipo técnico trabaje a gusto.</p><p>Abrimos en abril de 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'TravelPerk',
    to: 'press@travelperk.com',
    subject: '9.400 m² en A160 — ¿necesitaréis un hub satélite?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>1.500 empleados y 9.400 m² en Almogàvers 160. Sois los reyes del travel tech y vuestra política IRL-first (3 días en oficina) os exige espacio de calidad.</p><p>Si en algún momento necesitáis espacios adicionales para equipos específicos —o simplemente una opción más económica para ciertos departamentos— tenemos un edificio en Terrassa con 3 plantas independientes (160, 240 y 480 m²), desde 7 €/m². A 30 minutos de vuestra sede.</p><p>Abrimos en abril 2026. ¿Os parece que lo conozcamos?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Murphy AI',
    to: 'careers@getmurphy.ai',
    subject: '40 personas y creciendo — ¿espacio para escalar?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>15 millones de dólares levantados, 40 empleados, contratando ingenieros, VP de producto y Head of Finance. Murphy crece muy rápido.</p><p>Os propongo una alternativa a Poblenou: Terrassa está a 30 minutos y ofrecemos espacios desde 160 m² (12-18 personas) hasta 480 m², desde 7 €/m². Podéis empezar con 160 m² e iros expandiendo por fases sin cambiar de edificio.</p><p>Abrimos en abril de 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Cala AI',
    to: '',
    subject: 'Oficina recién inaugurada en Barcelona + expansión',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>7 millones en pre-seed, ex-Apple y ex-Vilynx, oficina recién inaugurada en Barcelona y planes de expansión a Estados Unidos. Empezáis con fuerza.</p><p>Si necesitáis espacio para seguir creciendo el equipo técnico en España, Terrassa os da más metros por menos precio. Desde 7 €/m², con espacios flexibles de 160 a 480 m². Perfecto para un equipo de IA que necesita concentración.</p><p>Abrimos en 2026. ¿Os parece que lo hablemos?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },

  // ═══════════════════════════════════════════════════
  // URGENCIA MEDIA-ALTA (16)
  // ═══════════════════════════════════════════════════

  {
    name: 'Vytrus Biotech',
    to: 'info@vytrus.com',
    subject: '3.000 m² en Terrassa... ¿necesitáis más espacio de oficina?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>75% de crecimiento en ventas, 5,5 millones en una nueva planta de 1.600 m², y 3.000 m² totales con contrato de 15 años. Sois un referente en Terrassa.</p><p>Ya que estáis en la ciudad, ¿habéis pensado en separar la producción de las oficinas? Nuestro edificio, a pocos minutos de vuestra planta, ofrece 1.440 m² de oficinas premium en 3 plantas. Desde 7 €/m². Ideal para vuestro equipo directivo, I+D y administración, liberando espacio en vuestra planta para seguir produciendo.</p><p>Abrimos en abril de 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Aflofarm España',
    to: 'info@aflofarm.es',
    subject: 'Nuevas oficinas en Diagonal + una opción en el Vallès',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>19 millones de facturación, nuevos lanzamientos OTC y oficinas en Diagonal. Vuestra expansión en España va viento en popa.</p><p>Si en algún momento necesitáis un hub logístico, comercial o de I+D en el Vallès Occidental, tenemos oficinas en Terrassa desde 160 m², desde 7 €/m². Bien comunicado con Barcelona y con espacio para crecer.</p><p>Abrimos en abril de 2026. ¿Os parece que lo conozcamos?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Siemens',
    to: 'info.es@siemens.com',
    subject: 'Torre Diagonal One + una base en el Vallès',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Vuestra nueva sede en Torre Diagonal One es un acierto. Pero con vuestra división de Mobility invirtiendo en Cornellà y vuestra presencia en toda Cataluña, igual necesitáis una base adicional en el Vallès.</p><p>Terrassa, a 30 minutos del 22@, es el lugar ideal. Nuestro edificio ofrece 1.440 m² en 3 plantas, desde 7 €/m². Un centro técnico o de operaciones en el Vallès os daría proximidad a clientes y talento local.</p><p>Apertura abril 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Heura Foods',
    to: 'info@heurafoods.com',
    subject: 'Nuevo laboratorio + oficinas en 22@ — ¿necesitáis más espacio?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>20 millones del BEI, nuevo laboratorio de innovación, nuevas categorías de producto. Heura no para de crecer.</p><p>Cuando una foodtech escala, el espacio de oficinas se queda pequeño rápido. Os ofrecemos una opción en Terrassa: 1.440 m² en 3 plantas, desde 160 m² hasta 480 m², desde 7 €/m². Ideal para equipos de I+D alimentario, marketing o administración que no necesiten estar en el 22@.</p><p>Abrimos en 2026. ¿Os parece interesante?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Net-Pharma / Leanbio',
    to: 'info@leanbio.com',
    subject: 'Estáis al lado — oficinas en Terrassa para el Net-Pharma Hub',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>25 millones de inversión, 4.000 m² de planta biofarmacéutica, 7.600 m² de hub. Estáis literalmente al lado de nuestro edificio.</p><p>Si alguna compañía del hub necesita espacio de oficinas independiente, o si vosotros mismos queréis separar la producción de la gestión, nuestro edificio en Terrassa (a 5 minutos) tiene 1.440 m² de oficinas premium desde 7 €/m².</p><p>Abrimos en 2026, coincidiendo con vuestra inauguración. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Deloitte',
    to: 'comunicacion@deloitte.es',
    subject: '14.100 m² en Edificio Aura + opción en el Vallès',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>14.100 m² en Edificio Aura, la mayor operación de oficinas de 2025 en Barcelona. Sois un gigante.</p><p>Cuando una firma de vuestro tamaño sigue creciendo, tener opciones satélite en el Vallès os da flexibilidad para equipos de auditoría, consultoría o tecnología que trabajan con clientes de la zona. Nuestro edificio en Terrassa ofrece 3 plantas (160-480 m²) desde 7 €/m².</p><p>Apertura 2026. ¿Os parece que lo hablemos?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Larian Studios',
    to: 'info@larian.com',
    subject: 'Estudio en Barcelona + espacio para el equipo en Terrassa',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Baldur's Gate 3 os ha puesto en el mapa y vuestro estudio de Barcelona no para de contratar: programación, VFX, herramientas, IT. 10 posiciones abiertas.</p><p>Para un estudio de desarrollo, a veces tener un espacio secundario más tranquilo y económico ayuda a concentrar a ciertos equipos. Terrassa está a 30 minutos y ofrecemos oficinas desde 160 m², desde 7 €/m², con fibra de alta velocidad y parking.</p><p>Abrimos en 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Socialpoint',
    to: 'info@socialpoint.es',
    subject: '11 posiciones abiertas — ¿necesitáis ampliar espacio?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Director de Game Economy, Senior Backend, Lead Product Manager... 11 vacantes y contratación continua. Os estáis expandiendo.</p><p>Si necesitáis espacio adicional para nuevos equipos, Terrassa es una opción inteligente: a 30 minutos del 22@, oficinas desde 160 m², desde 7 €/m². Un hub satélite para vuestros equipos de desarrollo o live ops.</p><p>Abrimos 2026. ¿Os parece que lo conozcamos?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'VTEX',
    to: 'info@vtex.com',
    subject: 'Hub EMEA/APAC en Barcelona + espacio en el Vallès',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Acabáis de inaugurar vuestra oficina en Barcelona como hub para EMEA y APAC. Gestionar múltiples mercados desde una sola sede requiere espacio y flexibilidad.</p><p>Terrassa, a 30 minutos, os ofrece una alternativa más amplia y económica para equipos que puedan operar fuera del centro. Nuestro edificio: 1.440 m², 3 plantas, desde 7 €/m².</p><p>Abrimos en 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Sandsoft',
    to: 'info@sandsoft.com',
    subject: 'HQ europeo en Barcelona — os ayudamos con el espacio',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Vais a crear 60 empleos cualificados en 3 años con vuestro cuartel general europeo en Barcelona. Una apuesta importante.</p><p>Para una compañía que empieza su andadura en Barcelona, Terrassa ofrece oficinas de calidad a un precio imbatible: desde 7 €/m², espacios de 160 a 480 m². Empezad con 160 m² y ampliad según contratéis.</p><p>Abrimos 2026. ¿Os parece que lo exploremos?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Andersen',
    to: 'info@andersen.com',
    subject: '30 profesionales nuevos en Barcelona — ¿dónde los ubicáis?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Estáis añadiendo hasta 30 profesionales y buscando integrar otros despachos. Vuestra expansión en Barcelona es agresiva.</p><p>Si necesitáis espacio adicional en el Vallès —muchos de vuestros clientes están en la zona— tenemos oficinas en Terrassa desde 160 m², desde 7 €/m². Un despacho satélite para vuestro equipo de corporate o fiscal.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Smith & Nephew',
    to: 'info@smith-nephew.com',
    subject: '1.700 m² en Esplugues — ¿os planteáis más espacio?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>1.700 m² en el Campus Esplugues para I+D en reparación de tejidos. Vuestra presencia en el Vallès es sólida.</p><p>Si necesitáis espacio adicional para equipos de investigación, ensayos clínicos o administración, Terrassa está a 10 minutos. Nuestro edificio tiene 1.440 m² en 3 plantas, desde 7 €/m².</p><p>Abrimos 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Chery',
    to: 'info@chery.cn',
    subject: 'Centro de I+D en Cornellà + espacio en Terrassa',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>2.000 m² de centro de I+D en Arboretum2 para otoño de 2026. Sexto centro global de I+D, 400 millones de inversión en Cataluña. Sois un actor importante.</p><p>Si necesitáis espacio adicional para vuestro equipo de ingeniería en el Vallès, nuestro edificio en Terrassa está a 20 minutos de Cornellà. 1.440 m² en 3 plantas, desde 7 €/m².</p><p>Abrimos también en 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Mews',
    to: 'info@mews.com',
    subject: 'Nueva oficina en Gran Via + espacio de respaldo',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Nueva oficina en Gran Via, 60% de crecimiento en España, 185 millones de Serie C. Mews está en plena expansión.</p><p>Si necesitáis un hub satélite para equipos de tecnología o atención al cliente, Terrassa ofrece oficinas modulares desde 160 m², desde 7 €/m², a 30 minutos de vuestra sede.</p><p>Abrimos 2026. ¿Os parece interesante?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Wallapop',
    to: 'press@wallapop.com',
    subject: '19 millones de usuarios y Naver — ¿ampliáis oficinas?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>19 millones de usuarios, rentables desde 2024, adquiridos por Naver por 377 millones. Empezáis 2026 con vuestra mejor versión.</p><p>Si Naver os impulsa a crecer en plantilla, necesitaréis espacio. Nuestro edificio en Terrassa está a 30 minutos del 22@, con oficinas desde 160 m², desde 7 €/m². Un espacio para nuevos equipos sin saturar vuestra sede actual.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Typeform',
    to: 'press@typeform.com',
    subject: '2.000 m² en 22@ — ¿necesitaréis más?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>187 millones levantados, 300+ empleados, 20 posiciones abiertas. Typeform ha dejado atrás el coworking y tiene 2.000 m² en el 22@.</p><p>Cuando seguís contratando, el espacio se queda pequeño. Terrassa os ofrece una alternativa flexible a 30 minutos, con oficinas desde 160 m², desde 7 €/m². Para equipos de engineering, customer success o ventas que puedan operar desde el Vallès.</p><p>Abrimos 2026. ¿Os parece que lo hablemos?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Sopra Steria España',
    to: 'info@soprasteria.es',
    subject: '2.967 m² en Campus MILE — ¿y un hub en Terrassa?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>2.967 m² en tres plantas del Campus MILE, compartiendo edificio con Glovo. Vuestra presencia en el 22@ es sólida.</p><p>Para una consultora como Sopra Steria, tener una base en el Vallès os acercaría a clientes industriales y administraciones locales. Nuestro edificio en Terrassa ofrece 1.440 m² en 3 plantas, desde 7 €/m².</p><p>Abrimos 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Colvin',
    to: 'info@colvin.com',
    subject: '45 millones levantados y 100 nuevas contrataciones',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>45 millones de financiación, contratando a 100 personas más, expansión a Francia y marketplace B2B. Colvin no para.</p><p>Necesitaréis espacio para todos esos nuevos perfiles. Terrassa, a 30 minutos de Barcelona, os ofrece oficinas desde 160 m², desde 7 €/m². Un centro logístico o de operaciones en el Vallès que complemente vuestra sede.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Amenitiz',
    to: 'info@amenitiz.com',
    subject: '230 empleados y 50 millones — ¿espacio para seguir?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>50 millones levantados, 14.000 clientes hoteleros, 230 empleados. Sois un referente del travel tech.</p><p>Si seguís creciendo al ritmo actual, el espacio se convierte en un problema. Terrassa os ofrece una alternativa a 30 minutos del 22@ con oficinas desde 160 m², desde 7 €/m². Un hub para vuestro equipo de ingeniería o ventas.</p><p>Abrimos 2026. ¿Os parece interesante?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Mitiga Solutions',
    to: 'info@mitigasolutions.com',
    subject: 'Clientes como Tesla y NHS — ¿necesitáis más espacio?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>8,4 millones del EIC, spin-off del BSC, clientes como Tesla, NHS y Acciona. Dais servicio a nivel global desde Barcelona.</p><p>Si estáis creciendo el equipo, Terrassa os ofrece un espacio premium a precio competitivo: desde 7 €/m², oficinas de 160 a 480 m², a 30 minutos del centro. Un entorno tranquilo para un equipo de climate tech que necesita concentración.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Genesy AI (Enginy)',
    to: '',
    subject: 'De 20 a 40 en 9 meses — ¿dónde colocáis a los nuevos?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>5 millones de seed, 20 empleados en 9 meses, objetivo de 40. Clientes como Factorial, Sequra y Metricool. Estáis en fase de crecimiento acelerado.</p><p>En lugar de pagar precios de Barcelona, mirad Terrassa: desde 7 €/m², espacios flexibles de 160 m² (12-18 personas) ampliables. Empezad con 160 m² y creced sin cambiar de edificio.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },

  // ═══════════════════════════════════════════════════
  // URGENCIA MEDIA (25)
  // ═══════════════════════════════════════════════════

  {
    name: 'Grifols',
    to: 'info@grifols.com',
    subject: 'Sant Cugat + Terrassa: oficina satélite en el Vallès',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>23.000 empleados globales, más de 23 vacantes activas en Sant Cugat. Vuestra sede sigue siendo un motor de empleo en el Vallès.</p><p>Si necesitáis espacio adicional para equipos concretos —I+D, administración, recruiting— Terrassa está a 10 minutos de Sant Cugat. Nuestro edificio ofrece 1.440 m² en 3 plantas, desde 7 €/m².</p><p>Abrimos 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'FORCADELL',
    to: 'info@forcadell.com',
    subject: 'Nueva sede en Terrassa — ¿colaboramos?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Felicidades por la nueva sede en Terrassa, consolidando tres ubicaciones en una. Sois la inmobiliaria de referencia de la zona.</p><p>Nosotros también tenemos un proyecto en Terrassa: un edificio de oficinas premium de 1.440 m². Quizás podamos colaborar: vosotros tenéis los clientes, nosotros el espacio. Una alianza estratégica que beneficie a ambos.</p><p>¿Os parece que nos conozcamos?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Banco Sabadell',
    to: 'bancosabadell@bancosabadell.com',
    subject: 'HQ en Sabadell + oficina en Terrassa',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Habéis devuelto la sede a Sabadell y añadido 69 especialistas a banca de empresas. Vuestra conexión con el Vallès es más fuerte que nunca.</p><p>Si necesitáis una oficina adicional en Terrassa para vuestro equipo de banca de empresas o atención al cliente, tenemos un edificio con espacios desde 160 m², desde 7 €/m². A 5 minutos de Sabadell.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Cushman & Wakefield',
    to: 'barcelona@cushmanwakefield.com',
    subject: 'Proyecto en Terrassa — ¿os interesa como partner?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>1.300 m² en L'Illa Diagonal y 2,6 millones invertidos en Iberia. Vuestra apuesta por Barcelona es clara.</p><p>Tenemos un proyecto de oficinas en Terrassa (1.440 m², 3 plantas) y, como líderes del sector inmobiliario, quizás os interese conocerlo para vuestra cartera de clientes del Vallès. Espacios flexibles desde 160 m², desde 7 €/m², apertura 2026.</p><p>¿Os parece que colaboremos?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'SIXT España',
    to: 'press@sixt.es',
    subject: 'Nueva sucursal en Sabadell + oficina en Terrassa',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Nueva sucursal en Sabadell y objetivo de 100 sucursales. Vuestra expansión en el Vallès es evidente.</p><p>Si necesitáis una base operativa con oficinas en la zona, nuestro edificio en Terrassa ofrece 1.440 m² en 3 plantas, desde 7 €/m². Ideal para vuestro equipo regional.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Banca March',
    to: 'info@bancamarch.es',
    subject: '5.200 m² en Diagonal + opción en el Vallès',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>5.200 m² en Diagonal 431 muestran vuestras ambiciones de crecimiento en Barcelona.</p><p>Si necesitáis una oficina en el Vallès para banca privada o empresas, Terrassa ofrece un edificio premium con espacios desde 160 m², desde 7 €/m². Con parking y buena conexión.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Sage',
    to: 'info@sage.com',
    subject: '3.700 m² en 22@ + un hub en el Vallès',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>3.700 m² en el NBA del 22@ confirman vuestra expansión en Barcelona.</p><p>Si necesitáis una oficina satélite para equipos de I+D, soporte o ventas en el Vallès, Terrassa está a 30 minutos. 1.440 m², desde 7 €/m².</p><p>Abrimos 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Infor',
    to: 'info@infor.com',
    subject: '2.440 m² en 22@ + espacio flexible en Terrassa',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>2.440 m² en la NBA del 22@ reflejan vuestra estrategia de crecimiento en el Sur de Europa.</p><p>Si necesitáis una base adicional en el Vallès, nuestro edificio en Terrassa ofrece oficinas desde 160 m², desde 7 €/m². Un centro de competencias o I+D a 30 minutos de Barcelona.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Sateliot',
    to: 'info@sateliot.space',
    subject: '1.800 m² en Barcelona — ¿necesitáis más espacio?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>137 millones de financiación, 1.800 m² en Sants-Montjuïc y una constelación de satélites 5G IoT que lanzar. Sois un referente.</p><p>Si necesitáis espacio para nuevos equipos de ingeniería o operaciones, Terrassa ofrece oficinas desde 160 m², desde 7 €/m², a 30 minutos de vuestra sede.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Puig Brands',
    to: 'info@puig.com',
    subject: '21.000 m² en Plaza Europa + opción en el Vallès',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Segunda torre completada en Plaza Europa, 21.000 m² totales, 3.620 millones de ingresos. Sois un gigante de la perfumería.</p><p>Si vuestro crecimiento requiere espacio adicional para equipos específicos en el Vallès, Terrassa está a 15 minutos de L'Hospitalet. Ofrecemos 1.440 m² en 3 plantas, desde 7 €/m².</p><p>Abrimos 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Shein',
    to: 'press@shein.com',
    subject: 'Hub de marketing en Barcelona + espacio futuro',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Acabáis de abrir vuestro hub de marketing en Barcelona con planes de expansión. España es vuestro top 3 en Europa.</p><p>Cuando decidáis ampliar el equipo, Terrassa os ofrece oficinas modulares desde 160 m², desde 7 €/m², con espacio para escalar sin cambiar de sede.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'FunPlus',
    to: 'info@funplus.com',
    subject: 'Hub editorial en Barcelona + espacio en Terrassa',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Vuestro hub editorial en Barcelona está creciendo: creative, community, marketing, brand growth. Sois un referente del gaming.</p><p>Si necesitáis espacio adicional para nuevos equipos, Terrassa ofrece oficinas desde 160 m², desde 7 €/m², a 30 minutos del 22@.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Sequentia Biotech',
    to: 'info@sequentiabiotech.com',
    subject: 'UAB + Terrassa: oficina para vuestro equipo',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Ubicados en el Campus UAB, desarrollando software de análisis de secuencias de ADN. Estáis en el corazón del talento biotecnológico.</p><p>Si os planteáis dar el salto a una oficina propia fuera del campus, Terrassa está a 5 minutos de la UAB. Nuestro edificio ofrece espacios desde 160 m², desde 7 €/m².</p><p>Abrimos 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Novartis',
    to: 'info@novartis.es',
    subject: 'Gran Via 764 + espacio en el Vallès',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>5 plantas y 13.400 m² renovados en Gran Via. Una sede impresionante.</p><p>Para una farmacéutica de vuestro tamaño, tener un hub en el Vallès os da flexibilidad para equipos de I+D, ensayos clínicos o visitadores médicos. Nuestro edificio en Terrassa ofrece 1.440 m², desde 7 €/m².</p><p>Abrimos 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Glovo',
    to: 'press@glovoapp.com',
    subject: 'HQ en 22@ + hub satélite en el Vallès',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Sede en el 22@, rodeados de CrowdStrike, Rakuten, NTT Data. Sois el corazón del tech cluster barcelonés.</p><p>Si necesitáis espacio adicional para equipos de operaciones, atención al cliente o I+D, Terrassa está a 30 minutos. Oficinas desde 160 m², desde 7 €/m².</p><p>Abrimos 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Talent.com',
    to: 'info@talent.com',
    subject: 'Hub europeo en Barcelona — espacio para crecer',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Hub europeo, 20 empleos creados con apoyo de ACCIÓ, y plan para doblar plantilla en 5 años. Vuestra apuesta por Barcelona es sólida.</p><p>Si estáis planificando el crecimiento del equipo, Terrassa os ofrece un espacio más amplio y económico: desde 160 m², desde 7 €/m², a 30 minutos de Barcelona.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Fleet Mobility',
    to: '',
    subject: 'Habéis doblado plantilla — ¿necesitáis más oficina?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Habéis doblado la plantilla en un año, alquilado 428 m² en el Alt Building, y tenéis planes de expansión en Latinoamérica. El crecimiento es imparable.</p><p>Cuando dobléis otra vez, necesitaréis más espacio. Terrassa os ofrece oficinas desde 160 m² hasta 480 m² por planta, desde 7 €/m². Espacio para escalar sin estrés.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Valerdat',
    to: 'eduard.aran@valerdat.com',
    subject: 'Crecimiento 6x anual — ¿necesitáis oficina?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>6x de crecimiento anual, duplicando ingresos recurrentes cada 3 meses, de 30 a 100 clientes, objetivo de 20 empleados. Valerdat es un cohete.</p><p>Cuando paséis de 15 a 20 y luego a 40 personas, necesitaréis una oficina que crezca con vosotros. Terrassa: desde 160 m², desde 7 €/m², espacio modular ampliable.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Danelfin',
    to: '',
    subject: '2 millones de Nauta Capital — ¿oficina para escalar?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>2 millones levantados, plataforma AI de stock picking, finalistas de los Benzinga Fintech Awards. Estáis en modo crecimiento.</p><p>Cuando empecéis a escalar el equipo, necesitaréis una oficina que os dé flexibilidad. Terrassa ofrece espacios desde 160 m², desde 7 €/m², a 30 minutos de Barcelona.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Alinia AI',
    to: '',
    subject: '7,5 millones de seed + oficina en Barcelona',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>7,5 millones de seed, plataforma de AI guardrails, contratando Research Scientists a 75-110K. Empezáis con fuerza.</p><p>Si estáis montando el equipo técnico en Barcelona, considerad Terrassa: oficinas desde 7 €/m², desde 160 m², con fibra, parking y espacio para crecer. Un entorno ideal para un equipo de IA que necesita concentración.</p><p>Abrimos 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  }
];

async function main() {
  console.log(`Iniciando envío de ${leads.length} emails...\n`);
  const results = [];

  for (const lead of leads) {
    if (!lead.to) {
      console.log(`⚠  ${lead.name}: sin email de contacto, saltando`);
      results.push({ name: lead.name, to: '(sin email)', status: 'skipped' });
      continue;
    }
    try {
      const r = await resend.emails.send({
        from: FROM,
        to: lead.to,
        subject: lead.subject,
        html: lead.body
      });
      results.push({ name: lead.name, to: lead.to, status: 'sent', id: r.data?.id });
      console.log(`✓ ${lead.name} <${lead.to}>`);
    } catch (err) {
      results.push({ name: lead.name, to: lead.to, status: 'error', error: err.message });
      console.error(`✗ ${lead.name} <${lead.to}>: ${err.message}`);
    }
    // Pequeña pausa para no rate-limit
    await new Promise(r => setTimeout(r, 500));
  }

  const sent = results.filter(r => r.status === 'sent').length;
  const skipped = results.filter(r => r.status === 'skipped').length;
  const errors = results.filter(r => r.status === 'error').length;
  console.log(`\n========================================`);
  console.log(`Enviados: ${sent} | Saltados: ${skipped} | Errores: ${errors}`);
  console.log(`Total: ${results.length}/${leads.length}`);
  console.log(`========================================`);
}

main();
