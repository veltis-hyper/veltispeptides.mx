#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '../content/posts');
const outputFilePath = path.join(__dirname, '../content/posts/social_media_copies.md');

// Specialized Copy Templates for different peptides to ensure strict Meta Compliance
const templates = {
  'bpc-157': {
    intro: "🔬 **Literatura Científica de Reconstrucción Tisular:** El comportamiento del BPC-157 (Body Protection Compound 157) en cultivos celulares in vitro.",
    bullets: [
      "✅ **Estabilidad Superior:** Derivado de una secuencia gástrica natural, este péptido destaca por su estabilidad molecular en entornos ácidos.",
      "✅ **Fibroblastos de Tendón:** La literatura científica analiza su papel modulador en la transcripción de receptores de factores de crecimiento.",
      "✅ **Protocolo de Laboratorio:** Descubre en nuestro blog las guías de manejo térmico y reconstitución técnica."
    ],
    cta: "🔍 Consulta el análisis de literatura científica y optimiza tu base de conocimientos experimentales en: https://veltispeptides.mx",
    hashtags: "#bpc157 #biologiamolecular #medicinaregenerativa #investigacionpreclinica #biotech #trazabilidad"
  },
  'mots-c': {
    intro: "🧬 **Divulgación de Ciencia Mitocondrial:** MOTS-c y la regulación metabólica de la célula.",
    bullets: [
      "✅ **Activación de AMPK:** Analizamos cómo este péptido de 16 aminoácidos imita los efectos de la restricción calórica a nivel celular.",
      "✅ **Últimos Hallazgos (Mayo 2026):** Descubrimientos sobre estabilidad lisosomal y protección celular en condiciones de estrés oxidativo.",
      "✅ **Manejo Riguroso:** Pautas críticas para evitar la agitación mecánica y conservar la estabilidad por arriba del 98%."
    ],
    cta: "📖 Lee nuestra revisión bibliográfica completa y accede a la calculadora de reconstitución gratuita en: https://veltispeptides.mx",
    hashtags: "#motsc #mitocondria #metabolismo #bioquimica #longevidad #cienciaytecnologia"
  },
  'ghk-cu': {
    intro: "💎 **Reprogramación Celular in Vitro:** El tripéptido de cobre GHK-Cu y sus mecanismos de transcripción génica.",
    bullets: [
      "✅ **Regulación de Matriz:** Analizamos cómo estimula la producción de colágeno, elastina y glucosaminoglicanos en fibroblastos.",
      "✅ **Protección Oxidativa:** Vías moleculares propuestas (SOD-1) en la atenuación del daño por radiación ultravioleta.",
      "✅ **Estabilidad en Dilución:** La importancia de evitar metales reactivos en su manipulación analítica."
    ],
    cta: "🔬 Lee el estudio de divulgación de Veltis Peptides y planifica tu dilución de precisión aquí: https://veltispeptides.mx",
    hashtags: "#ghkcu #peptidosdecobre #dermatologia #colageno #bioquimica #divulgacioncientifica"
  },
  'default': {
    intro: "🔬 **Divulgación de Péptidos de Alta Pureza:** Análisis molecular y estabilidad de compuestos biológicos.",
    bullets: [
      "✅ **Mecanismos de Acción:** Explicación científica de las vías de estimulación y receptores celulares.",
      "✅ **Precisión Matemática:** Calculadora digital para diluciones exactas en viales de 2mg, 5mg, y 10mg sin errores.",
      "✅ **Trazabilidad HPLC:** Certificación analítica que garantiza pureza mayor al 98% para estudios in vitro."
    ],
    cta: "📊 Accede gratis a nuestras herramientas analíticas y artículos científicos en: https://veltispeptides.mx",
    hashtags: "#veltispeptides #cienciamexicana #laboratorio #investigacionscientifica #biologia #purezahplc"
  }
};

function parseFrontmatter(fileContent) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = fileContent.match(frontmatterRegex);
  if (!match) return null;

  const yamlBlock = match[1];
  const metadata = {};
  
  yamlBlock.split('\n').forEach(line => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      let value = parts.slice(1).join(':').trim();
      
      // Clean quotes and brackets
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''));
      }
      
      metadata[key] = value;
    }
  });
  
  return metadata;
}

function generateSocialMediaCopy(filename, metadata) {
  const title = metadata.title || "Artículo Científico";
  const desc = metadata.description || "";
  const slug = filename.replace('.mdx', '');
  
  // Detect appropriate template
  let key = 'default';
  const lowercaseSlug = slug.toLowerCase();
  if (lowercaseSlug.includes('bpc')) key = 'bpc-157';
  else if (lowercaseSlug.includes('mots')) key = 'mots-c';
  else if (lowercaseSlug.includes('ghk')) key = 'ghk-cu';
  
  const t = templates[key];
  
  return `### 📱 Campaña Meta para: "${title}"
**Slug:** \`/blog/${slug}\`
**Enfoque de Cumplimiento (Compliance Focus):** Divulgación científica y pautas analíticas de laboratorio.

#### 📝 Copiado Rápido (Texto de Publicación):
${t.intro}

${desc}

${t.bullets.join('\n')}

⚠️ **Aviso de Laboratorio:** Todos los compuestos analizados están destinados de manera exclusiva para fines de investigación de laboratorio in vitro y protocolos preclínicos. Ninguno está aprobado para consumo humano o inyección.

${t.cta}/blog/${slug}

${t.hashtags}

#### 🎨 Dirección Visual Sugerida:
Utilizar una imagen de alta tecnología científica (ej. render mitocondrial brillante o la aguja holográfica). Mantener una paleta de colores oscuros con fluorescentes morados/rosas para consistencia de marca.

---
`;
}

function run() {
  console.log("🚀 Iniciando Motor de Generación de Copies de Marketing Compliant...");
  
  if (!fs.existsSync(postsDir)) {
    console.error(`❌ Error: El directorio de posts no existe en: ${postsDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.mdx'));
  
  if (files.length === 0) {
    console.log("⚠️ No se encontraron archivos .mdx en el directorio.");
    process.exit(0);
  }

  let outputContent = `# Catálogo de Copies para Redes Sociales (Meta-Compliant)
*Generado automáticamente en base a tus publicaciones de blog el ${new Date().toLocaleDateString('es-MX')}*\

Este documento contiene textos listos para copiar y pegar en Meta Ads Manager o publicaciones orgánicas de Instagram y Facebook. Diseñados específicamente para evitar baneos promoviendo educación, herramientas útiles y trazabilidad científica.

---

`;

  files.forEach(file => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const metadata = parseFrontmatter(content);
    
    if (metadata) {
      const socialCopy = generateSocialMediaCopy(file, metadata);
      outputContent += socialCopy;
      console.log(`✅ Copy generado para: ${file}`);
    } else {
      console.log(`⚠️ No se pudo parsear el frontmatter de: ${file}`);
    }
  });

  fs.writeFileSync(outputFilePath, outputContent);
  console.log(`\n🎉 ¡Catálogo generado con éxito! Guardado en: content/posts/social_media_copies.md\n`);
}

run();
