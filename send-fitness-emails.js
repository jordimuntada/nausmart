const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = 'Jordi de RealBrave <hello@realbrave.eu>';

const leads = [
  // ═══════════════════════════════════════════════════
  // PRIORIDAD ALTA (lead_score >= 80)
  // ═══════════════════════════════════════════════════

  {
    name: 'Gold\'s Gym España',
    to: 'info@goldsgym.es',
    subject: '480 m² en Terrassa para vuestro próximo Gold\'s Gym',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Vuestro éxito en Terrassa (flagship de 3M€) y Sant Cugat (4M€) demuestra que el Vallès es un mercado clave para Gold's Gym. Con el objetivo de 50 clubs en 5 años, sé que estáis buscando ubicaciones estratégicas.</p><p>Os propongo algo diferente: tenemos una planta entera de 480 m² diáfanos en nuestro nuevo edificio de oficinas premium en Terrassa (Ctra. Rubí, 292). La idea es que un operador fitness convierta esa planta en un gimnasio. Estaríais literalmente dentro de un edificio de oficinas con empresas como inquilinos —vuestro cliente ideal para membresías corporativas.</p><p>Apertura diciembre 2026. Parking de 25+ plazas. ¿Os interesa la propuesta?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Fitness Park Spain',
    to: 'info@fitnesspark.es',
    subject: 'Vuestro club #401 en Terrassa — 480 m² en el mejor edificio de oficinas',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Acabáis de abrir vuestro club #400 en Terrassa. Enhorabuena. Habéis validado que la ciudad funciona para Fitness Park con vuestro modelo smart-price.</p><p>Ahora os traemos una oportunidad complementaria: una planta de 480 m² en un nuevo edificio de oficinas premium en la Ctra. Rubí, 292, a minutos de vuestro club #400. El edificio albergará empresas con cientos de empleados —tráfico garantizado para un gimnasio de proximidad.</p><p>Podría ser vuestro formato urbano: 480 m², 24/7, enfocado a captar los abonos corporativos de las empresas del edificio y la zona de oficinas de Terrassa.</p><p>Apertura diciembre 2026. ¿Os parece interesante?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Zenergie Body & Soul',
    to: '',
    subject: '480 m² en Terrassa — vuestro formato exacto',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>He visto que Zenergie busca locales de 500-600 m² en ciudades de 50.000+ habitantes. Terrassa tiene 225.000 habitantes y estáis a punto de abrir vuestro primer centro en Barcelona.</p><p>Coincidencia: tenemos una planta de 480 m² en nuestro nuevo edificio de oficinas en Terrassa que encaja perfectamente con vuestro formato. Un centro de longevidad y bienestar dentro de un edificio corporativo, con empresas como clientela cautiva para membresías premium.</p><p>La ubicación en Ctra. Rubí, 292, está a 30 minutos de Barcelona y tiene parking para 25+ coches. Apertura diciembre 2026. ¿Queréis conocerlo?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Wellhub (Gympass)',
    to: '',
    subject: '480 m² fitness en Terrassa — para vuestra red de partners',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Sé que Wellhub no opera gimnasios, sino que conecta empresas con centros fitness. Pero precisamente por eso os escribo.</p><p>Estamos desarrollando un edificio de oficinas premium en Terrassa con una planta entera de 480 m² disponible para un operador fitness. Nuestros inquilinos serán empresas con empleados que buscan exactamente lo que Wellhub ofrece. ¿Os gustaría conectar a vuestros clientes corporativos con el operador que ocupe ese espacio?</p><p>Básicamente, podemos diseñar el espacio pensando en la integración con Wellhub desde el día uno. Apertura diciembre 2026, Ctra. Rubí, 292.</p><p>¿Os interesa la conversación?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Synergym (VivaGym Group)',
    to: '',
    subject: '480 m² en Terrassa para Synergym — justo lo que buscabais',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Habéis nombrado Terrassa y Sabadell como objetivos de expansión, con 7M€ para invertir en Cataluña. Y sé que estáis en proceso de integración con VivaGym.</p><p>Os ofrezco una ubicación privilegiada: una planta de 480 m² en nuestro nuevo edificio de oficinas premium en Terrassa (Ctra. Rubí, 292). Un gimnasio low-cost dentro de un edificio corporativo, con cientos de empleados como clientes potenciales. Vuestro formato encaja, vuestra estrategia naming Terrassa como target, y nosotros tenemos el espacio.</p><p>Apertura diciembre 2026. ¿Os interesa conocerlo?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Aurial Padel / Grup Aurial',
    to: '',
    subject: '480 m² fitness + padel en Terrassa — ampliad vuestro ecosistema',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Ya estáis en Terrassa y seguís expandiendo vuestro concepto híbrido de padel + fitness + gastro en el Vallès. Tiene sentido: funciona.</p><p>Os propongo sumar una pieza más: una planta de 480 m² en nuestro nuevo edificio de oficinas premium en Terrassa (Ctra. Rubí, 292). Podría ser vuestro centro de fitness corporativo, un estudio de entrenamiento funcional o una ampliación de vuestra oferta sin necesidad de pistas de pádel. Las empresas del edificio serían vuestros mejores clientes.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Wellness Revolution (DiR Franchises)',
    to: 'expansion@dir.cat',
    subject: 'YogaOne, Glow Pilates o OneDiR en Terrassa — 480 m² disponibles',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Con 65+ centros YogaOne, Glow Pilates expandiéndose a Madrid y OneBarre creciendo, sé que buscáis ubicaciones para vuestras franquicias.</p><p>Terrassa no tiene YogaOne todavía. Y tenemos 480 m² diáfanos en un edificio de oficinas premium (Ctra. Rubí, 292) perfectos para cualquiera de vuestros conceptos boutique. Un estudio de pilates, yoga o barre dentro de un edificio corporativo es el match perfecto para el wellbeing laboral.</p><p>Apertura diciembre 2026. ¿Os interesa conocerlo?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Anytime Fitness Iberia',
    to: 'franquicia@anytimefitness.es',
    subject: '480 m² 24/7 en Terrassa — para vuestra red',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>12 aperturas previstas en 2026, Cataluña como prioridad, y un formato 24/7 que funciona. Anytime Fitness está en plena expansión.</p><p>Os ofrezco una ubicación estratégica: 480 m² en nuestro nuevo edificio de oficinas premium en Terrassa (Ctra. Rubí, 292). Un gimnasio 24/7 dentro de un edificio corporativo es ideal para empleados que trabajan hasta tarde, turnos flexibles o que quieren entrenar antes de entrar a la oficina.</p><p>Apertura diciembre 2026, parking incluido. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Brooklyn Fitboxing',
    to: '',
    subject: '480 m² para Brooklyn Fitboxing en Terrassa',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>200+ clubs en España, 50 nuevos franquiciados en 2026. Vuestro modelo funciona y no para de crecer.</p><p>Terrassa no tiene Brooklyn Fitboxing todavía. Tenemos 480 m² diáfanos en un edificio de oficinas premium (Ctra. Rubí, 292) perfectos para vuestro formato de alta intensidad. Un boxing studio junto a oficinas —el desestrés post-laboral de los empleados sería vuestro mejor marketing.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'DiR (Clubs DiR)',
    to: '',
    subject: '480 m² en Terrassa — vuestro próximo BDiR o concepto boutique',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Sois el líder del fitness en Cataluña. Con BDiR en Sabadell y vuestra transformación multiboutique, sé que estáis mirando el Vallès.</p><p>Os ofrezco 480 m² en nuestro nuevo edificio de oficinas premium en Terrassa (Ctra. Rubí, 292). Podría ser un BDiR de proximidad, un estudio YogaOne, Glow Pilates o cualquier concepto boutique de vuestro grupo. Las empresas del edificio serían clientela cautiva para abonos corporativos.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'VivaGym Group',
    to: '',
    subject: '480 m² en Terrassa — formato proximity para VivaGym',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>260+ centros, 550.000+ miembros y 30 aperturas orgánicas al año. VivaGym es un gigante. Ya tenéis presencia en Terrassa vía Altafit.</p><p>Os propongo algo nuevo: 480 m² en nuestro edificio de oficinas premium (Ctra. Rubí, 292) como formato de proximidad / corporativo. Un VivaGym express dentro de un edificio de oficinas, captando el talento de las empresas inquilinas. Complementaría vuestra red existente sin canibalizarla.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'YogaOne (Wellness Revolution)',
    to: 'laia.mora@wellnessrevolution.es',
    subject: 'YogaOne en Terrassa — 480 m² en edificio corporativo',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>19 centros en Barcelona, 65+ en toda España, y ninguno en Terrassa. Con 225.000 habitantes, es un mercado que os pide a gritos un YogaOne.</p><p>Tenemos 480 m² diáfanos en nuestro nuevo edificio de oficinas premium (Ctra. Rubí, 292). Un estudio de yoga dentro de un edificio corporativo es el match perfecto: wellbeing laboral, clases para empleados, abonos corporativos. Vuestro formato boutique encaja.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Sano Center',
    to: 'expansion@sanocenter.es',
    subject: '480 m² en Terrassa para un Sano Center corporativo',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>68 centros, EBITDA del 32-48%, y un formato de 200-500 m² que funciona. Vuestro modelo de entrenamiento en grupos reducidos es perfecto para entorno corporativo.</p><p>Os ofrezco 480 m² en nuestro nuevo edificio de oficinas premium en Terrassa (Ctra. Rubí, 292). Un Sano Center dentro de un edificio de oficinas, con empleados como clientes potenciales desde el día uno. El payback de 24-36 meses sería aún más rápido con la clientela cautiva del edificio.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Énergie Fitness Iberia',
    to: '',
    subject: '480 m² en Terrassa — justo al lado de Rubí y Cerdanyola',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Habéis nombrado Rubí y Cerdanyola como objetivos de expansión. Terrassa está justo al lado, y tiene 225.000 habitantes.</p><p>Tenemos 480 m² en nuestro nuevo edificio de oficinas premium en la Ctra. Rubí, 292, Terrassa. Un formato de proximidad dentro de un edificio corporativo encaja con vuestro plan de 75 clubs. Las empresas del edificio os darían una base de clientes estable desde el inicio.</p><p>Apertura diciembre 2026. ¿Os interesa conocerlo?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },

  // ═══════════════════════════════════════════════════
  // PRIORIDAD MEDIA (lead_score 70-79)
  // ═══════════════════════════════════════════════════

  {
    name: 'Trib3 (Tribute Brands)',
    to: '',
    subject: '480 m² en Terrassa para TRIB3 — HIIT en zona corporativa',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>6 studios en 18 meses en España, y vuestro concepto HIIT + PILAT3S funciona. Barcelona os va bien, pero Terrassa es el siguiente paso natural.</p><p>Os ofrezco 480 m² en nuestro nuevo edificio de oficinas premium (Ctra. Rubí, 292). Un TRIB3 junto a oficinas —vuestro target demográfico joven y dinámico trabaja ahí al lado.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Metropolitan',
    to: 'metropolitan.central@clubmetropolitan.net',
    subject: '480 m² premium wellness en Terrassa — para Metropolitan',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>86,5M€ de ingresos, 83.000 miembros, y un plan de 21M€ de inversión. Sois el referente del wellness premium en España.</p><p>Os propongo un concepto satélite: 480 m² en nuestro edificio de oficinas premium en Terrassa (Ctra. Rubí, 292). Un Metropolitan boutique enfocado en bienestar corporativo, con las empresas del edificio como clientes. Vuestro posicionamiento premium encaja con el perfil de las compañías del edificio.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Un saludo,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Basic-Fit España',
    to: '',
    subject: '480 m² 24/7 en Terrassa — formato urbano Basic-Fit',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Ya estáis en Rubí y Barberà con el formato 24/7. Terrassa es el siguiente paso lógico en el Vallès.</p><p>Tenemos 480 m² en nuestro nuevo edificio de oficinas premium (Ctra. Rubí, 292) que podría funcionar como vuestro formato urbano de proximidad. 24/7, con empleados de oficinas como clientes potenciales. Complementaría vuestra red sin canibalizar.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Body Fit Training (BFT) España',
    to: '',
    subject: '480 m² en Terrassa para BFT — strength training corporativo',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Acabáis de aterrizar en Barcelona con vuestro primer estudio y planeáis 100 en 5 años. El strength training está de moda y sois partners oficiales de HYROX.</p><p>Os ofrezco 480 m² en nuestro nuevo edificio de oficinas premium en Terrassa (Ctra. Rubí, 292). Un BFT en zona corporativa, con empresas como clientes potenciales para membresías y programas de wellbeing laboral.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Indoorwall Climbing Centers',
    to: '',
    subject: '480 m² en Terrassa — Indoorwall Express en zona offices',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>15 centros en 6 años y un formato Express desde 350K€ de inversión. La escalada es olímpica y está en pleno boom.</p><p>Terrassa no tiene Indoorwall todavía. Tenemos 480 m² en nuestro nuevo edificio de oficinas premium (Ctra. Rubí, 292) que podría albergar un Indoorwall Express. El componente fitness + coworking encaja perfectamente con el perfil de las empresas del edificio.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Barry\'s Bootcamp Iberia',
    to: '',
    subject: '480 m² en Terrassa — ¿un Barry\'s satélite?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Barcelona os funciona y vuestro plan es llegar a 10 studios en 2030. Con 400 m² de formato y 165€/mes, sabéis que vuestro cliente es el profesional urbano.</p><p>Os propongo Terrassa como satellite: 480 m² en nuestro nuevo edificio de oficinas premium (Ctra. Rubí, 292). Un Barry's dentro de un edificio corporativo captaría exactamente a vuestro perfil de cliente.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Fightland',
    to: 'info@fightland.es',
    subject: '480 m² en Terrassa para Fightland — boxing corporativo',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>20 clubs, concepto de boxeo premium para no-boxeadores. Un éxito en España.</p><p>Terrassa no tiene Fightland. Y tenemos 480 m² en nuestro nuevo edificio de oficinas premium (Ctra. Rubí, 292) que sería perfecto para vuestro concepto de "premium boxing club" con clientela corporativa. El desestrés laboral mediante boxeo es tendencia.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Cross Funcional 30\'',
    to: '',
    subject: '480 m² en Terrassa — ampliad vuestro flagship',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Ya estáis en Terrassa y Sabadell con vuestro formato de entrenamiento funcional de 30 minutos. Conocéis el mercado mejor que nadie.</p><p>Os ofrezco dar el salto a un espacio más grande: 480 m² en nuestro nuevo edificio de oficinas premium (Ctra. Rubí, 292). Podría ser vuestro centro flagship, con visibilidad y clientela corporativa que vuestro local actual no tiene.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'O2 Centro Wellness',
    to: '',
    subject: '480 m² wellness femenino en Terrassa',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Acabáis de volver a Barcelona con vuestro concepto Boutique Gym para mujeres. Una apuesta inteligente.</p><p>Terrassa, con 225.000 habitantes, no tiene un O2. Os ofrezco 480 m² en nuestro nuevo edificio de oficinas premium (Ctra. Rubí, 292) para vuestro concepto de bienestar femenino. Las empresas del edificio tendrían empleadas interesadas en un espacio premium solo para ellas.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Planet Fitness España',
    to: '',
    subject: '480 m² en Terrassa — formato proximity para Planet Fitness',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>18 clubs previstos para finales de 2026 y 300 a largo plazo. Sabemos que vuestro formato es grande, pero quizás un formato urbano de 480 m² en Terrassa os interese como piloto de proximidad.</p><p>Nuestro edificio en Ctra. Rubí, 292, albergará empresas con cientos de empleados. Un Planet Fitness express captaría el segmento joven y price-sensitive de la zona.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'BeOne Centers',
    to: 'info@beone.es',
    subject: '480 m² en Terrassa para BeOne — expansión en Cataluña',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>46 centros y 10 aperturas previstas. BeOne está en modo expansión nacional.</p><p>Os ofrezco una ubicación en Terrassa: 480 m² en nuestro nuevo edificio de oficinas premium (Ctra. Rubí, 292). Un centro wellness en zona corporativa, con empresas como clientes potenciales. Vuestra certificación ISO encaja con el perfil quality del edificio.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },

  // ═══════════════════════════════════════════════════
  // PRIORIDAD MEDIA-BAJA (lead_score < 70)
  // ═══════════════════════════════════════════════════

  {
    name: 'Dreamfit',
    to: 'web@dreamfit.es',
    subject: '480 m² en Terrassa — formato proximity para Dreamfit',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>25 clubs, 112.000 miembros y 47M€ de ingresos. Sé que vuestro formato es grande, pero Terrassa merece una mirada.</p><p>Tenemos 480 m² en nuestro nuevo edificio de oficinas premium (Ctra. Rubí, 292). Un Dreamfit express en zona corporativa, con empleados como clientela base. ¿Os interesa explorar un formato más compacto?</p><p>Apertura diciembre 2026.</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Mugendo',
    to: '',
    subject: '480 m² en Terrassa para artes marciales corporativas',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>36 centros, 40 años de experiencia, y un modelo probado. Terrassa es una ciudad grande sin Mugendo.</p><p>Os ofrezco 480 m² en nuestro nuevo edificio de oficinas premium (Ctra. Rubí, 292). Espacio para tatamis, sala de fitness y zona de boxeo. Las empresas del edificio serían clientes ideales para programas de defensa personal y bienestar.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Edan Studios (Anna Lewandowska)',
    to: '',
    subject: '480 m² en Terrassa — ¿el segundo Edan?',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>Edan Studios en Balmes es un éxito. HIIT + Pilates + Dance en un espacio premium. Con el branding de Anna Lewandowska, el potencial de expansión es enorme.</p><p>Os propongo Terrassa como segunda ubicación: 480 m² en nuestro edificio de oficinas premium (Ctra. Rubí, 292). Un concepto multiboutique en zona corporativa, con empleadas como vuestro perfil de cliente ideal.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  },
  {
    name: 'Holiday Gym',
    to: '',
    subject: '480 m² en Terrassa — para vuestra expansión',
    body: `<p>Hola,</p><p>Soy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.</p><p>20 clubs y 36 años de experiencia. Sois un operador consolidado.</p><p>Si estáis mirando expandiros hacia Cataluña, Terrassa es el punto de entrada ideal. Tenemos 480 m² en nuestro nuevo edificio de oficinas premium (Ctra. Rubí, 292) para un gimnasio en zona corporativa.</p><p>Apertura diciembre 2026. ¿Os interesa?</p><p>Saludos,<br>Jordi<br>RealBrave - Can Mir Gestions | <a href="https://realbrave.eu">realbrave.eu</a></p>`
  }
];

async function main() {
  console.log(`Iniciando envío de ${leads.length} emails fitness...\n`);
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
