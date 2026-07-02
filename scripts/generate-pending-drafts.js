const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://ofqxvygsjneccemymtws.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE
);

function extractEmail(contactInfo) {
  if (!contactInfo) return null;
  const m = contactInfo.match(/[\w.-]+@[\w.-]+\.\w+/g);
  return m ? m[0] : null;
}

function buildEmail(lead) {
  const name = lead.company_name;
  const email = extractEmail(lead.contact_info);
  if (!email) return null;

  let subject, body;

  if (name === 'Grupo Prodesco') {
    subject = 'Nueva plataforma en Terrassa — ¿necesitáis oficinas al lado?';
    body = `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\nAcabáis de inaugurar vuestra nueva plataforma logística de 5.000 m² en Terrassa (febrero 2026): €62M de facturación, +17,4%, 30% de crecimiento de plantilla en 2025. Un salto impresionante.\n\nCuando una empresa como Prodesco crece así de rápido, las funciones de gestión —dirección, administración, compras, logística de oficina— necesitan espacio propio que no compita con el almacén.\n\nNuestro edificio de oficinas en Terrassa está a pocos minutos de vuestra nueva plataforma: 1.440 m² en 3 plantas, desde 160 m², desde 7 €/m². Ideal para que vuestro equipo directivo y administrativo trabaje con comodidad cerca de las operaciones.\n\nAbrimos en diciembre de 2026. ¿Os parece interesante?\n\nSaludos,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`;
  } else if (name === 'Pastisart') {
    subject = '€112M de facturación y fábrica en expansión — ¿y las oficinas?';
    body = `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\n€16M de inversión en Roda de Berà, fábrica ampliada de 11.000 a 16.000 m², objetivo de €123M para 2025 y 12,5% de ventas internacionales. Pastisart es un referente de la industria alimentaria catalana.\n\nCon vuestra sede en Terrassa y el ritmo de crecimiento que lleváis, separar la producción de la gestión tiene mucho sentido. Nuestro edificio de oficinas en Terrassa, a pocos minutos de vuestras instalaciones, ofrece espacios desde 160 m² hasta 480 m² por planta, desde 7 €/m². Un entorno premium para vuestra dirección, equipo comercial y administración.\n\nAbrimos en diciembre de 2026. ¿Os parece que lo veamos?\n\nSaludos,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`;
  } else if (name === 'Qida') {
    subject = '€37M y 300 personas de oficina — ¿caben todos en vuestra sede?';
    body = `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\nLa mayor ronda de impacto social del sur de Europa, 25.000 familias atendidas y 300 personas en equipos de oficina. Qida crece a una velocidad que pocas healthtech pueden igualar.\n\nCon ese volumen de equipo y expansión multi-ciudad, es probable que necesitéis opciones de espacio adicionales. Nuestro edificio en Terrassa ofrece 1.440 m² en 3 plantas, desde 7 €/m², a 30 minutos de Barcelona. Ideal para equipos de operaciones, tecnología o atención que puedan trabajar fuera del centro.\n\nAbrimos en diciembre de 2026. ¿Os interesa?\n\nUn saludo,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`;
  } else if (name === 'Plusfresc') {
    subject = 'Primera tienda en Terrassa — ¿y vuestro equipo de expansión?';
    body = `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\nPrimera tienda en Terrassa (noviembre 2024, 2.000 m² en Avinguda del Abad 43), 88 establecimientos, €202M de facturación. Plusfresc llega al Vallès Occidental con fuerza.\n\nCuando una cadena en expansión abre en un nuevo mercado, el equipo regional necesita una base de operaciones. Si vuestro equipo de zona o expansión necesita oficina en Terrassa, nuestro edificio ofrece espacios desde 160 m², desde 7 €/m², a pocos minutos de vuestra nueva tienda.\n\nAbrimos en 2026. ¿Os parece que lo hablemos?\n\nSaludos,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`;
  } else if (name === 'Landbot') {
    subject = 'Clientes como Allianz y Nestlé — ¿necesitáis espacio para crecer?';
    body = `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\n$8M de Serie A, 100+ personas, clientes como Allianz, Coca-Cola, BNP Paribas y Nestlé. Landbot es uno de los referentes del AI conversacional en Barcelona.\n\nSi el equipo sigue creciendo y necesitáis espacio adicional, Terrassa está a 30 minutos del 22@ y ofrece oficinas desde 160 m², desde 7 €/m². Una alternativa más económica para equipos de ingeniería, soporte o ventas que no necesiten estar en el centro.\n\nAbrimos en diciembre de 2026. ¿Os interesa?\n\nUn saludo,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`;
  } else if (name === 'Able Human Motion') {
    subject = '7 prototipos, 200 pacientes — ¿vuestro equipo tiene espacio para escalar?';
    body = `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\nSpin-off de la UPC, el primer exoesqueleto robótico español para uso clínico, 7 prototipos y más de 200 pacientes testados. Able Human Motion está construyendo algo que importa de verdad.\n\nPara un equipo de ingeniería y desarrollo en crecimiento, tener un espacio de trabajo adecuado cerca del talento técnico catalán es clave. Nuestro edificio en Terrassa —a 30 minutos de la UPC Diagonal Norte— ofrece oficinas desde 160 m², desde 7 €/m², con fibra y parking.\n\nAbrimos en diciembre de 2026. ¿Os interesa?\n\nSaludos,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`;
  } else if (name === 'Theker') {
    subject = 'La mayor ronda seed de España — ¿dónde crece el equipo?';
    body = `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\n€18M — la mayor ronda seed de la historia de España, con Kibo Ventures e Inditex. Robots de IA adaptativa para logística, retail y manufactura. Theker acaba de empezar y ya lo tiene todo.\n\nCuando el equipo empiece a escalar de verdad, necesitaréis espacio. Terrassa, a 30 minutos de Barcelona, ofrece oficinas desde 160 m², desde 7 €/m², en un entorno industrial bien conectado para un equipo de robótica.\n\nAbrimos en diciembre de 2026. ¿Os interesa?\n\nSaludos,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`;
  } else if (name === 'Cooltra') {
    subject = '€60M de facturación y líder europeo — ¿hub en el Vallès?';
    body = `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\n€60M de facturación (+32%), 32.000 vehículos en 7 países, 800 personas. Cooltra es el líder europeo indiscutible de la movilidad de dos ruedas.\n\nSi con vuestra expansión necesitáis un hub de operaciones o tecnología fuera de Barcelona, Terrassa ofrece oficinas modulares desde 160 m², desde 7 €/m², a 30 minutos de vuestro HQ.\n\nAbrimos en diciembre de 2026. ¿Os interesa?\n\nUn saludo,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`;
  } else if (name === 'Ocean Ecostructures') {
    subject = 'Top 12 Nasdaq Emerging Companies — ¿oficina para el equipo?';
    body = `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\nDe 4 a 20 empleados, 200 unidades arrecife desplegadas, 600 más en fabricación, seleccionados por Nasdaq como una de las 12 emerging companies más destacadas. Ocean Ecostructures está cambiando el modelo de restauración marina.\n\nSi el equipo sigue creciendo, Terrassa os ofrece espacio de trabajo accesible: desde 160 m², desde 7 €/m², a 30 minutos de Barcelona.\n\nAbrimos en diciembre de 2026. ¿Os interesa?\n\nSaludos,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`;
  } else if (name === 'Delfos Energy') {
    subject = '10.000 activos renovables monitorizados — ¿espacio para el equipo?';
    body = `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\nPlataforma de IA para carteras de energía renovable, más de 10.000 activos monitorizados globalmente, equipo de 50-100 personas. Delfos Energy lleva años construyendo algo sólido.\n\nSi estáis contratando ingenieros y científicos de datos, el Vallès Occidental os ofrece acceso a talento técnico con mejor relación calidad-precio que Barcelona centro. Nuestro edificio en Terrassa tiene oficinas desde 160 m², desde 7 €/m².\n\nAbrimos en diciembre de 2026. ¿Os interesa?\n\nUn saludo,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`;
  } else if (name === 'Neuroelectrics') {
    subject = '100 instituciones de investigación como clientes — ¿espacio para el siguiente paso?';
    body = `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\nStarStim, Enobio, más de 100 instituciones de investigación como clientes. Neuroelectrics es un referente mundial de la neurotecnología desde Barcelona.\n\nSi el equipo está creciendo y necesitáis espacio de trabajo adicional, Terrassa ofrece oficinas desde 160 m², desde 7 €/m², a 30 minutos del centro de Barcelona. Un entorno tranquilo para equipos de I+D que necesitan concentración.\n\nAbrimos en diciembre de 2026. ¿Os interesa?\n\nSaludos,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`;
  } else if (name === 'IOMED') {
    subject = '50 hospitales, varias rondas — ¿el equipo tiene espacio para crecer?';
    body = `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\nNLP para datos clínicos, 50+ hospitales como clientes, varias rondas de financiación. IOMED está en el corazón de la transformación del dato en salud.\n\nSi el equipo de producto, ingeniería o ventas sigue creciendo, Terrassa ofrece una opción económica y bien conectada: desde 160 m², desde 7 €/m², a 30 minutos de Barcelona.\n\nAbrimos en diciembre de 2026. ¿Os interesa?\n\nUn saludo,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`;
  } else if (name === 'Bo de Debò') {
    subject = '20% de crecimiento anual — ¿las oficinas van al mismo ritmo?';
    body = `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\nDesde 1942 en Terrassa, 100 empleados, 3.500 m² de instalaciones y un 20% de crecimiento anual. Bo de Debò es una historia de empresa familiar hecha grande.\n\nCon ese ritmo de crecimiento, las instalaciones actuales se quedan pequeñas. Si necesitáis separar la producción de la gestión —dirección, comercial, administración— nuestro edificio de oficinas en Terrassa, a pocos kilómetros de Sant Vicenç de Castellet, ofrece espacios desde 160 m², desde 7 €/m².\n\nAbrimos en diciembre de 2026. ¿Os interesa?\n\nSaludos,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`;
  } else if (name === 'B-Grup (Begudes del Vallès)') {
    subject = 'San Miguel, Pepsi, Schweppes — y oficinas en Terrassa';
    body = `Hola,\n\nSoy Jordi de RealBrave, la nueva marca de oficinas de Can Mir Gestions.\n\nDesde 1968 distribuyendo San Miguel, Pepsi, Schweppes, Font Vella y Vichy Catalán por toda España. B-Grup es un referente de la distribución en el Vallès.\n\nSi en algún momento necesitáis separar las funciones de dirección o administración de las operaciones logísticas, nuestro edificio de oficinas en Terrassa ofrece espacios desde 160 m², desde 7 €/m², a pocos minutos de vuestras instalaciones.\n\nAbrimos en diciembre de 2026. ¿Os interesa?\n\nUn saludo,\nJordi\nRealBrave - Can Mir Gestions | realbrave.eu`;
  } else {
    return null;
  }

  return { email, subject, body };
}

