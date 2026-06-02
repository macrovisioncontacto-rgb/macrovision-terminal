# Google Ads Setup Guide para Macrovisión

Este documento explica cómo configurar Google AdSense en tu página web de Macrovisión.

## 📋 Requisitos Previos

1. **Cuenta Google AdSense** - Solicita acceso en [google.com/adsense](https://www.google.com/adsense/start)
2. **Publisher ID** - Lo obtendrás cuando tu sitio sea aprobado
3. **Cumplimiento de políticas** - La página debe cumplir con las políticas de Google

## 🔧 Pasos de Configuración

### 1. Obtener tu Publisher ID

- Ve a [Google AdSense](https://www.google.com/adsense/start)
- Solicita acceso con tu cuenta de Google
- Google analizará tu sitio (puede tomar 24-48 horas)
- Una vez aprobado, tu Publisher ID será: `ca-pub-XXXXXXXXXXXXXXXX`

### 2. Actualizar el Publisher ID en el HTML

**En `index.html`:**

Reemplaza todas las instancias de `ca-pub-YOUR_PUBLISHER_ID` con tu Publisher ID real:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
```

Y en cada elemento `<ins>`:

```html
<ins class="adsbygoogle"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     ...></ins>
```

### 3. Configurar Slot IDs

Cada área de anuncios necesita un Slot ID único:

**En Google AdSense:**
1. Ve a **Ads.txt** o **Crear anuncio por unidad**
2. Crea 4 unidades publicitarias:
   - **Banner Top** (Horizontal)
   - **Sidebar Mercados** (Vertical)
   - **Sidebar Noticias** (Vertical)
   - **Sticky Bottom** (Vertical)

Cada una te dará un Slot ID: `XXXXXXXXX`

**En `index.html`:**

Reemplaza los Slot IDs:

```html
<!-- Banner Ad - Top Hero -->
<ins class="adsbygoogle"
     data-ad-slot="SLOT_ID_1"  <!-- Reemplazar con número real -->
     ...></ins>

<!-- Sidebar Ad - Mercados -->
<ins class="adsbygoogle"
     data-ad-slot="SLOT_ID_2"  <!-- Reemplazar con número real -->
     ...></ins>

<!-- In-article Ad - Noticias -->
<ins class="adsbygoogle"
     data-ad-slot="SLOT_ID_3"  <!-- Reemplazar con número real -->
     ...></ins>

<!-- Sticky Ad - Bottom -->
<ins class="adsbygoogle"
     data-ad-slot="SLOT_ID_4"  <!-- Reemplazar con número real -->
     ...></ins>
```

### 4. Usar google-ads-config.js (Opcional)

Actualiza `google-ads-config.js` con tus valores:

```javascript
const GOOGLE_ADS_CONFIG = {
  publisherId: 'ca-pub-XXXXXXXXXXXXXXXX',  // Tu Publisher ID
  slots: {
    bannerTop: 'XXXXXXXXX',        // Slot ID del banner superior
    sidebar: 'XXXXXXXXX',          // Slot ID del sidebar de mercados
    newsSidebar: 'XXXXXXXXX',      // Slot ID del sidebar de noticias
    stickyBottom: 'XXXXXXXXX',     // Slot ID del sticky bottom
  },
};
```

## 📍 Ubicaciones de Anuncios

Tu página tiene 4 áreas de anuncios optimizadas:

### 1. **Banner Top** (Horizontal)
- Ubicación: Debajo del header, antes del hero
- Formato: Responsive horizontal
- Ideal para: Anuncios display estándar

### 2. **Sidebar Mercados** (Vertical)
- Ubicación: Lado derecho de la sección de mercados
- Formato: Vertical/Cuadrado
- Ideal para: Anuncios verticales

### 3. **Sidebar Noticias** (Vertical)
- Ubicación: Lado derecho de la sección de noticias
- Formato: Vertical/Cuadrado
- Ideal para: Anuncios de servicios financieros

### 4. **Sticky Bottom** (Vertical)
- Ubicación: Esquina inferior derecha (fija al scroll)
- Formato: Vertical
- Ideal para: Anuncios de alta visibilidad

## 🎨 Personalización CSS

Los anuncios usan la clase `.ad-container`. Personaliza su estilo en `style.css`:

```css
.ad-container {
  margin: 16px 0;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

/* Banner Top */
.ad-banner-top {
  display: block;
  margin-bottom: 24px;
}

/* Sidebar Ads */
.ad-sidebar,
.ad-news-sidebar {
  margin-bottom: 18px;
}

/* Sticky Bottom */
.ad-sticky-bottom {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  z-index: 20;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .ad-sticky-bottom {
    display: none;
  }
}
```

## ⚙️ Funciones Disponibles

En `google-ads-config.js` hay funciones útiles:

```javascript
// Inicializar anuncios
initializeGoogleAds();

// Refrescar anuncios (después de cargar contenido dinámico)
refreshGoogleAds();

// Mostrar/ocultar anuncios
setAdsVisible(true);  // Mostrar
setAdsVisible(false); // Ocultar
```

## 🚀 Verificación

Después de configurar:

1. **Verifica los Slot IDs**: Open DevTools → Console, busca errores
2. **Prueba responsividad**: Los anuncios deben adaptarse a móvil
3. **Monitorea Google AdSense**: Dashboard → Resumen de ingresos

## 📊 Mejores Prácticas

✅ **Recomendaciones:**
- Máximo 3-4 unidades publicitarias por página
- Deja espacios limpios alrededor de los anuncios
- No ocultes ni manipules anuncios con JavaScript
- Asegúrate de tener privacidad y políticas legales
- Revisa que el contenido cumpla políticas de Google

❌ **Evita:**
- Clics forzados o engañosos
- Ocultar/mostrar anuncios de forma excesiva
- Poner anuncios en textos que confundan al usuario
- Colocar demasiados anuncios en pequeños espacios

## 📝 Política de Privacidad

Google requiere que incluyas información sobre publicidad personalizada. Asegúrate de que tu página tenga:

```html
<p>Usamos Google AdSense para mostrar anuncios personalizados. 
   Google puede usar cookies de terceros para mostrar anuncios basados 
   en tus visitas anteriores a nuestro sitio y otros sitios.
   <a href="https://policies.google.com/technologies/ads">Más información</a></p>
```

## 🔗 Recursos Útiles

- [Google AdSense Help](https://support.google.com/adsense)
- [Google Ads Policy](https://support.google.com/adspolicy)
- [AdSense Code Samples](https://www.google.com/adsense/start)

## 💬 Soporte

Si tienes problemas:
1. Revisa el status en tu dashboard de Google AdSense
2. Consulta los logs del navegador (DevTools → Console)
3. Verifica que el Publisher ID sea correcto
4. Espera 24-48 horas si es un sitio nuevo

---

**Nota:** Los anuncios pueden tardar unas horas en aparecer después de configurar correctamente.
