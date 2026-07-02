const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://ofqxvygsjneccemymtws.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE
);

function parseCSV(text) {
  const lines = [];
  let current = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < text.length && text[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else { field += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ',') { current.push(field.trim()); field = ''; }
      else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && i + 1 < text.length && text[i + 1] === '\n') i++;
        if (field.length > 0 || current.length > 0) { current.push(field.trim()); field = ''; if (current.some(f => f.length > 0)) lines.push(current); }
        current = [];
      } else { field += ch; }
    }
  }
  if (field.length > 0 || current.length > 0) { current.push(field.trim()); if (current.some(f => f.length > 0)) lines.push(current); }
  return lines;
}

function extractEmail(ci) { if (!ci) return null; const m = ci.match(/[\w.-]+@[\w.-]+\.\w+/g); return m ? m[0] : null; }
function extractLinkedIn(ci) { if (!ci) return null; const m = ci.match(/linkedin\.com\/[^\s,)]+/i) || ci.match(/LinkedIn:\s*([^,\s]+)/i); return m ? (m[0] || m[1]) : null; }

const knownCustom = {
  'Grupo Prodesco': () => ({
    subject: 'Nueva plataforma en Terrassa — ¿necesitáis oficinas al lado?',
    body: `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\nAcabáis de inaugurar vuestra nueva plataforma logística de 5.000 m² en Terrassa (febrero 2026): €62M de facturación, +17,4%, 30% de crecimiento de plantilla en 2025. Un salto impresionante.\n\nCuando una empresa como Prodesco crece así de rápido, las funciones de gestión —dirección, administración, compras, logística de oficina— necesitan espacio propio que no compita con el almacén.\n\nNuestro edificio de oficinas en Terrassa está a pocos minutos de vuestra nueva plataforma: 1.440 m² en 3 plantas, desde 160 m², desde 7 €/m². Ideal para que vuestro equipo directivo y administrativo trabaje con comodidad cerca de las operaciones.\n\nAbrimos en diciembre de 2026. ¿Os parece interesante?\n\nSaludos,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`
  }),
  'Pastisart': () => ({
    subject: '€112M de facturación y fábrica en expansión — ¿y las oficinas?',
    body: `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\n€16M de inversión en Roda de Berà, fábrica ampliada de 11.000 a 16.000 m², objetivo de €123M para 2025 y 12,5% de ventas internacionales. Pastisart es un referente.\n\nCon vuestra sede en Terrassa y el ritmo de crecimiento, separar producción de gestión tiene mucho sentido. Nuestro edificio en Terrassa ofrece espacios desde 160 m² hasta 480 m² por planta, desde 7 €/m².\n\nAbrimos en diciembre de 2026. ¿Os parece que lo veamos?\n\nSaludos,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`
  }),
  'Plusfresc': () => ({
    subject: 'Primera tienda en Terrassa — ¿y vuestro equipo de expansión?',
    body: `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\n88 establecimientos, €202M de facturación. Plusfresc llega al Vallès Occidental con fuerza.\n\nCuando una cadena en expansión abre en un nuevo mercado, el equipo regional necesita base de operaciones. Nuestro edificio en Terrassa ofrece espacios desde 160 m², desde 7 €/m², a pocos minutos de vuestra nueva tienda.\n\nAbrimos en diciembre de 2026. ¿Os parece que lo hablemos?\n\nSaludos,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`
  }),
  'Qida': () => ({
    subject: '€37M y 300 personas de oficina — ¿caben todos en vuestra sede?',
    body: `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\n25.000 familias atendidas y 300 personas en equipos de oficina. Qida crece a una velocidad que pocas healthtech pueden igualar.\n\nNuestro edificio en Terrassa ofrece 1.440 m² en 3 plantas, desde 7 €/m², a 30 minutos de Barcelona. Ideal para equipos de operaciones o tecnología.\n\nAbrimos en diciembre de 2026. ¿Os interesa?\n\nUn saludo,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`
  }),
  'Bo de Debò': () => ({
    subject: '20% de crecimiento anual — ¿las oficinas van al mismo ritmo?',
    body: `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\n3.500 m² de instalaciones y un 20% de crecimiento anual. Bo de Debò es una historia de empresa familiar hecha grande.\n\nSi necesitáis separar producción de gestión, nuestro edificio en Terrassa ofrece espacios desde 160 m², desde 7 €/m², a pocos km de Sant Vicenç de Castellet.\n\nAbrimos en diciembre de 2026. ¿Os interesa?\n\nSaludos,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`
  }),
  'B-Grup (Begudes del Vallès)': () => ({
    subject: 'San Miguel, Pepsi, Schweppes — y oficinas en Terrassa',
    body: `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\nDesde 1968 distribuyendo San Miguel, Pepsi, Schweppes, Font Vella y Vichy Catalán por toda España.\n\nNuestro edificio en Terrassa ofrece espacios desde 160 m², desde 7 €/m², a pocos minutos de vuestras instalaciones.\n\nAbrimos en diciembre de 2026. ¿Os interesa?\n\nUn saludo,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`
  })
};

