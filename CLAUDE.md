# VaismanLabs — contexto para Claude

Sitio de consultoría de José Vaisman: IA aplicada a productos y operación para empresas medianas.
Publicado en https://vaismanlabs.github.io (GitHub Pages, repo `VaismanLabs/vaismanlabs.github.io`, rama `main`).

## Cómo trabajar

- Idioma: español de Chile, tuteo. Respuestas breves y precisas; preguntar si algo no está claro.
- Cambios de texto: editar `index.html`, commit y push directo a `main` (autorizado). GitHub Pages despliega en ~1 min; verificar con `curl -s https://vaismanlabs.github.io/ | grep '<texto nuevo>'`.
- Sitio estático sin build: `index.html`, `styles.css`, `hero-bg.js` (fondo animado de la portada: nube de puntos que forma la V), `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `og.png` (vista previa 1200×630), `.nojekyll`.
- **Caché:** GitHub Pages cachea 10 min. Al cambiar `styles.css` o `hero-bg.js`, subir el `?v=` en `index.html` (p. ej. `styles.css?v=20261019b`) para que los visitantes no vean estilos antiguos.
- Para revisar diseño: captura con Chromium headless (`/opt/pw-browsers/chromium-*/chrome-linux/chrome --headless --screenshot`).

## Identidad visual ("Grafito Editorial")

- Colores: grafito `#141414`, papel `#FCFCFA`, tinta `#1A1A1A`, cuerpo `#565651`, filete `#D7D5CE`, fantasma `#E0DED7`, lima `#B4E84A` (solo sobre fondo oscuro), oliva `#73803B`, oliva profundo `#5E7406`, destacado `#F1F2E6`. Tipografía Arial.
- Logo: "mapa de calor" 5×4 con forma de V, celda central en lima, sobre tile grafito (variante H05 «Degradado»). Wordmark **Vaisman**Labs.

## Decisiones de contenido (respetarlas)

- Voz en **plural** ("nosotros") en todo el sitio; "Quién está detrás" habla de José en tercera persona.
- Mensaje central: «Mejora tu operación. Resultados en semanas.» Se puede decir "semanas"; no mencionar "5 meses".
- Modelo comercial: **tarifa mensual fija**; lo que se ajusta es el alcance y la velocidad. No decir "precio cerrado", "plazo cerrado" ni "pago contra entregable".
- Primera reunión sin costo. Posicionamiento: más rápido y barato que una consultora tradicional (sin usar la palabra "barata").
- Público: empresas medianas. Puerta de entrada: decisiones críticas del negocio y procesos que no funcionan bien.
- Servicios: (A) algo específico, (B) diagnóstico corto, (C) contraparte técnica frente a un partner externo (incluye ayudar a elegir partner).
- Proyectos mostrados son ejemplos posibles, no casos reales: sin nombres de clientes ni cifras identificables. Cuando haya casos reales, agregarlos.
- No copiar textos de otros sitios. Sin íconos ↗. Propiedad intelectual "según el caso".

## Contacto y medición

- Email público hellovaisman@gmail.com · WhatsApp +56 9 9163 0293 · LinkedIn /in/jvaisman · formulario Formspree `maeqbard`.
- GA4 `G-5695V4EGE4` y Microsoft Clarity `yxtakv1l85` con eventos propios (`cta_click`, `contact_click`, `nav_click`, `faq_open`, `section_view`, `form_start`, `generate_lead`).
- Exclusión por navegador: `?notrack` desactiva la medición (localStorage `vl_notrack`), `?track` la reactiva.

## Artefactos relacionados (privados, en claude.ai)

- Exploración de logos: https://claude.ai/artifact/F5ov5oSjBPCpVocSrBmY2H
