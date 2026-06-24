# Barberías Minerva — Sitio Web

Sitio estático premium para Barberías Minerva, compatible con **GitHub Pages**.

---

## Estructura del proyecto

```
minerva-web/
├── index.html              # Página principal
├── styles.css              # Sistema de diseño completo
├── script.js               # Comportamiento y animaciones
├── assets/
│   ├── fonts/
│   │   └── fonts.css       # Fuentes Lora + Poppins embebidas (sin CDN)
│   └── img/                # Imágenes del local, servicios, etc. (agregar aquí)
└── README.md               # Este archivo
```

---

## Publicar en GitHub Pages

### Paso 1 — Crear repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre sugerido: `barberias-minerva` (o `minerva-web`)
3. Visibilidad: **Public**
4. No inicialices con README (ya tienes archivos)

### Paso 2 — Subir archivos
**Opción A — Interfaz web (sin terminal):**
1. Entra al repositorio recién creado
2. Arrastra toda la carpeta del proyecto al área de archivos de GitHub
3. Escribe un mensaje de commit y haz clic en "Commit changes"

**Opción B — Terminal (Git):**
```bash
cd minerva-web
git init
git add .
git commit -m "Lanzamiento sitio Barberías Minerva"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

### Paso 3 — Activar GitHub Pages
1. Ve a **Settings** > **Pages** en tu repositorio
2. En **Source**, selecciona: Branch `main` / Folder `/ (root)`
3. Haz clic en **Save**
4. En 1-3 minutos el sitio estará en: `https://TU_USUARIO.github.io/TU_REPO/`

---

## Personalización recomendada

### Insertar mapa de Google Maps
1. Ve a [Google Maps](https://maps.google.com)
2. Busca la dirección exacta del local
3. Haz clic en **Compartir → Insertar un mapa**
4. Copia el código `<iframe ...>`
5. En `index.html`, busca el comentario `<!-- INSTRUCCIÓN: Reemplaza este bloque por el embed de Google Maps. -->` 
6. Reemplaza el `<div class="map-placeholder">...</div>` por el iframe

### Agregar fotografías reales
Coloca imágenes en `assets/img/`. Tamaños recomendados:
- Hero/Banner: 1920×1080px (JPG, < 200KB optimizado)
- Galería servicios: 800×600px
- Formato: WebP preferido, JPG como fallback

Para usar una foto como fondo del hero, edita en `styles.css`:
```css
.hero-pattern {
  background-image: url('assets/img/hero-bg.jpg'), /* tu foto */
    ...resto de gradientes;
  background-size: cover;
  background-position: center;
}
```

### Cambiar dirección en sección Contacto
Busca en `index.html`:
```html
<p>La Serena, Región de Coquimbo, Chile</p>
<p class="contact-note"><!-- Dirección exacta: insertar aquí --></p>
```
Reemplaza con la dirección completa del local.

### Activar URL de Weibook (cuando esté lista)
Busca todos los botones de `href="https://wa.me/...` y agrega una variante:
```html
<a href="https://book.weibook.co" ...>Reservar online</a>
```
O agrégala como botón adicional en la sección de servicios.

---

## Stack técnico
- HTML5 semántico
- CSS3 con custom properties (variables CSS)
- Vanilla JavaScript (ES2020+)
- Fuentes Lora + Poppins embebidas como base64 (sin dependencia de CDN)
- Sin frameworks, sin dependencias externas
- Animaciones: CSS keyframes + Intersection Observer API

## Paleta corporativa
```
Negro base:  #080706
Dorado:      #c8a84b
Dorado luz:  #f0d97a
Dorado oscuro: #a07830
Crema:       #f0e8d0
```

## Tipografía
- **Lora** (serif) — Titulares, nombres de servicios, CTAs
- **Poppins** (sans-serif) — Cuerpo, etiquetas, navegación

---

## Soporte
WhatsApp: +569 3358 1705  
Instagram: @barberiasminerva