function generate(lead) {
  const name = lead.company_name;
  if (knownCustom[name]) return knownCustom[name]();

  const signal = lead.signal_of_need || '';
  const sector = lead.industry_sector || '';
  const city = lead.address_city || '';
  const employees = lead.employee_count || '';

  const isHigh = (lead.urgency_score || '').toLowerCase().includes('high') && !(lead.urgency_score || '').toLowerCase().includes('medium-high');
  const isMedHigh = (lead.urgency_score || '').toLowerCase().includes('medium-high');
  const isMed = (lead.urgency_score || '').toLowerCase() === 'medium';

  let subject = `Oficinas en Terrassa — una opción para ${name}`;
  let hook = '';
  let angle = '';

  // Build hook from signal
  if (signal.includes('headcount growth') || signal.includes('% growth') || signal.includes('hiring') || signal.includes('open positions')) {
    const pct = signal.match(/(\d+)%/);
    if (pct) hook = `está en plena expansión con un ${pct[1]}% de crecimiento de plantilla`;
    else if (signal.includes('hiring') || signal.includes('Hiring')) hook = `está contratando activamente`;
    else hook = `está creciendo su equipo significativamente`;
  } else if (signal.includes('€') || signal.includes('$')) {
    const money = signal.match(/[€$][\d,.]+[BM]/);
    if (money) hook = `acaba de recibir ${money[0]} de inversión o financiación`;
    else hook = `está en un momento clave de inversión`;
  } else if (signal.includes('m²') || signal.includes('sqm') || signal.includes('leased') || signal.includes('Leased') || signal.includes('alquiler')) {
    const sqm = signal.match(/([\d,.]+)\s*m²/);
    if (sqm) hook = `ha ampliado su espacio con ${sqm[0]}`;
    else hook = `está ampliando su huella inmobiliaria`;
  } else if (signal.includes('office') || signal.includes('hub') || signal.includes('sede') || signal.includes('oficina')) {
    hook = `tiene nuevos planes de oficina y expansión`;
  } else if (signal.includes('revenue') || signal.includes('facturación') || signal.includes('ingresos')) {
    const rev = signal.match(/[€$][\d,.]+[BM]/);
    if (rev) hook = `alcanza ${rev[0]} de facturación`;
    else hook = `está creciendo significativamente en ingresos`;
  } else {
    hook = `está en un momento de expansión muy interesante`;
  }

  // Build angle based on sector
  if (sector.toLowerCase().includes('pharma') || sector.toLowerCase().includes('farma') || sector.toLowerCase().includes('biotech') || sector.toLowerCase().includes('biomed') || sector.toLowerCase().includes('medtech')) {
    angle = `Sabemos que las empresas de ciencias de la vida necesitan espacios tranquilos, bien conectados y con parking para equipos que combinan presencialidad con laboratorio o producción. Nuestro edificio, a 30 minutos de Barcelona, cumple con todo eso.`;
  } else if (sector.toLowerCase().includes('gaming') || sector.toLowerCase().includes('game')) {
    angle = `Para estudios de gaming y tecnología, la concentración y el espacio para colaborar son clave. Nuestras plantas de 480 m² permiten configuraciones abiertas con zonas de reunión, a 30 minutos de Barcelona y con acceso directo a la C-58.`;
  } else if (sector.toLowerCase().includes('tech') || sector.toLowerCase().includes('saas') || sector.toLowerCase().includes('software') || sector.toLowerCase().includes('ai') || sector.toLowerCase().includes('digital')) {
    angle = `Muchos equipos tecnológicos están valorando el Vallès como alternativa al 22@: más espacio por €/m², menos rotación de talento y mejores condiciones para los equipos de producto e ingeniería.`;
  } else if (sector.toLowerCase().includes('consult') || sector.toLowerCase().includes('professional') || sector.toLowerCase().includes('law') || sector.toLowerCase().includes('legal')) {
    angle = `Para despachos y consultoras, la imagen del edificio y la accesibilidad para clientes son prioritarias. Nuestro edificio en Ctra. Rubí 292 ofrece una imagen corporativa premium con parking.`;
  } else if (sector.toLowerCase().includes('food') || sector.toLowerCase().includes('aliment') || sector.toLowerCase().includes('distrib') || sector.toLowerCase().includes('logist')) {
    angle = `Para empresas de alimentación y distribución, tener las oficinas de gestión separadas de la producción o el almacén mejora la eficiencia. Nuestro edificio está a minutos de las principales plataformas logísticas del Vallès.`;
  } else if (sector.toLowerCase().includes('fintech') || sector.toLowerCase().includes('financ') || sector.toLowerCase().includes('bank') || sector.toLowerCase().includes('insurance')) {
    angle = `Para empresas financieras, la seguridad del edificio y la ubicación estratégica son esenciales. Ofrecemos un entorno profesional con todos los servicios.`;
  } else if (sector.toLowerCase().includes('e-commerce') || sector.toLowerCase().includes('marketplace') || sector.toLowerCase().includes('ecommerce')) {
    angle = `Los equipos de e-commerce combinan tecnología, operaciones y atención al cliente. Nuestro espacio flexible permite crecer sin ataduras de larga duración.`;
  } else {
    angle = `Un edificio de oficinas moderno y flexible en el corazón del Vallès, con fibra, parking y espacios modulares desde 160 m² hasta 480 m².`;
  }

  // Build subject - clean employee count
  const empMatch = employees.match(/(\d[\d,.]*)/);
  const empNum = empMatch ? parseInt(empMatch[1].replace(/,/g, '')) : 0;
  let empRef = employees.replace(/([~+]|\([^)]*\))/g, '').replace(/\s+/g, ' ').trim();
  if (empRef.includes('in') || empRef.includes('Global')) empRef = empNum > 0 ? empNum.toString() : '';

  if (isHigh) {
    if (empNum > 100 && empRef && !empRef.includes('in')) {
      subject = `${empRef} personas y creciendo — ¿una segunda sede en Terrassa?`;
    } else if (signal.includes('seed') || signal.includes('Series') || signal.includes('ronda')) {
      subject = `Acabáis de levantar ronda — ¿dónde ubicáis al equipo?`;
    } else {
      subject = `${name} en expansión — ¿oficina en el Vallès?`;
    }
  } else if (isMedHigh) {
    if (signal.includes('m²') || signal.includes('leased') || signal.includes('Leased')) {
      subject = `Nuevo espacio en ${city || 'Barcelona'} — ¿y un hub en Terrassa?`;
    } else {
      subject = `Oficinas en Terrassa — una alternativa a ${city || 'Barcelona'}`;
    }
  } else {
    if (city && city.toLowerCase() !== 'terrassa') {
      subject = `${name} — ¿una base de operaciones en el Vallès?`;
    } else {
      subject = `Oficinas en Terrassa — un espacio para vuestro equipo`;
    }
  }

  // Shorten signal if too long
  let sigShort = signal;
  if (sigShort.length > 200) sigShort = sigShort.substring(0, 200) + '...';

  // Clean up signal for body insertion
  let sigClean = sigShort;
  sigClean = sigClean.replace(new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '').trim();
  sigClean = sigClean.replace(/^[:\s,]+/, '').replace(/[.:\s,]+$/, '');
  if (sigClean.length > 200) sigClean = sigClean.substring(0, 200) + '...';

  const body = `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\nHemos visto que ${name} ${hook}${sigClean ? `. ${sigClean}` : ''}.\n\n${angle}\n\nNuestro edificio en Terrassa (Ctra. Rubí 292) ofrece 1.440 m² en 3 plantas independientes de 480 m², desde 160 m², desde 7 €/m², con parking para más de 25 vehículos. Apertura en diciembre de 2026.\n\n¿Os parece interesante? ¿Os va bien una llamada de 5 minutos para contaros más?\n\nUn saludo,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`;

  return { subject, body };
}

