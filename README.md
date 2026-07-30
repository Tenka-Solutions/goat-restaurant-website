# G.O.A.T. Argentine Grill & Bakery

Sitio corporativo de una sola página para presentar la identidad, propuesta
gastronómica y experiencia de G.O.A.T. El alcance actual es exclusivamente
informativo: no incluye pedidos, reservas, pagos ni administración.

## Stack

- Next.js con App Router y Server Components por defecto
- React y TypeScript estricto
- Tailwind CSS
- Fuentes locales `Bebas Neue` y `Montserrat` mediante Fontsource
- `next/image` para optimización de imágenes

## Ejecución local

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Validación y build

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

No se requieren variables de entorno ni servicios pagos en esta etapa.

## Estructura principal

```text
src/
  app/          Página, layout, estilos y rutas SEO
  components/
    layout/     Header, menú móvil y footer
    sections/   Secciones de la landing
    ui/         Elementos visuales reutilizables
  content/      Textos, navegación y datos del negocio
  types/        Tipos compartidos
public/
  images/       Fotografías locales
```

## Contenido editable

Los textos, enlaces y datos comerciales se centralizan en
`src/content/site-content.ts`. Antes de publicar:

1. Cambiar `siteConfig.siteUrl` por el dominio real.
2. Completar dirección, teléfono, correo, horarios, mapa y redes dentro de
   `businessDetails`.
3. Revisar y aprobar los textos editoriales y claims.

Los campos comerciales no confirmados tienen valor `null` y la interfaz los
muestra como pendientes; no se publican datos falsos.

## Reemplazo de imágenes

Las imágenes de `public/images/` fueron generadas para esta maqueta y son
temporales:

- `hero-grill.png`: hero y parrilla.
- `bakery-table.png`: panadería, empanadas, café y mate.
- `restaurant-experience.png`: experiencia y ambiente.

Pueden reemplazarse manteniendo los nombres, o actualizando las rutas y los
textos alternativos en `src/content/site-content.ts`. Conviene usar WebP o AVIF,
con un ancho de al menos 1600 px para el hero y 1000 px para galería.

## Despliegue

### Vercel

Importar el repositorio y utilizar la configuración automática de Next.js.
No hay variables de entorno obligatorias.

### Cloudflare

Conectar el repositorio mediante la integración actual de Cloudflare para
Next.js. Verificar la compatibilidad del adaptador elegido con la versión de
Next antes del despliegue. La página no usa backend ni persistencia.

## SEO y accesibilidad

Incluye metadata, Open Graph, Twitter Card, canonical configurable, favicon,
`robots.txt`, `sitemap.xml`, HTML semántico, único `h1`, enlace para saltar al
contenido, foco visible, navegación por teclado y respeto por
`prefers-reduced-motion`.

Los datos estructurados de restaurante se añadirán cuando dirección, teléfono
y horarios estén confirmados; no se generan con información incompleta.

## Futuras ampliaciones

- **Reservas:** conectar el CTA a un proveedor externo o agregar un módulo
  aislado cuando se defina el flujo.
- **Pedidos y pagos:** incorporar catálogo, carrito y checkout como una
  aplicación separada del contenido corporativo.
- **CMS:** sustituir gradualmente el archivo de contenido por una fuente
  tipada, conservando las interfaces actuales.
- **Panel administrativo:** añadirlo como área protegida solo cuando existan
  requerimientos, roles y modelo de datos aprobados.

La organización actual permite estas extensiones sin anticipar una base de
datos, API o dependencias que todavía no son necesarias.
