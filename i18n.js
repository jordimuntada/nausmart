/* ─────────────────────────────────────────────────────────────────────────
   RealBrave — shared i18n engine
   Usage: include this script on every page. The engine auto-initialises on
   DOMContentLoaded. Each page must have data-translate attributes on
   translatable elements.
   Public API: window.RBi18n.switchLanguage(lang), getCurrentLanguage(),
               getTranslation(key), generateWAUrl(page)
   ───────────────────────────────────────────────────────────────────────── */
(function () {
    'use strict';

    const WHATSAPP_PHONE = '+34626381615';

    /* ── TRANSLATIONS ─────────────────────────────────────────────────── */
    const translations = {

        /* ── CATALAN ──────────────────────────────────────────────────── */
        cat: {
            /* shared */
            nav: { home: 'Inici', building: "L'Edifici", spaces: 'Espais', amenities: 'Serveis', location: 'Ubicació', contact: 'Contacte' },
            footer: {
                description: "Espais d'oficina a Terrassa per a empreses amb ambició.",
                nav: 'Navegació', contact: 'Contacte', legal: 'Legal',
                privacy: 'Política de Privacitat', cookies: 'Política de Cookies',
                legalNotice: 'Avís Legal', rights: 'Tots els drets reservats.'
            },
            whatsapp: {
                tooltip: "Contacta'ns per WhatsApp",
                default: "Hola! M'agradaria rebre informació sobre els espais d'oficina a RealBrave.",
                building: "Hola! M'agradaria programar una visita a RealBrave per veure els espais d'oficina disponibles.",
                spaces: "Hola! M'agradaria saber més sobre els espais d'oficina disponibles a RealBrave.",
                amenities: "Hola! M'agradaria saber més sobre els serveis inclosos al lloguer d'oficines a RealBrave.",
                contact: "Hola! M'agradaria programar una visita a RealBrave per veure els espais d'oficina disponibles."
            },
            pageTitles: {
                index: "Espais d'Oficina Premium a Terrassa",
                building: "L'Edifici — RealBrave",
                spaces: "Espais — RealBrave",
                amenities: "Serveis — RealBrave",
                location: "Ubicació — RealBrave",
                contact: "Contacte — RealBrave",
                comunitat: "Comunitat — RealBrave",
                cookies: "Política de Cookies — RealBrave",
                legalNotice: "Avís Legal — RealBrave",
                privacy: "Política de Privacitat — RealBrave"
            },

            /* ── index.html ── */
            hero: {
                overline: 'Terrassa — 2026',
                headline1: "L'oficina ha mort.",
                headline2: 'Visca el lloc de treball.',
                sub: "RealBrave. Un espai de referència al cor de Terrassa, dissenyat per inspirar presència, fomentar la col·laboració i projectar prestigi.",
                cta1: 'Sol·licitar Visita',
                cta2: 'Explorar Espais',
            },
            manifesto: {
                overline: 'La Filosofia',
                headline1: 'Una Destinació,',
                headline2: 'No una Obligació.',
                body: "Les empreses no necessiten taules; necessiten un ancoratge cultural. Hem construït RealBrave al voltant de l'experiència sensorial humana. Un ecosistema on la concentració profunda coexisteix naturalment amb l'impuls col·lectiu.",
                pullquote1: 'Un espai que el teu equip triarà anar,',
                pullquote2: "no haurà d'anar.",
            },
            specs: {
                overline: 'Les Especificacions',
                s1: { label: "L'ATMOSFERA", title: 'Climatització Integral', body: "Control total de temperatura, humitat i qualitat de l'aire a totes les plantes. L'energia cognitiva del teu equip, protegida per disseny." },
                s2: { label: 'LA CONNECTIVITAT', title: 'Fibra Simètrica', body: "Alta velocitat amb redundància integrada. El teu equip treballa sense interrupcions, en local o en remot, sense compromís de rendiment." },
                s3: { label: 'LA SEGURETAT', title: 'Accés i Control 24/7', body: "Accés ininterromput, control d'entrada i aparcament propi. El teu focus en el treball; la seguretat, la nostra responsabilitat." },
            },
            canvas: {
                overline: 'El Canvas',
                headline1: 'Tres Plantes.',
                headline2: 'Un Llenç en Blanc.',
                body: 'Cada planta ofereix 480 m² sense condicions. Llogues la superfície; tu decideixes la història que explica.',
                cta: 'Explorar els Espais →',
            },
            ecosystem: {
                overline: "L'Ecosistema",
                headline1: 'Dissenyat',
                headline2: 'per als qui hi Viuen.',
                cta: 'Veure tots els Serveis →',
                items: [
                    { label: 'El Vestíbul', body: "Primera impressió de presència. L'espai comú gestionat per RealBrave estableix el to per als teus clients i visites des de l'entrada." },
                    { label: "L'Aparcament", body: "Ampli aparcament privat adjacent a l'edifici. Mobilitat sense fricció per a tot l'equip, cada dia." },
                    { label: 'Les Zones Verdes', body: "Entorn envoltat de vegetació i naturalesa. Moments de desconnexió a peu de l'edifici, sense sortir del campus." },
                    { label: 'Les Sales de Reunions', body: "Configurades per cada inquilí dins del seu espai. Zones de deliberació integrades, no compartides ni reservables per hores." },
                ],
            },
            available: {
                overline: 'Disponibilitat',
                headline: 'Formats Disponibles',
                f1: { label: 'Planta 1 — Àrea A', detail: '160 m² · 12–18 persones · Disponible' },
                f2: { label: 'Planta 1 — Completa', detail: '480 m² · 40–60 persones · Disponible' },
                f3: { label: 'Planta 2 — Àrea A', detail: '240 m² · 20–30 persones · Disponible' },
                f4: { label: 'Planta 2 — Àrea B', detail: '240 m² · 20–30 persones · Pre-llogada' },
                f5: { label: 'Planta 3', detail: '480 m² · 40–60 persones · Disponible' },
                cta1: 'Sol·licitar una Visita Privada',
                cta2: "Contacta'ns",
            },

            /* ── building.html ── */
            building: {
                header: {
                    overline: "L'Edifici",
                    headline1: 'Arquitectura',
                    headline2: 'com a Filosofia.',
                    sub: "2.500 m² de superfície distribuïts en tres plantes. Renovat el 2026. Dissenyat per durar dècades."
                },
                stats: {
                    totalSqm: 'm² totals', floors: "Plantes d'oficina",
                    renovation: 'Any de renovació', parking: "Places d'aparcament"
                },
                distribution: {
                    overline: 'La Distribució',
                    headline1: 'Quatre nivells.', headline2: 'Una sola visió.',
                    body: "Cada planta és un llenç en blanc. Tu defineixes com s'explica la teva historia.",
                    pb: { title: 'Planta Baixa — El Vestíbul', body: "Recepció i lobby d'entrada gestionats per RealBrave. Control d'accés, ascensors i zones comunes. La primera impressió de cada client que arriba." },
                    p1: { title: 'Primera Planta — 480 m²', body: "Disponible en configuració d'àrea única (480 m²) o dividida en àrees de 160–240 m². Distribució, estil i acabats: a elecció de l'empresa inquilina." },
                    p2: { title: 'Segona Planta — 480 m²', body: "Parcialment ocupada. Àrea B pre-llogada a empresa establerta. Àrea A (240 m²) disponible. Excel·lent per a equips que valoren tranquil·litat i concentració." },
                    p3: { title: 'Tercera Planta — 480 m²', body: "Planta íntegrament disponible. Vistes obertes, màxima lluminositat natural. L'opció premium per a empreses que cerquen representativitat absoluta." }
                },
                infra: {
                    overline: 'Les Infraestructures',
                    s1: { label: 'LA SEGURETAT', title: 'Control Avançat 24/7', body: "Sistema de videovigilància i control d'accés per targeta. Protecció permanent sense interferir en el ritme diari de les empreses inquilines." },
                    s2: { label: 'LA CONNECTIVITAT', title: 'Fibra Òptica Directa', body: "Infraestructura de fibra d'alta velocitat preparada per a cada planta. Cobertura WiFi integral per a una connectivitat sense punts cecs ni talls." },
                    s3: { label: "L'EFICIÈNCIA", title: 'Il·luminació LED', body: "Sistemes d'il·luminació d'alta eficiència energètica en totes les zones comunes. Menys costos d'operació, entorn de treball millor." }
                },
                cta: {
                    overline: 'Visita',
                    headline1: "Vols veure l'edifici", headline2: 'en persona?',
                    sub: "Programa una visita guiada i descobreix tots els detalls. Disponible de dilluns a divendres.",
                    cta1: 'Sol·licitar Visita Privada', cta2: 'Veure els Espais'
                }
            },

            /* ── spaces.html ── */
            spaces: {
                header: {
                    overline: 'Espais',
                    headline1: 'El Llenç', headline2: 'és Vostre.',
                    sub: "Tres formats de planta. Set unitats disponibles. Cada una un punt de partida — no un producte acabat."
                },
                formats: {
                    overline: 'Els Formats',
                    f1: { label: 'PETIT', capacity: '8–15 persones', body: "L'espai ideal per a equips que necessiten privacitat total sense renunciar a les dimensions. Layout obert o parcel·lat — tu decideixes.", priceSuffix: '/mes' },
                    f2: { label: 'MITJÀ', capacity: '15–25 persones', body: "La proporció perfecta per a empreses en creixement. Espai suficient per a zones diferenciades — treball concentrat, col·laboració, reunions.", priceSuffix: '/mes' },
                    f3: { label: 'COMPLET', capacity: '25–50 persones', body: "Una planta sencera, exclusivament per a vosaltres. Zona de recepció pròpia, fins a 4 sales de reunions, sala de presentacions. Representativitat total.", priceSuffix: '/mes' }
                },
                availability: {
                    overline: 'Disponibilitat — Juny 2026',
                    colUnit: 'Unitat', colArea: 'Superfície', colTeam: 'Equip', colPrice: 'Preu/mes', colStatus: 'Estat',
                    r1: { title: '1a Planta — Àrea A', sub: 'Primera planta · Secció A' },
                    r2: { title: '1a Planta — Completa', sub: 'Primera planta · 480 m² íntegres' },
                    r3: { title: '2a Planta — Àrea A', sub: 'Segona planta · Secció A' },
                    r4: { title: '2a Planta — Àrea B', sub: 'Segona planta · Secció B' },
                    r5: { title: '3a Planta — Àrea A', sub: 'Tercera planta · Secció A' },
                    r6: { title: '3a Planta — Àrea B', sub: 'Tercera planta · Secció B' },
                    r7: { title: '3a Planta — Completa', sub: 'Tercera planta · 480 m² íntegres' },
                    available: 'Disponible', preLeased: 'Pre-llogada', comingSoon: 'Disponible Aviat',
                    moreInfo: 'Més Info', cta1: 'Sol·licitar Visita', cta2: 'Veure Serveis Inclosos'
                },
                customisation: {
                    overline: 'Personalització',
                    headline1: 'El teu Espai,', headline2: 'la teva Marca.',
                    sub: "No lliurem oficines estandarditzades. Lliurem metres quadrats i t'acompanyem perquè els converteixis en el reflex de la teva empresa.",
                    c1: { title: 'Distribució Lliure', body: "Modifica la distribució de l'espai a la teva conveniència. Open space, cabines, sales tancades, zones de descans — qualsevol combinació és possible." },
                    c2: { title: 'Identitat Visual', body: "Aplica la paleta de colors de la teva marca. Vinils, senyalística i elements d'identitat corporativa benvinguts. L'espai ha de dir qui sou." },
                    c3: { title: 'Mobiliari a Elecció', body: "Portes el vostre mobiliari o el subministrem nosaltres. Escriptories, cadires ergonòmiques, armaris, mampares — tot coordinat amb el vostre estil." },
                    c4: { title: 'Punt de Venda / Recepció', body: "Per a plantes completes, possibilitat de configurar una zona de recepció o d'atenció al client a l'entrada. La primera impressió dels vostres visitants, en les vostres mans." }
                }
            },

            /* ── amenities.html ── */
            amenities: {
                header: {
                    overline: 'Serveis',
                    headline1: 'Tot Inclòs.', headline2: 'Sense Sorpreses.',
                    sub: "Una quota mensual. Cap cost amagat. Tot el que el teu equip necessita per treballar des del primer dia."
                },
                included: {
                    overline: 'El que Inclou',
                    headline1: 'Inclòs al teu', headline2: 'espai.',
                    sub: "No som un coworking. Cada empresa té el seu propi espai, les seves pròpies claus, el seu propi caràcter.",
                    i1: { title: 'Connectivitat sense Límits', body: "Fibra òptica d'alta velocitat i cobertura WiFi integral per a tota la planta. La connexió que necessites per a videoconferències, càrrega de fitxers i treball simultani de tot l'equip — sense interrupcions." },
                    i2: { title: 'Seguretat Permanent', body: "Videovigilància i control d'accés per targeta les 24 hores, 365 dies l'any. El teu equip entra amb la seva credencial. Ningú més." },
                    i3: { title: 'Climatització Integral', body: "Sistema de climatització independent per a cada espai. Temperatura a elecció de l'empresa inquilina. Calefacció a l'hivern, aire condicionat a l'estiu — inclòs en el lloguer." },
                    i4: { title: 'Aparcament Privatiu', body: "25+ places d'aparcament exclusiu per a empreses inquilines i els seus visitants. L'únic complex d'oficines de la zona amb aparcament cobert integrat." },
                    i5: { title: 'Recepció Virtual', body: "Servei de recepció virtual per a gestió de paqueteria, anunci de visites i atenció personalitzada. Una presència professional des del primer moment, sense necessitat de recepcionista pròpia." },
                    i6: { title: 'Manteniment i Neteja', body: "Manteniment de zones comunes i neteja periòdica inclosa. Gestió d'incidències tècniques per part de RealBrave. Tu et concentres en el teu negoci." }
                },
                meetings: {
                    overline: 'Sales de Reunions',
                    headline1: 'El teu Client', headline2: 'mai compartit.',
                    quote: "\"No oferim sales de reunions compartides. Cada empresa té les seves sales pròpies — privacitat absoluta per a les teves converses que importen.\"",
                    body1: "Cada espai de 160 m² o superior inclou possibilitat de configurar zones de reunió privades. Personalitzes el layout, tu decideixes quantes sales vols i de quina mida.",
                    body2: "Per a espais de 480 m² (planta completa), disponibilitat de fins a 4 sales de reunions independents, sala de presentacions i zona de benvinguda client pròpia."
                },
                specs: {
                    overline: 'Detalls Tècnics',
                    s1: { label: "L'HORARI", title: 'Accés Total', body: "L'accés a les instal·lacions és il·limitat — el teu espai és teu les 24 hores. No depens dels horaris d'obertura d'un coworking." },
                    s2: { label: 'EL CONTRACTE', title: "Des d'1 Any", body: "Contractes de lloguer d'1 any mínim amb opcions de renovació. Estabilitat per al teu equip, flexibilitat per a la teva empresa a llarg termini." },
                    s3: { label: 'LA PERSONALITZACIÓ', title: 'El teu Disseny', body: "Distribuïu l'espai com vulgueu. Pintura, mobiliari, senyalística de marca. L'espai és un llenç en blanc que el teu equip pot fer seu." }
                },
                cta: {
                    overline: 'Parlem',
                    headline1: 'Parlem de', headline2: 'les teves necessitats.',
                    sub: "Cada empresa és diferent. Fes-nos saber quants sou, com treballeu i quan voleu entrar-hi.",
                    cta1: 'Sol·licitar Informació', cta2: 'Explorar Espais'
                }
            },

            /* ── contact.html ── */
            contact: {
                header: {
                    overline: 'Contacte',
                    headline1: 'La Conversa', headline2: 'comença aquí.',
                    sub: "Explica'ns les teves necessitats. Nosaltres t'expliquem si tenim l'espai que busques."
                },
                channels: {
                    phoneLabel: 'Telèfon', phoneHeading: 'Parla amb Nosaltres',
                    phoneHours: "Dilluns–Divendres: 9:00–18:00\nDissabte: 10:00–14:00",
                    emailLabel: 'Email', emailHeading: 'Escriu-nos',
                    emailNote: 'Resposta garantida en menys de 24h hàbils.',
                    visitLabel: 'Visita', visitHeading: "Vine a Veure'ns",
                    visitTransport: "FGC Les Fonts — 5 min a peu.\nAparcament gratuït per a visitants.",
                    visitLink: 'Indicacions detallades →'
                },
                form: {
                    overline: 'Formulari',
                    headline1: "Envia'ns", headline2: 'un missatge.',
                    sub: "Omple el formulari i ens posarem en contacte amb tu el més aviat possible. Tots els camps marcats amb * són obligatoris.",
                    nameLabel: 'Nom complet *', emailLabel: 'Email *',
                    phoneLabel: 'Telèfon', companyLabel: 'Empresa',
                    spaceLabel: "Tipus d'espai", spaceOpt0: 'Selecciona una opció',
                    spaceOpt1: 'Oficina petita (160 m²)', spaceOpt2: 'Oficina mitjana (240 m²)', spaceOpt3: 'Oficina gran (480 m²)',
                    budgetLabel: 'Pressupost mensual', budgetOpt0: 'Selecciona un rang', budgetOpt4: 'Més de 3.000€',
                    messagePlaceholder: "Explica'ns les teves necessitats...",
                    privacyHtml: 'Accepto la <a href="privacy-policy.html" class="text-primary hover:underline">política de privacitat</a> i el tractament de les meves dades personals *',
                    newsletter: 'Vull rebre informació sobre ofertes i novetats de RealBrave',
                    submit: 'Enviar Missatge', sending: 'Enviant…',
                    successMsg: 'Missatge enviat correctament. Ens posarem en contacte amb tu aviat.',
                    errorMsg: 'Hi ha hagut un error enviant el missatge. Si us plau, torna-ho a intentar.',
                    validationMsg: 'Si us plau, omple tots els camps obligatoris.'
                },
                hours: {
                    overline: 'Horaris',
                    headline1: 'Quan', headline2: 'trobar-nos.',
                    monFri: 'Dilluns – Divendres', saturday: 'Dissabte', sunday: 'Diumenge',
                    closed: 'Tancat',
                    note: "Podem organitzar visites fora d'horari prèvia cita. Escriu-nos i ho coordinem."
                },
                howTo: {
                    overline: 'Com Arribar',
                    headline1: 'On', headline2: 'som.',
                    addressHeading: 'Adreça',
                    transportHeading: 'Transport públic',
                    transportBody: "FGC Les Fonts — 5 minuts a peu\nAutobús línies 1, 4, 7",
                    parkingHeading: 'Aparcament',
                    parkingBody: "Aparcament privat gratuït per a visitants. Accés directe des de la carretera de Rubí.",
                    mapLink: 'Veure mapa i indicacions →'
                },
                faq: {
                    overline: 'FAQ',
                    headline1: 'Preguntes', headline2: 'habituals.',
                    q1: 'Quin és el contracte mínim de lloguer?',
                    a1: "Contractes d'1 any mínim, amb opcions de renovació anual. No treballem amb contractes mensuals — som l'espai d'empreses que planifiquen amb horitzó, no coworkings de pas.",
                    q2: 'Què inclou exactament el preu del lloguer?',
                    a2: "Fibra òptica d'alta velocitat, climatització independent, seguretat 24/7, neteja de zones comunes, manteniment i recepció virtual. Cap cost amagat: el que veus és el que pagues.",
                    q3: 'Puc visitar les instal·lacions abans de decidir?',
                    a3: "Sempre. Fem visites guiades de dilluns a divendres, sense compromís. Truca'ns, escriu-nos o contacta per WhatsApp — acordem una hora que et vagi bé.",
                    q4: "Hi ha places d'aparcament disponibles?",
                    a4: "Sí. 25+ places d'aparcament privatiu per a empreses inquilines i els seus visitants. Les places s'assignen en el moment de signar el contracte.",
                    q5: "Puc personalitzar l'espai?",
                    a5: "Absolutament. Distribució lliure, pintura i identitat visual, mobiliari propi o subministrat per nosaltres. T'acompanyem en el procés perquè l'espai acabi semblant-se a vosaltres."
                },
                cta: {
                    overline: 'Proper Pas',
                    headline1: 'Programa una', headline2: 'visita privada.',
                    sub: "Res no substitueix veure l'espai en persona. Truca'ns, escriu-nos o vine directament.",
                    ctaWa: 'Contactar per WhatsApp'
                }
            },

            /* ── location.html ── */
            location: {
                overline: 'Ubicació', headline1: 'Trenta Minuts', headline2: 'de Barcelona.',
                sub: "Carretera de Rubí, 292 — Terrassa. FGC Les Fonts a 5 minuts a peu. Aparcament privatiu inclòs.",
                stat1: 'de Barcelona en cotxe', stat2: 'a peu del FGC Les Fonts',
                stat3: "Places d'aparcament", stat4: 'Accés directe AP-7 i C-58',
                addrOverline: "L'Adreça", addrH1: 'Al Centre', addrH2: 'de Tot.',
                addrRow1: 'Adreça exacta', addrRow2: 'Temps a Barcelona',
                addrRow2Body: '30 minuts en cotxe · 45 minuts en transport públic',
                addrRow3: 'Accessos per carretera',
                addrRow3Body: "Connexió directa amb AP-7 i C-58. Sortida senyalitzada des d'ambdues vies.",
                addrMapLink: 'Obrir a Google Maps →',
                transOverline: 'Connexions',
                transLbl1: 'EN COTXE', transLbl2: 'FGC', transLbl3: 'AUTOBÚS', transLbl4: 'AEROPORT',
                dirOverline: 'Indicacions', dirH1: 'Com', dirH2: 'arribar-hi.',
                dirSub: "Des de Barcelona per carretera o en transport públic — les dues opcions estan a menys d'una hora.",
                dirCar: 'Des de Barcelona — En Cotxe (31 min)',
                dirPublic: 'Transport Públic (1h 12 min)',
                nearbyOverline: "L'Entorn", nearbyH1: 'Serveis', nearbyH2: 'a prop.',
                nearbySub: "Tot el que el teu equip necessita per al dia a dia, a pocs minuts a peu o en cotxe.",
                nearbyFoodLbl: 'Gastronomia', nearbyFoodTitle: 'Restaurants i Cafès',
                nearbyServicesLbl: 'Serveis', nearbyServicesTitle: 'Bancs i Farmàcies',
                nearbyFitnessLbl: 'Benestar', nearbyFitnessTitle: 'Fitness i Gimnasos',
                infraOverline: 'Infraestructura',
                parkingLbl: 'APARCAMENT', parkingTitle: 'Privatiu i Cobert',
                accessLbl: 'ACCESSIBILITAT', accessTitle: 'Universal i Inclusiu',
                ctaOverline: 'Visita', ctaH1: 'Vine a descobrir', ctaH2: 'la ubicació.',
                ctaSub: "Programa una visita per veure de primera mà les avantatges de la nostra ubicació estratègica — i l'espai que podria ser el vostre.",
                ctaBtn1: 'Programa una Visita', ctaBtn2: 'Veure els Espais'
            },

            /* ── comunitat.html ── */
            comunitat: {
                heroTitle: "Uneix-te a la Nostra Comunitat",
                heroSubtitle: "Rep oportunitats abans que ningú i segueix l'avenç de la transformació de l'edifici.",
                benefitsTitle: 'Què obtindràs?',
                b1Title: 'Alertes de noves oportunitats',
                b1Body: 'Sigues el primer en saber quan hi ha noves propietats disponibles.',
                b2Title: 'Baixades de preu i disponibilitat',
                b2Body: 'Rebràs notificacions immediates de canvis de preu i disponibilitat.',
                b3Title: 'Preferències a mida',
                b3Body: 'Filtra per zona, pressupost i tipus d\'immoble segons les teves necessitats.',
                b4Title: 'Actualitzacions setmanals',
                b4Body: "Segueix l'avenç de la transformació del projecte amb informes regulars.",
                formTitle: "Registra't ara",
                formSubtitle: 'Completa el formulari i comença a rebre oportunitats exclusives.',
                emailLabel: 'Email *', nameLabel: 'Nom',
                intentLabel: 'Què busques? *', intentOpt0: 'Selecciona una opció',
                intentOpt1: 'Compra', intentOpt2: 'Lloguer', intentOpt3: 'Inversió',
                zonesLabel: "Zones d'interès",
                budgetMinLabel: 'Pressupost mínim (€)', budgetMaxLabel: 'Pressupost màxim (€)',
                propertyLabel: "Tipus d'immoble",
                weeklyUpdates: "Rep alertes setmanals del avenç de la transformació del edifici",
                consentLabel: 'Accepto rebre comunicacions relacionades amb aquest projecte *',
                submitBtn: "Uneix-te a la comunitat", submitLoading: 'Processant...',
                successTitle: 'Ja estàs dins!',
                backLink: "Torna a l'inici",
                footerRights: 'Tots els drets reservats.',
                footerPrivacy: 'Política de Privacitat', footerLegal: 'Avís Legal',
                footerCookies: 'Política de Cookies'
            },

            /* ── legal pages ── */
            legal: {
                cookieTitle: 'Política de Cookies',
                legalNoticeTitle: 'Avís Legal',
                privacyTitle: 'Política de Privacitat',
                backLink: 'Tornar al lloc web'
            },
            newsletter: {
                text: 'Sigues el primer a conèixer disponibilitat, ofertes i novetats de RealBrave.',
                submit: "Subscriure'm",
                sending: 'Enviant…',
                successTitle: 'Gràcies!',
                successText: 'Rebràs les nostres novetats a la teva bústia.',
                validation: 'Si us plau, completa tots els camps.',
                error: 'Hi ha hagut un error. Torna-ho a intentar.'
            }
        },

        /* ── SPANISH ──────────────────────────────────────────────────── */
        es: {
            nav: { home: 'Inicio', building: 'El Edificio', spaces: 'Espacios', amenities: 'Servicios', location: 'Ubicación', contact: 'Contacto' },
            footer: {
                description: 'Espacios de oficina en Terrassa para empresas con ambición.',
                nav: 'Navegación', contact: 'Contacto', legal: 'Legal',
                privacy: 'Política de Privacidad', cookies: 'Política de Cookies',
                legalNotice: 'Aviso Legal', rights: 'Todos los derechos reservados.'
            },
            whatsapp: {
                tooltip: 'Contáctanos por WhatsApp',
                default: '¡Hola! Me gustaría recibir información sobre los espacios de oficina en RealBrave.',
                building: '¡Hola! Me gustaría programar una visita a RealBrave para ver los espacios de oficina disponibles.',
                spaces: '¡Hola! Me gustaría saber más sobre los espacios de oficina disponibles en RealBrave.',
                amenities: '¡Hola! Me gustaría saber más sobre los servicios incluidos en el alquiler de oficinas en RealBrave.',
                contact: '¡Hola! Me gustaría programar una visita a RealBrave para ver los espacios de oficina disponibles.'
            },
            pageTitles: {
                index: 'Espacios de Oficina Premium en Terrassa',
                building: 'El Edificio — RealBrave',
                spaces: 'Espacios — RealBrave',
                amenities: 'Servicios — RealBrave',
                location: 'Ubicación — RealBrave',
                contact: 'Contacto — RealBrave',
                comunitat: 'Comunidad — RealBrave',
                cookies: 'Política de Cookies — RealBrave',
                legalNotice: 'Aviso Legal — RealBrave',
                privacy: 'Política de Privacidad — RealBrave'
            },
            hero: {
                overline: 'Terrassa — 2026',
                headline1: 'La oficina ha muerto.',
                headline2: 'Viva el lugar de trabajo.',
                sub: 'RealBrave. Un espacio de referencia en el corazón de Terrassa, diseñado para inspirar presencia, fomentar la colaboración y proyectar prestigio.',
                cta1: 'Solicitar Visita',
                cta2: 'Explorar Espacios',
            },
            manifesto: {
                overline: 'La Filosofía',
                headline1: 'Un Destino,',
                headline2: 'No una Obligación.',
                body: 'Las empresas no necesitan mesas; necesitan un ancla cultural. Hemos construido RealBrave alrededor de la experiencia sensorial humana. Un ecosistema donde la concentración profunda coexiste naturalmente con el impulso colectivo.',
                pullquote1: 'Un espacio al que tu equipo elegirá ir,',
                pullquote2: 'no tendrá que ir.',
            },
            specs: {
                overline: 'Las Especificaciones',
                s1: { label: 'LA ATMÓSFERA', title: 'Climatización Integral', body: 'Control total de temperatura, humedad y calidad del aire en todas las plantas. La energía cognitiva de tu equipo, protegida por diseño.' },
                s2: { label: 'LA CONECTIVIDAD', title: 'Fibra Simétrica', body: 'Alta velocidad con redundancia integrada. Tu equipo trabaja sin interrupciones, en local o en remoto, sin compromiso de rendimiento.' },
                s3: { label: 'LA SEGURIDAD', title: 'Acceso y Control 24/7', body: 'Acceso ininterrumpido, control de entrada y aparcamiento propio. Tu foco en el trabajo; la seguridad, nuestra responsabilidad.' },
            },
            canvas: {
                overline: 'El Canvas',
                headline1: 'Tres Plantas.',
                headline2: 'Un Lienzo en Blanco.',
                body: 'Cada planta ofrece 480 m² sin condiciones. Alquilas la superficie; tú decides la historia que cuenta.',
                cta: 'Explorar los Espacios →',
            },
            ecosystem: {
                overline: 'El Ecosistema',
                headline1: 'Diseñado',
                headline2: 'para los que lo Habitan.',
                cta: 'Ver todos los Servicios →',
                items: [
                    { label: 'El Vestíbulo', body: 'Primera impresión de presencia. El espacio común gestionado por RealBrave establece el tono para tus clientes y visitas desde la entrada.' },
                    { label: 'El Aparcamiento', body: 'Amplio aparcamiento privado adyacente al edificio. Movilidad sin fricción para todo el equipo, cada día.' },
                    { label: 'Las Zonas Verdes', body: 'Entorno rodeado de vegetación y naturaleza. Momentos de desconexión a pie del edificio, sin salir del campus.' },
                    { label: 'Las Salas de Reuniones', body: 'Configuradas por cada inquilino dentro de su espacio. Zonas de deliberación integradas, no compartidas ni reservables por horas.' },
                ],
            },
            available: {
                overline: 'Disponibilidad',
                headline: 'Formatos Disponibles',
                f1: { label: 'Planta 1 — Área A', detail: '160 m² · 12–18 personas · Disponible' },
                f2: { label: 'Planta 1 — Completa', detail: '480 m² · 40–60 personas · Disponible' },
                f3: { label: 'Planta 2 — Área A', detail: '240 m² · 20–30 personas · Disponible' },
                f4: { label: 'Planta 2 — Área B', detail: '240 m² · 20–30 personas · Pre-alquilada' },
                f5: { label: 'Planta 3', detail: '480 m² · 40–60 personas · Disponible' },
                cta1: 'Solicitar una Visita Privada',
                cta2: 'Contáctanos',
            },
            building: {
                header: {
                    overline: 'El Edificio',
                    headline1: 'Arquitectura', headline2: 'como Filosofía.',
                    sub: '2.500 m² de superficie distribuidos en tres plantas. Renovado en 2026. Diseñado para durar décadas.'
                },
                stats: {
                    totalSqm: 'm² totales', floors: 'Plantas de oficina',
                    renovation: 'Año de renovación', parking: 'Plazas de aparcamiento'
                },
                distribution: {
                    overline: 'La Distribución',
                    headline1: 'Cuatro niveles.', headline2: 'Una sola visión.',
                    body: 'Cada planta es un lienzo en blanco. Tú defines cómo se explica tu historia.',
                    pb: { title: 'Planta Baja — El Vestíbulo', body: 'Recepción y lobby de entrada gestionados por RealBrave. Control de acceso, ascensores y zonas comunes. La primera impresión de cada cliente que llega.' },
                    p1: { title: 'Primera Planta — 480 m²', body: 'Disponible en configuración de área única (480 m²) o dividida en áreas de 160–240 m². Distribución, estilo y acabados: a elección de la empresa inquilina.' },
                    p2: { title: 'Segunda Planta — 480 m²', body: 'Parcialmente ocupada. Área B pre-alquilada a empresa establecida. Área A (240 m²) disponible. Excelente para equipos que valoran la tranquilidad y la concentración.' },
                    p3: { title: 'Tercera Planta — 480 m²', body: 'Planta íntegramente disponible. Vistas abiertas, máxima luminosidad natural. La opción premium para empresas que buscan representatividad absoluta.' }
                },
                infra: {
                    overline: 'Las Infraestructuras',
                    s1: { label: 'LA SEGURIDAD', title: 'Control Avanzado 24/7', body: 'Sistema de videovigilancia y control de acceso por tarjeta. Protección permanente sin interferir en el ritmo diario de las empresas inquilinas.' },
                    s2: { label: 'LA CONECTIVIDAD', title: 'Fibra Óptica Directa', body: 'Infraestructura de fibra de alta velocidad preparada para cada planta. Cobertura WiFi integral para una conectividad sin puntos ciegos ni cortes.' },
                    s3: { label: 'LA EFICIENCIA', title: 'Iluminación LED', body: 'Sistemas de iluminación de alta eficiencia energética en todas las zonas comunes. Menos costes de operación, mejor entorno de trabajo.' }
                },
                cta: {
                    overline: 'Visita',
                    headline1: '¿Quieres ver el edificio', headline2: 'en persona?',
                    sub: 'Programa una visita guiada y descubre todos los detalles. Disponible de lunes a viernes.',
                    cta1: 'Solicitar Visita Privada', cta2: 'Ver los Espacios'
                }
            },
            spaces: {
                header: {
                    overline: 'Espacios',
                    headline1: 'El Lienzo', headline2: 'es Vuestro.',
                    sub: 'Tres formatos de planta. Siete unidades disponibles. Cada una un punto de partida — no un producto acabado.'
                },
                formats: {
                    overline: 'Los Formatos',
                    f1: { label: 'PEQUEÑO', capacity: '8–15 personas', body: 'El espacio ideal para equipos que necesitan privacidad total sin renunciar a las dimensiones. Layout abierto o parcelado — tú decides.', priceSuffix: '/mes' },
                    f2: { label: 'MEDIANO', capacity: '15–25 personas', body: 'La proporción perfecta para empresas en crecimiento. Espacio suficiente para zonas diferenciadas — trabajo concentrado, colaboración, reuniones.', priceSuffix: '/mes' },
                    f3: { label: 'COMPLETO', capacity: '25–50 personas', body: 'Una planta entera, exclusivamente para vosotros. Zona de recepción propia, hasta 4 salas de reuniones, sala de presentaciones. Representatividad total.', priceSuffix: '/mes' }
                },
                availability: {
                    overline: 'Disponibilidad — Junio 2026',
                    colUnit: 'Unidad', colArea: 'Superficie', colTeam: 'Equipo', colPrice: 'Precio/mes', colStatus: 'Estado',
                    r1: { title: '1ª Planta — Área A', sub: 'Primera planta · Sección A' },
                    r2: { title: '1ª Planta — Completa', sub: 'Primera planta · 480 m² íntegros' },
                    r3: { title: '2ª Planta — Área A', sub: 'Segunda planta · Sección A' },
                    r4: { title: '2ª Planta — Área B', sub: 'Segunda planta · Sección B' },
                    r5: { title: '3ª Planta — Área A', sub: 'Tercera planta · Sección A' },
                    r6: { title: '3ª Planta — Área B', sub: 'Tercera planta · Sección B' },
                    r7: { title: '3ª Planta — Completa', sub: 'Tercera planta · 480 m² íntegros' },
                    available: 'Disponible', preLeased: 'Pre-alquilada', comingSoon: 'Disponible Pronto',
                    moreInfo: 'Más Info', cta1: 'Solicitar Visita', cta2: 'Ver Servicios Incluidos'
                },
                customisation: {
                    overline: 'Personalización',
                    headline1: 'Tu Espacio,', headline2: 'tu Marca.',
                    sub: 'No entregamos oficinas estandarizadas. Entregamos metros cuadrados y te acompañamos para que los conviertas en el reflejo de tu empresa.',
                    c1: { title: 'Distribución Libre', body: 'Modifica la distribución del espacio a tu conveniencia. Open space, cabinas, salas cerradas, zonas de descanso — cualquier combinación es posible.' },
                    c2: { title: 'Identidad Visual', body: 'Aplica la paleta de colores de tu marca. Vinilos, señalética y elementos de identidad corporativa bienvenidos. El espacio debe decir quiénes sois.' },
                    c3: { title: 'Mobiliario a Elección', body: 'Traéis vuestro mobiliario o lo suministramos nosotros. Escritorios, sillas ergonómicas, armarios, mamparas — todo coordinado con vuestro estilo.' },
                    c4: { title: 'Punto de Venta / Recepción', body: 'Para plantas completas, posibilidad de configurar una zona de recepción o de atención al cliente en la entrada. La primera impresión de vuestros visitantes, en vuestras manos.' }
                }
            },
            amenities: {
                header: {
                    overline: 'Servicios',
                    headline1: 'Todo Incluido.', headline2: 'Sin Sorpresas.',
                    sub: 'Una cuota mensual. Sin coste oculto. Todo lo que tu equipo necesita para trabajar desde el primer día.'
                },
                included: {
                    overline: 'Lo que Incluye',
                    headline1: 'Incluido en tu', headline2: 'espacio.',
                    sub: 'No somos un coworking. Cada empresa tiene su propio espacio, sus propias llaves, su propio carácter.',
                    i1: { title: 'Conectividad sin Límites', body: 'Fibra óptica de alta velocidad y cobertura WiFi integral para toda la planta. La conexión que necesitas para videoconferencias, carga de archivos y trabajo simultáneo de todo el equipo — sin interrupciones.' },
                    i2: { title: 'Seguridad Permanente', body: 'Videovigilancia y control de acceso por tarjeta las 24 horas, 365 días al año. Tu equipo entra con su credencial. Nadie más.' },
                    i3: { title: 'Climatización Integral', body: 'Sistema de climatización independiente para cada espacio. Temperatura a elección de la empresa inquilina. Calefacción en invierno, aire acondicionado en verano — incluido en el alquiler.' },
                    i4: { title: 'Aparcamiento Privativo', body: '25+ plazas de aparcamiento exclusivo para empresas inquilinas y sus visitantes. El único complejo de oficinas de la zona con aparcamiento cubierto integrado.' },
                    i5: { title: 'Recepción Virtual', body: 'Servicio de recepción virtual para gestión de paquetería, anuncio de visitas y atención personalizada. Una presencia profesional desde el primer momento, sin necesidad de recepcionista propia.' },
                    i6: { title: 'Mantenimiento y Limpieza', body: 'Mantenimiento de zonas comunes y limpieza periódica incluida. Gestión de incidencias técnicas por parte de RealBrave. Tú te concentras en tu negocio.' }
                },
                meetings: {
                    overline: 'Salas de Reuniones',
                    headline1: 'Tu Cliente', headline2: 'nunca compartido.',
                    quote: '"No ofrecemos salas de reuniones compartidas. Cada empresa tiene sus propias salas — privacidad absoluta para tus conversaciones que importan."',
                    body1: 'Cada espacio de 160 m² o superior incluye posibilidad de configurar zonas de reunión privadas. Personalizas el layout, tú decides cuántas salas quieres y de qué tamaño.',
                    body2: 'Para espacios de 480 m² (planta completa), disponibilidad de hasta 4 salas de reuniones independientes, sala de presentaciones y zona de bienvenida de cliente propia.'
                },
                specs: {
                    overline: 'Detalles Técnicos',
                    s1: { label: 'EL HORARIO', title: 'Acceso Total', body: 'El acceso a las instalaciones es ilimitado — tu espacio es tuyo las 24 horas. No dependes de los horarios de apertura de un coworking.' },
                    s2: { label: 'EL CONTRATO', title: 'Desde 1 Año', body: 'Contratos de alquiler de 1 año mínimo con opciones de renovación. Estabilidad para tu equipo, flexibilidad para tu empresa a largo plazo.' },
                    s3: { label: 'LA PERSONALIZACIÓN', title: 'Tu Diseño', body: 'Distribuir el espacio como queráis. Pintura, mobiliario, señalética de marca. El espacio es un lienzo en blanco que tu equipo puede hacer suyo.' }
                },
                cta: {
                    overline: 'Hablemos',
                    headline1: 'Hablemos de', headline2: 'tus necesidades.',
                    sub: 'Cada empresa es diferente. Cuéntanos cuántos sois, cómo trabajáis y cuándo queréis entrar.',
                    cta1: 'Solicitar Información', cta2: 'Explorar Espacios'
                }
            },
            contact: {
                header: {
                    overline: 'Contacto',
                    headline1: 'La Conversación', headline2: 'empieza aquí.',
                    sub: 'Cuéntanos tus necesidades. Nosotros te decimos si tenemos el espacio que buscas.'
                },
                channels: {
                    phoneLabel: 'Teléfono', phoneHeading: 'Habla con Nosotros',
                    phoneHours: 'Lunes–Viernes: 9:00–18:00\nSábado: 10:00–14:00',
                    emailLabel: 'Email', emailHeading: 'Escríbenos',
                    emailNote: 'Respuesta garantizada en menos de 24h hábiles.',
                    visitLabel: 'Visita', visitHeading: 'Ven a Vernos',
                    visitTransport: 'FGC Les Fonts — 5 min a pie.\nAparcamiento gratuito para visitantes.',
                    visitLink: 'Instrucciones detalladas →'
                },
                form: {
                    overline: 'Formulario',
                    headline1: 'Envíanos', headline2: 'un mensaje.',
                    sub: 'Rellena el formulario y nos pondremos en contacto contigo lo antes posible. Todos los campos marcados con * son obligatorios.',
                    nameLabel: 'Nombre completo *', emailLabel: 'Email *',
                    phoneLabel: 'Teléfono', companyLabel: 'Empresa',
                    spaceLabel: 'Tipo de espacio', spaceOpt0: 'Selecciona una opción',
                    spaceOpt1: 'Oficina pequeña (160 m²)', spaceOpt2: 'Oficina mediana (240 m²)', spaceOpt3: 'Oficina grande (480 m²)',
                    budgetLabel: 'Presupuesto mensual', budgetOpt0: 'Selecciona un rango', budgetOpt4: 'Más de 3.000€',
                    messagePlaceholder: 'Cuéntanos tus necesidades...',
                    privacyHtml: 'Acepto la <a href="privacy-policy.html" class="text-primary hover:underline">política de privacidad</a> y el tratamiento de mis datos personales *',
                    newsletter: 'Quiero recibir información sobre ofertas y novedades de RealBrave',
                    submit: 'Enviar Mensaje', sending: 'Enviando…',
                    successMsg: 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.',
                    errorMsg: 'Ha habido un error al enviar el mensaje. Por favor, inténtalo de nuevo.',
                    validationMsg: 'Por favor, rellena todos los campos obligatorios.'
                },
                hours: {
                    overline: 'Horarios',
                    headline1: 'Cuándo', headline2: 'encontrarnos.',
                    monFri: 'Lunes – Viernes', saturday: 'Sábado', sunday: 'Domingo',
                    closed: 'Cerrado',
                    note: 'Podemos organizar visitas fuera de horario previa cita. Escríbenos y lo coordinamos.'
                },
                howTo: {
                    overline: 'Cómo Llegar',
                    headline1: 'Dónde', headline2: 'estamos.',
                    addressHeading: 'Dirección',
                    transportHeading: 'Transporte público',
                    transportBody: 'FGC Les Fonts — 5 minutos a pie\nAutobús líneas 1, 4, 7',
                    parkingHeading: 'Aparcamiento',
                    parkingBody: 'Aparcamiento privado gratuito para visitantes. Acceso directo desde la carretera de Rubí.',
                    mapLink: 'Ver mapa e instrucciones →'
                },
                faq: {
                    overline: 'FAQ',
                    headline1: 'Preguntas', headline2: 'frecuentes.',
                    q1: '¿Cuál es el contrato mínimo de alquiler?',
                    a1: 'Contratos de 1 año mínimo, con opciones de renovación anual. No trabajamos con contratos mensuales — somos el espacio de empresas que planifican con horizonte, no coworkings de paso.',
                    q2: '¿Qué incluye exactamente el precio del alquiler?',
                    a2: 'Fibra óptica de alta velocidad, climatización independiente, seguridad 24/7, limpieza de zonas comunes, mantenimiento y recepción virtual. Sin coste oculto: lo que ves es lo que pagas.',
                    q3: '¿Puedo visitar las instalaciones antes de decidir?',
                    a3: 'Siempre. Hacemos visitas guiadas de lunes a viernes, sin compromiso. Llámanos, escríbenos o contacta por WhatsApp — acordamos una hora que te venga bien.',
                    q4: '¿Hay plazas de aparcamiento disponibles?',
                    a4: 'Sí. 25+ plazas de aparcamiento privativo para empresas inquilinas y sus visitantes. Las plazas se asignan en el momento de firmar el contrato.',
                    q5: '¿Puedo personalizar el espacio?',
                    a5: 'Absolutamente. Distribución libre, pintura e identidad visual, mobiliario propio o suministrado por nosotros. Te acompañamos en el proceso para que el espacio acabe pareciéndose a vosotros.'
                },
                cta: {
                    overline: 'Próximo Paso',
                    headline1: 'Programa una', headline2: 'visita privada.',
                    sub: 'Nada sustituye ver el espacio en persona. Llámanos, escríbenos o ven directamente.',
                    ctaWa: 'Contactar por WhatsApp'
                }
            },
            location: {
                overline: 'Ubicación', headline1: 'Treinta Minutos', headline2: 'de Barcelona.',
                sub: "Carretera de Rubí, 292 — Terrassa. FGC Les Fonts a 5 minutos a pie. Aparcamiento privativo incluido.",
                stat1: 'de Barcelona en coche', stat2: 'a pie de FGC Les Fonts',
                stat3: 'Plazas de aparcamiento', stat4: 'Acceso directo AP-7 y C-58',
                addrOverline: 'La Dirección', addrH1: 'En el Centro', addrH2: 'de Todo.',
                addrRow1: 'Dirección exacta', addrRow2: 'Tiempo a Barcelona',
                addrRow2Body: '30 minutos en coche · 45 minutos en transporte público',
                addrRow3: 'Accesos por carretera',
                addrRow3Body: "Conexión directa con AP-7 y C-58. Salida señalizada desde ambas vías.",
                addrMapLink: 'Abrir en Google Maps →',
                transOverline: 'Conexiones',
                transLbl1: 'EN COCHE', transLbl2: 'FGC', transLbl3: 'AUTOBÚS', transLbl4: 'AEROPUERTO',
                dirOverline: 'Indicaciones', dirH1: 'Cómo', dirH2: 'llegar.',
                dirSub: "Desde Barcelona por carretera o en transporte público — las dos opciones están a menos de una hora.",
                dirCar: 'Desde Barcelona — En Coche (31 min)',
                dirPublic: 'Transporte Público (1h 12 min)',
                nearbyOverline: 'El Entorno', nearbyH1: 'Servicios', nearbyH2: 'cerca.',
                nearbySub: "Todo lo que tu equipo necesita para el día a día, a pocos minutos a pie o en coche.",
                nearbyFoodLbl: 'Gastronomía', nearbyFoodTitle: 'Restaurantes y Cafés',
                nearbyServicesLbl: 'Servicios', nearbyServicesTitle: 'Bancos y Farmacias',
                nearbyFitnessLbl: 'Bienestar', nearbyFitnessTitle: 'Fitness y Gimnasios',
                infraOverline: 'Infraestructura',
                parkingLbl: 'APARCAMIENTO', parkingTitle: 'Privativo y Cubierto',
                accessLbl: 'ACCESIBILIDAD', accessTitle: 'Universal e Inclusivo',
                ctaOverline: 'Visita', ctaH1: 'Ven a descubrir', ctaH2: 'la ubicación.',
                ctaSub: "Programa una visita para ver de primera mano las ventajas de nuestra ubicación estratégica — y el espacio que podría ser el vuestro.",
                ctaBtn1: 'Programar una Visita', ctaBtn2: 'Ver los Espacios'
            },
            comunitat: {
                heroTitle: 'Únete a Nuestra Comunidad',
                heroSubtitle: 'Recibe oportunidades antes que nadie y sigue el avance de la transformación del edificio.',
                benefitsTitle: '¿Qué obtendrás?',
                b1Title: 'Alertas de nuevas oportunidades',
                b1Body: 'Sé el primero en saber cuándo hay nuevas propiedades disponibles.',
                b2Title: 'Bajadas de precio y disponibilidad',
                b2Body: 'Recibirás notificaciones inmediatas de cambios de precio y disponibilidad.',
                b3Title: 'Preferencias a medida',
                b3Body: 'Filtra por zona, presupuesto y tipo de inmueble según tus necesidades.',
                b4Title: 'Actualizaciones semanales',
                b4Body: 'Sigue el avance de la transformación del proyecto con informes regulares.',
                formTitle: 'Regístrate ahora',
                formSubtitle: 'Completa el formulario y empieza a recibir oportunidades exclusivas.',
                emailLabel: 'Email *', nameLabel: 'Nombre',
                intentLabel: '¿Qué buscas? *', intentOpt0: 'Selecciona una opción',
                intentOpt1: 'Compra', intentOpt2: 'Alquiler', intentOpt3: 'Inversión',
                zonesLabel: 'Zonas de interés',
                budgetMinLabel: 'Presupuesto mínimo (€)', budgetMaxLabel: 'Presupuesto máximo (€)',
                propertyLabel: 'Tipo de inmueble',
                weeklyUpdates: 'Recibe alertas semanales del avance de la transformación del edificio',
                consentLabel: 'Acepto recibir comunicaciones relacionadas con este proyecto *',
                submitBtn: 'Únete a la comunidad', submitLoading: 'Procesando...',
                successTitle: '¡Ya estás dentro!',
                backLink: 'Volver al inicio',
                footerRights: 'Todos los derechos reservados.',
                footerPrivacy: 'Política de Privacidad', footerLegal: 'Aviso Legal',
                footerCookies: 'Política de Cookies'
            },
            legal: {
                cookieTitle: 'Política de Cookies',
                legalNoticeTitle: 'Aviso Legal',
                privacyTitle: 'Política de Privacidad',
                backLink: 'Volver al sitio web'
            },
            newsletter: {
                text: 'Sé el primero en conocer disponibilidad, ofertas y novedades de RealBrave.',
                submit: 'Suscribirme',
                sending: 'Enviando…',
                successTitle: '¡Gracias!',
                successText: 'Recibirás nuestras novedades en tu bandeja de entrada.',
                validation: 'Por favor, completa todos los campos.',
                error: 'Ha habido un error. Inténtalo de nuevo.'
            }
        },

        /* ── ENGLISH ──────────────────────────────────────────────────── */
        en: {
            nav: { home: 'Home', building: 'The Building', spaces: 'Spaces', amenities: 'Amenities', location: 'Location', contact: 'Contact' },
            footer: {
                description: 'Office spaces in Terrassa for ambitious companies.',
                nav: 'Navigation', contact: 'Contact', legal: 'Legal',
                privacy: 'Privacy Policy', cookies: 'Cookie Policy',
                legalNotice: 'Legal Notice', rights: 'All rights reserved.'
            },
            whatsapp: {
                tooltip: 'Contact us on WhatsApp',
                default: "Hi! I'd like to receive information about the office spaces at RealBrave.",
                building: "Hi! I'd like to schedule a visit to RealBrave to see the available office spaces.",
                spaces: "Hi! I'd like to learn more about the available office spaces at RealBrave.",
                amenities: "Hi! I'd like to learn more about the amenities included in the office rental at RealBrave.",
                contact: "Hi! I'd like to schedule a visit to RealBrave to see the available office spaces."
            },
            pageTitles: {
                index: 'Premium Office Spaces in Terrassa',
                building: 'The Building — RealBrave',
                spaces: 'Spaces — RealBrave',
                amenities: 'Amenities — RealBrave',
                location: 'Location — RealBrave',
                contact: 'Contact — RealBrave',
                comunitat: 'Community — RealBrave',
                cookies: 'Cookie Policy — RealBrave',
                legalNotice: 'Legal Notice — RealBrave',
                privacy: 'Privacy Policy — RealBrave'
            },
            hero: {
                overline: 'Terrassa — 2026',
                headline1: 'The office is dead.',
                headline2: 'Long live the workplace.',
                sub: 'RealBrave. A flagship workspace in the heart of Terrassa, architecturally designed to inspire presence, foster collaboration, and command prestige.',
                cta1: 'Request a Visit',
                cta2: 'Explore Spaces',
            },
            manifesto: {
                overline: 'The Philosophy',
                headline1: 'A Destination,',
                headline2: 'Not an Obligation.',
                body: "Companies don't just need desks; they need a cultural anchor. We built RealBrave around the human sensory experience. An ecosystem where deep focus coexists naturally with collective momentum.",
                pullquote1: 'A space your team will choose to come to,',
                pullquote2: 'not have to.',
            },
            specs: {
                overline: 'The Specifications',
                s1: { label: 'THE ATMOSPHERE', title: 'Integral Climate Control', body: "Full control of temperature, humidity, and air quality across all floors. Your team's cognitive energy, protected by design." },
                s2: { label: 'THE CONNECTIVITY', title: 'Symmetric Fibre', body: 'High speed with built-in redundancy. Your team works without interruption, on-site or remote, without performance compromise.' },
                s3: { label: 'THE SECURITY', title: '24/7 Access & Control', body: 'Uninterrupted access, controlled entry, and private parking. Your focus on the work; security is our responsibility.' },
            },
            canvas: {
                overline: 'The Canvas',
                headline1: 'Three Floors.',
                headline2: 'One Blank Canvas.',
                body: 'Each floor offers 480 m² without conditions. You lease the surface; you decide the story it tells.',
                cta: 'Explore the Spaces →',
            },
            ecosystem: {
                overline: 'The Ecosystem',
                headline1: 'Designed',
                headline2: 'for Those Who Live in It.',
                cta: 'See all Amenities →',
                items: [
                    { label: 'The Lobby', body: 'A first impression of presence. The common space managed by RealBrave sets the tone for your clients and visitors from the moment they arrive.' },
                    { label: 'The Parking', body: 'Ample private parking adjacent to the building. Frictionless mobility for the whole team, every day.' },
                    { label: 'The Green Spaces', body: 'Surrounded by vegetation and nature. Moments of disconnection steps from the building, without leaving the campus.' },
                    { label: 'The Meeting Rooms', body: 'Configured by each tenant within their own space. Deliberation zones that are integrated, not shared or bookable by the hour.' },
                ],
            },
            available: {
                overline: 'Availability',
                headline: 'Available Formats',
                f1: { label: 'Floor 1 — Area A', detail: '160 m² · 12–18 people · Available' },
                f2: { label: 'Floor 1 — Full', detail: '480 m² · 40–60 people · Available' },
                f3: { label: 'Floor 2 — Area A', detail: '240 m² · 20–30 people · Available' },
                f4: { label: 'Floor 2 — Area B', detail: '240 m² · 20–30 people · Pre-leased' },
                f5: { label: 'Floor 3', detail: '480 m² · 40–60 people · Available' },
                cta1: 'Request a Private Walkthrough',
                cta2: 'Contact Us',
            },
            building: {
                header: {
                    overline: 'The Building',
                    headline1: 'Architecture', headline2: 'as Philosophy.',
                    sub: '2,500 m² across three floors. Renovated in 2026. Built to last decades.'
                },
                stats: {
                    totalSqm: 'total m²', floors: 'Office floors',
                    renovation: 'Renovation year', parking: 'Parking spaces'
                },
                distribution: {
                    overline: 'The Layout',
                    headline1: 'Four levels.', headline2: 'One single vision.',
                    body: 'Each floor is a blank canvas. You define how your story is told.',
                    pb: { title: 'Ground Floor — The Lobby', body: 'Reception and entrance lobby managed by RealBrave. Access control, lifts and common areas. The first impression for every client who arrives.' },
                    p1: { title: 'First Floor — 480 m²', body: 'Available as a single-area layout (480 m²) or divided into areas of 160–240 m². Layout, style and finishes: the tenant company decides.' },
                    p2: { title: 'Second Floor — 480 m²', body: 'Partially occupied. Area B pre-leased to an established company. Area A (240 m²) available. Excellent for teams that value quiet and focus.' },
                    p3: { title: 'Third Floor — 480 m²', body: 'Fully available floor. Open views, maximum natural light. The premium option for companies seeking absolute prestige.' }
                },
                infra: {
                    overline: 'The Infrastructure',
                    s1: { label: 'THE SECURITY', title: 'Advanced 24/7 Control', body: 'CCTV and card-access control system. Permanent protection without disrupting the daily rhythm of tenant companies.' },
                    s2: { label: 'THE CONNECTIVITY', title: 'Direct Fibre Optic', body: 'High-speed fibre infrastructure ready for every floor. Full WiFi coverage for connectivity without blind spots or drops.' },
                    s3: { label: 'THE EFFICIENCY', title: 'LED Lighting', body: 'High energy-efficiency lighting systems across all common areas. Lower operating costs, better working environment.' }
                },
                cta: {
                    overline: 'Visit',
                    headline1: 'Want to see the building', headline2: 'in person?',
                    sub: 'Schedule a guided tour and discover all the details. Available Monday to Friday.',
                    cta1: 'Request a Private Tour', cta2: 'See the Spaces'
                }
            },
            spaces: {
                header: {
                    overline: 'Spaces',
                    headline1: 'The Canvas', headline2: 'is Yours.',
                    sub: 'Three floor formats. Seven units available. Each one a starting point — not a finished product.'
                },
                formats: {
                    overline: 'The Formats',
                    f1: { label: 'SMALL', capacity: '8–15 people', body: "The ideal space for teams that need complete privacy without sacrificing size. Open or partitioned layout — you decide.", priceSuffix: '/mo' },
                    f2: { label: 'MEDIUM', capacity: '15–25 people', body: 'The perfect fit for growing companies. Enough space for differentiated zones — focused work, collaboration, meetings.', priceSuffix: '/mo' },
                    f3: { label: 'FULL', capacity: '25–50 people', body: 'An entire floor, exclusively for you. Your own reception area, up to 4 meeting rooms, presentation suite. Total prestige.', priceSuffix: '/mo' }
                },
                availability: {
                    overline: 'Availability — June 2026',
                    colUnit: 'Unit', colArea: 'Area', colTeam: 'Team', colPrice: 'Price/mo', colStatus: 'Status',
                    r1: { title: '1st Floor — Area A', sub: 'First floor · Section A' },
                    r2: { title: '1st Floor — Full', sub: 'First floor · 480 m² full' },
                    r3: { title: '2nd Floor — Area A', sub: 'Second floor · Section A' },
                    r4: { title: '2nd Floor — Area B', sub: 'Second floor · Section B' },
                    r5: { title: '3rd Floor — Area A', sub: 'Third floor · Section A' },
                    r6: { title: '3rd Floor — Area B', sub: 'Third floor · Section B' },
                    r7: { title: '3rd Floor — Full', sub: 'Third floor · 480 m² full' },
                    available: 'Available', preLeased: 'Pre-leased', comingSoon: 'Coming Soon',
                    moreInfo: 'More Info', cta1: 'Request a Visit', cta2: 'See Included Amenities'
                },
                customisation: {
                    overline: 'Customisation',
                    headline1: 'Your Space,', headline2: 'Your Brand.',
                    sub: "We don't deliver standardised offices. We deliver square metres and guide you to make them a reflection of your company.",
                    c1: { title: 'Free Layout', body: "Modify the space layout to your convenience. Open plan, booths, closed rooms, rest areas — any combination is possible." },
                    c2: { title: 'Visual Identity', body: "Apply your brand colour palette. Vinyls, signage and corporate identity elements welcome. The space must say who you are." },
                    c3: { title: 'Furniture of Your Choice', body: "Bring your own furniture or we'll supply it. Desks, ergonomic chairs, storage, partitions — all coordinated with your style." },
                    c4: { title: 'Sales Point / Reception', body: "For full floors, option to set up a reception or client service area at the entrance. The first impression for your visitors, in your hands." }
                }
            },
            amenities: {
                header: {
                    overline: 'Amenities',
                    headline1: 'All Included.', headline2: 'No Surprises.',
                    sub: 'One monthly fee. No hidden costs. Everything your team needs to work from day one.'
                },
                included: {
                    overline: "What's Included",
                    headline1: 'Included in your', headline2: 'space.',
                    sub: "We're not a coworking space. Each company has its own space, its own keys, its own character.",
                    i1: { title: 'Unlimited Connectivity', body: 'High-speed fibre optic and full WiFi coverage across the entire floor. The connection you need for video calls, file uploads and simultaneous teamwork — without interruptions.' },
                    i2: { title: 'Permanent Security', body: 'CCTV and card access control 24 hours a day, 365 days a year. Your team enters with their credential. Nobody else.' },
                    i3: { title: 'Integral Climate Control', body: 'Independent climate control system for each space. Temperature chosen by the tenant company. Heating in winter, air conditioning in summer — included in the rent.' },
                    i4: { title: 'Private Parking', body: '25+ exclusive parking spaces for tenant companies and their visitors. The only office complex in the area with integrated covered parking.' },
                    i5: { title: 'Virtual Reception', body: 'Virtual reception service for parcel management, visitor announcements and personalised attention. A professional presence from day one, without the need for your own receptionist.' },
                    i6: { title: 'Maintenance & Cleaning', body: 'Common area maintenance and periodic cleaning included. Technical incident management by RealBrave. You focus on your business.' }
                },
                meetings: {
                    overline: 'Meeting Rooms',
                    headline1: 'Your Client', headline2: 'never shared.',
                    quote: '"We don\'t offer shared meeting rooms. Each company has its own — absolute privacy for the conversations that matter."',
                    body1: 'Every space of 160 m² or more includes the option to configure private meeting zones. You customise the layout, you decide how many rooms you want and their size.',
                    body2: 'For 480 m² spaces (full floor), up to 4 independent meeting rooms, a presentation suite and your own client welcome area.'
                },
                specs: {
                    overline: 'Technical Details',
                    s1: { label: 'THE SCHEDULE', title: 'Full Access', body: "Access to the premises is unlimited — your space is yours 24 hours a day. You don't depend on a coworking's opening hours." },
                    s2: { label: 'THE CONTRACT', title: 'From 1 Year', body: 'Minimum 1-year lease contracts with renewal options. Stability for your team, long-term flexibility for your company.' },
                    s3: { label: 'THE CUSTOMISATION', title: 'Your Design', body: 'Lay out the space as you wish. Paint, furniture, brand signage. The space is a blank canvas your team can make their own.' }
                },
                cta: {
                    overline: "Let's Talk",
                    headline1: "Let's talk about", headline2: 'your needs.',
                    sub: "Every company is different. Tell us how many you are, how you work and when you want to move in.",
                    cta1: 'Request Information', cta2: 'Explore Spaces'
                }
            },
            contact: {
                header: {
                    overline: 'Contact',
                    headline1: 'The Conversation', headline2: 'starts here.',
                    sub: "Tell us your needs. We'll tell you if we have the space you're looking for."
                },
                channels: {
                    phoneLabel: 'Phone', phoneHeading: 'Talk to Us',
                    phoneHours: 'Mon–Fri: 9:00–18:00\nSat: 10:00–14:00',
                    emailLabel: 'Email', emailHeading: 'Write to Us',
                    emailNote: 'Reply guaranteed within 24 business hours.',
                    visitLabel: 'Visit', visitHeading: 'Come See Us',
                    visitTransport: 'FGC Les Fonts — 5 min walk.\nFree parking for visitors.',
                    visitLink: 'Detailed directions →'
                },
                form: {
                    overline: 'Form',
                    headline1: 'Send us', headline2: 'a message.',
                    sub: "Fill in the form and we'll get back to you as soon as possible. All fields marked with * are required.",
                    nameLabel: 'Full name *', emailLabel: 'Email *',
                    phoneLabel: 'Phone', companyLabel: 'Company',
                    spaceLabel: 'Space type', spaceOpt0: 'Select an option',
                    spaceOpt1: 'Small office (160 m²)', spaceOpt2: 'Medium office (240 m²)', spaceOpt3: 'Large office (480 m²)',
                    budgetLabel: 'Monthly budget', budgetOpt0: 'Select a range', budgetOpt4: 'More than €3,000',
                    messagePlaceholder: 'Tell us your needs...',
                    privacyHtml: 'I accept the <a href="privacy-policy.html" class="text-primary hover:underline">privacy policy</a> and the processing of my personal data *',
                    newsletter: "I'd like to receive information about offers and news from RealBrave",
                    submit: 'Send Message', sending: 'Sending…',
                    successMsg: "Message sent successfully. We'll get back to you soon.",
                    errorMsg: 'There was an error sending the message. Please try again.',
                    validationMsg: 'Please fill in all required fields.'
                },
                hours: {
                    overline: 'Hours',
                    headline1: 'When', headline2: 'to find us.',
                    monFri: 'Monday – Friday', saturday: 'Saturday', sunday: 'Sunday',
                    closed: 'Closed',
                    note: 'We can arrange visits outside hours by appointment. Write to us and we\'ll coordinate.'
                },
                howTo: {
                    overline: 'How to Get Here',
                    headline1: 'Where', headline2: 'we are.',
                    addressHeading: 'Address',
                    transportHeading: 'Public transport',
                    transportBody: 'FGC Les Fonts — 5 min walk\nBus lines 1, 4, 7',
                    parkingHeading: 'Parking',
                    parkingBody: 'Free private parking for visitors. Direct access from Carretera de Rubí.',
                    mapLink: 'See map and directions →'
                },
                faq: {
                    overline: 'FAQ',
                    headline1: 'Frequently', headline2: 'asked.',
                    q1: 'What is the minimum rental contract?',
                    a1: "Minimum 1-year contracts, with annual renewal options. We don't work with monthly contracts — we're the space for companies that plan with a horizon, not pop-up coworkings.",
                    q2: 'What exactly is included in the rent?',
                    a2: "High-speed fibre optic, independent climate control, 24/7 security, common area cleaning, maintenance and virtual reception. No hidden costs: what you see is what you pay.",
                    q3: 'Can I visit the facilities before deciding?',
                    a3: "Always. We do guided tours Monday to Friday, no commitment. Call us, write to us or contact via WhatsApp — we'll arrange a time that works for you.",
                    q4: 'Are parking spaces available?',
                    a4: "Yes. 25+ private parking spaces for tenant companies and their visitors. Spaces are assigned at the time of signing the contract.",
                    q5: 'Can I customise the space?',
                    a5: "Absolutely. Free layout, paint and visual identity, your own furniture or supplied by us. We guide you through the process so the space ends up looking like you."
                },
                cta: {
                    overline: 'Next Step',
                    headline1: 'Schedule a', headline2: 'private visit.',
                    sub: "Nothing replaces seeing the space in person. Call us, write to us or come directly.",
                    ctaWa: 'Contact via WhatsApp'
                }
            },
            location: {
                overline: 'Location', headline1: 'Thirty Minutes', headline2: 'from Barcelona.',
                sub: "Carretera de Rubí, 292 — Terrassa. FGC Les Fonts 5 minutes on foot. Private parking included.",
                stat1: 'from Barcelona by car', stat2: 'walk from FGC Les Fonts',
                stat3: 'Parking spaces', stat4: 'Direct access AP-7 and C-58',
                addrOverline: 'The Address', addrH1: 'At the Centre', addrH2: 'of Everything.',
                addrRow1: 'Exact address', addrRow2: 'Time to Barcelona',
                addrRow2Body: '30 minutes by car · 45 minutes by public transport',
                addrRow3: 'Road access',
                addrRow3Body: "Direct connection to AP-7 and C-58. Signposted exit from both routes.",
                addrMapLink: 'Open in Google Maps →',
                transOverline: 'Connections',
                transLbl1: 'BY CAR', transLbl2: 'FGC', transLbl3: 'BUS', transLbl4: 'AIRPORT',
                dirOverline: 'Directions', dirH1: 'How', dirH2: 'to get here.',
                dirSub: "From Barcelona by road or public transport — both options are under an hour.",
                dirCar: 'From Barcelona — By Car (31 min)',
                dirPublic: 'Public Transport (1h 12 min)',
                nearbyOverline: 'The Area', nearbyH1: 'Services', nearbyH2: 'nearby.',
                nearbySub: "Everything your team needs day-to-day, just minutes away on foot or by car.",
                nearbyFoodLbl: 'Gastronomy', nearbyFoodTitle: 'Restaurants & Cafés',
                nearbyServicesLbl: 'Services', nearbyServicesTitle: 'Banks & Pharmacies',
                nearbyFitnessLbl: 'Wellness', nearbyFitnessTitle: 'Fitness & Gyms',
                infraOverline: 'Infrastructure',
                parkingLbl: 'PARKING', parkingTitle: 'Private & Covered',
                accessLbl: 'ACCESSIBILITY', accessTitle: 'Universal & Inclusive',
                ctaOverline: 'Visit', ctaH1: 'Come discover', ctaH2: 'the location.',
                ctaSub: "Schedule a visit to see firsthand the advantages of our strategic location — and the space that could be yours.",
                ctaBtn1: 'Schedule a Visit', ctaBtn2: 'See the Spaces'
            },
            comunitat: {
                heroTitle: 'Join Our Community',
                heroSubtitle: 'Receive opportunities ahead of everyone and follow the progress of the building transformation.',
                benefitsTitle: 'What will you get?',
                b1Title: 'New opportunity alerts',
                b1Body: 'Be the first to know when new properties become available.',
                b2Title: 'Price drops and availability',
                b2Body: 'You will receive immediate notifications of price and availability changes.',
                b3Title: 'Tailored preferences',
                b3Body: 'Filter by area, budget and property type according to your needs.',
                b4Title: 'Weekly updates',
                b4Body: 'Follow the progress of the project transformation with regular reports.',
                formTitle: 'Register now',
                formSubtitle: 'Complete the form and start receiving exclusive opportunities.',
                emailLabel: 'Email *', nameLabel: 'Name',
                intentLabel: 'What are you looking for? *', intentOpt0: 'Select an option',
                intentOpt1: 'Purchase', intentOpt2: 'Rental', intentOpt3: 'Investment',
                zonesLabel: 'Areas of interest',
                budgetMinLabel: 'Minimum budget (€)', budgetMaxLabel: 'Maximum budget (€)',
                propertyLabel: 'Property type',
                weeklyUpdates: 'Receive weekly alerts on the progress of the building transformation',
                consentLabel: 'I agree to receive communications related to this project *',
                submitBtn: 'Join the community', submitLoading: 'Processing...',
                successTitle: "You're in!",
                backLink: 'Back to home',
                footerRights: 'All rights reserved.',
                footerPrivacy: 'Privacy Policy', footerLegal: 'Legal Notice',
                footerCookies: 'Cookie Policy'
            },
            legal: {
                cookieTitle: 'Cookie Policy',
                legalNoticeTitle: 'Legal Notice',
                privacyTitle: 'Privacy Policy',
                backLink: 'Back to website'
            },
            newsletter: {
                text: 'Be the first to know about availability, offers, and news from RealBrave.',
                submit: 'Subscribe',
                sending: 'Sending…',
                successTitle: 'Thank you!',
                successText: 'You will receive our updates in your inbox.',
                validation: 'Please fill in all fields.',
                error: 'An error occurred. Please try again.'
            }
        }
    };

    /* ── ENGINE ───────────────────────────────────────────────────────── */
    let currentLanguage = (typeof localStorage !== 'undefined' && localStorage.getItem('smartplaces-language')) || 'cat';

    function getNestedValue(obj, path) {
        return path.split('.').reduce(function (cur, key) {
            if (cur == null) return undefined;
            return isNaN(key) ? cur[key] : cur[parseInt(key)];
        }, obj);
    }

    function updateContent() {
        var t = translations[currentLanguage];
        if (!t) return;

        /* textContent */
        document.querySelectorAll('[data-translate]').forEach(function (el) {
            var val = getNestedValue(t, el.getAttribute('data-translate'));
            if (val !== undefined && val !== null) el.textContent = val;
        });

        /* innerHTML (for elements that contain embedded HTML, e.g. links) */
        document.querySelectorAll('[data-translate-html]').forEach(function (el) {
            var val = getNestedValue(t, el.getAttribute('data-translate-html'));
            if (val !== undefined && val !== null) el.innerHTML = val;
        });

        /* placeholder attribute */
        document.querySelectorAll('[data-translate-placeholder]').forEach(function (el) {
            var val = getNestedValue(t, el.getAttribute('data-translate-placeholder'));
            if (val !== undefined && val !== null) el.placeholder = val;
        });

        /* page title */
        var page = document.body.getAttribute('data-page');
        if (page && t.pageTitles && t.pageTitles[page]) {
            document.title = t.pageTitles[page];
        }

        /* html lang attribute */
        document.documentElement.lang = currentLanguage === 'cat' ? 'ca' : currentLanguage;

        /* whatsapp tooltip (both id-based and class-based) */
        var waById = document.getElementById('whatsapp-tooltip-text');
        if (waById && t.whatsapp) waById.textContent = t.whatsapp.tooltip;
        var waByClass = document.querySelector('.whatsapp-tooltip');
        if (waByClass && t.whatsapp) waByClass.textContent = t.whatsapp.tooltip;
    }

    function updateLangButtons() {
        document.querySelectorAll('.language-selector').forEach(function (btn) {
            var isActive = btn.getAttribute('data-lang') === currentLanguage;
            if (btn.classList.contains('lang-btn')) {
                /* index.html style — uses CSS active class */
                btn.classList.toggle('active', isActive);
            } else {
                /* other pages — set full className */
                btn.className = isActive
                    ? 'language-selector text-xs px-2 py-1 rounded border border-primary text-primary font-medium'
                    : 'language-selector text-xs px-2 py-1 rounded border border-gray-200 text-gray-500';
            }
        });
    }

    function switchLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('smartplaces-language', lang);
        updateContent();
        updateLangButtons();
        document.dispatchEvent(new CustomEvent('rb:languageChanged', { detail: { lang: lang } }));
    }

    function init() {
        document.querySelectorAll('.language-selector').forEach(function (btn) {
            btn.addEventListener('click', function () {
                switchLanguage(btn.getAttribute('data-lang'));
            });
        });
        updateContent();
        updateLangButtons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ── PUBLIC API ───────────────────────────────────────────────────── */
    window.RBi18n = {
        switchLanguage: switchLanguage,
        getCurrentLanguage: function () { return currentLanguage; },
        getTranslation: function (key) { return getNestedValue(translations[currentLanguage], key); },
        getWAMessage: function (page) {
            var t = translations[currentLanguage];
            if (t && t.whatsapp && t.whatsapp[page]) return t.whatsapp[page];
            return t && t.whatsapp ? t.whatsapp.default : '';
        },
        generateWAUrl: function (page) {
            var msg = window.RBi18n.getWAMessage(page);
            return 'https://wa.me/' + WHATSAPP_PHONE.replace(/[^\d]/g, '') + '?text=' + encodeURIComponent(msg);
        }
    };

})();