async function main() {
  const csvPath = path.join(__dirname, '..', 'leads', 'leads_food_companies_Terrassa.csv');
  const raw = fs.readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(raw);
  const header = rows[0].map(h => h.trim().toLowerCase().replace(/[^a-z0-9_]+/g, '_').replace(/_+$/, ''));

  const fieldMap = {
    company_name: 'company_name', website_url: 'website_url',
    current_known_address_city: 'address_city', industry_sector: 'industry_sector',
    approx_employee_count: 'employee_count', signal_of_potential_office_space_need: 'signal_of_need',
    estimated_urgency_score: 'urgency_score', contact_information: 'contact_info'
  };

  const leads = [];
  for (let i = 1; i < rows.length; i++) {
    const record = {};
    for (let j = 0; j < header.length && j < rows[i].length; j++) {
      const colName = fieldMap[header[j]];
      if (colName) record[colName] = rows[i][j].trim() || null;
    }
    if (!record.company_name) continue;
    const urgency = (record.urgency_score || 'medium').toLowerCase();
    leads.push({ ...record, _urgency: urgency, _email: extractEmail(record.contact_info), _linkedin: extractLinkedIn(record.contact_info) });
  }

  const order = { 'high': 0, 'medium-high': 1, 'medium': 2 };
  leads.sort((a, b) => (order[a._urgency] ?? 3) - (order[b._urgency] ?? 3));

  const outputPath = path.join(__dirname, '..', 'leads', 'emails', 'email_templates_food_companies_terrassa.md');
  let md = `# Plantillas de Email — Campaña Food Companies Terrassa

> Campaña de cold email para leads del archivo \`leads_food_companies_Terrassa.csv\`.
> Empresas tecnológicas, farmacéuticas, biotech, alimentación y servicios en expansión por Barcelona/Vallès.
> Edificio: 1.440 m² (3 plantas de 480 m² c/u), desde 7 €/m², apertura **Diciembre 2026**, Ctra. Rubí 292, Terrassa.
> Generado el: ${new Date().toISOString().split('T')[0]}

> **⚠️ IMPORTANTE:** Estos emails son borradores. NO enviar sin revisión y aprobación.

---

`;

  let countWithEmail = 0, countWithoutEmail = 0, currentUrgency = '', idx = 1;

  for (const lead of leads) {
    const urgencyLabel = lead._urgency.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-');
    if (urgencyLabel !== currentUrgency) {
      currentUrgency = urgencyLabel;
      md += `## ${urgencyLabel}\n\n`;
    }

    md += `### ${idx}. ${lead.company_name}\n`;

    if (lead._email) {
      const draft = generate(lead);
      md += `**Para:** ${lead._email}\n**Asunto:** ${draft.subject}\n\n${draft.body}\n\n`;
      countWithEmail++;
    } else {
      md += `**⚠️ Sin email disponible**\n`;
      if (lead._linkedin) md += `**LinkedIn:** ${lead._linkedin}\n`;
      md += `**Contacto:** ${lead.contact_info || 'N/A'}\n**Sector:** ${lead.industry_sector || 'N/A'}\n**Señal:** ${(lead.signal_of_need || 'N/A').substring(0, 150)}\n\n`;
      md += `*No se puede enviar email: no hay dirección de correo identificada.*\n\n`;
      countWithoutEmail++;
    }

    md += `---\n\n`;
    idx++;
  }

  md += `## Resumen\n\n- **Total empresas:** ${leads.length}\n- **Con email:** ${countWithEmail}\n- **Sin email (LinkedIn/otros):** ${countWithoutEmail}\n`;

  fs.writeFileSync(outputPath, md, 'utf-8');
  console.log(`\n=== EMAIL TEMPLATES GENERATED ===`);
  console.log(`File: ${outputPath}`);
  console.log(`Total: ${leads.length} | With email: ${countWithEmail} | Without email: ${countWithoutEmail}`);
  console.log(`\nNO emails were sent. Templates saved for review.`);
}

main().catch(err => { console.error(err); process.exit(1); });