async function main() {
  const { data: leads, error } = await supabase
    .from('office_leads')
    .select('*')
    .eq('status', 'pending');

  if (error) { console.error('Error:', error); return; }
  if (!leads || leads.length === 0) { console.log('No pending leads found'); return; }

  const draftFile = path.join(__dirname, '..', 'leads', 'emails', 'draft_emails_food_terrassa_new.md');
  let draftContent = '# Draft Cold Emails — New Food Companies Leads (Terrassa)\n\n';
  draftContent += '> These are DRAFT emails for leads set to "pending" status (not yet contacted).\n';
  draftContent += '> Emails sourced from LinkedIn/Instagram scraping of company websites.\n';
  draftContent += '> Generated from `leads_food_companies_Terrassa.csv` — NOT YET SENT.\n\n';
  draftContent += `> Generated on: ${new Date().toISOString()}\n\n`;
  draftContent += '---\n\n';

  let drafted = 0, noEmail = 0;

  for (const lead of leads) {
    const draft = buildEmail(lead);
    if (draft) {
      drafted++;
      draftContent += `## ${lead.company_name}\n`;
      draftContent += `**To:** ${draft.email}\n`;
      draftContent += `**Subject:** ${draft.subject}\n\n`;
      draftContent += `${draft.body}\n\n---\n\n`;
      console.log(`Draft: ${lead.company_name} -> ${draft.email}`);
    } else {
      noEmail++;
      draftContent += `## ${lead.company_name}\n`;
      draftContent += `**⚠️ No email available**\n`;
      draftContent += `**Contact Info:** ${lead.contact_info || 'N/A'}\n`;
      draftContent += `**Urgency:** ${lead.urgency_score || 'N/A'}\n\n---\n\n`;
      console.log(`No email for ${lead.company_name}`);
    }
  }

  fs.writeFileSync(draftFile, draftContent, 'utf-8');
  console.log(`\nDrafts written to: ${draftFile}`);
  console.log(`Pending leads: ${leads.length}, Drafted: ${drafted}, No email: ${noEmail}`);
}

main().catch(e => console.error(e));
