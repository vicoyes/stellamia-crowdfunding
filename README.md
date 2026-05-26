# Stellamia Crowdfunding

Landing page estatica para la campana Early-Bird de las tres nuevas ediciones
Stellamia previstas para verano de 2026. La pagina presenta las ediciones para
familias con ninos de `0-1`, `1-3` y `3-6` anos y dirige al visitante a un
formulario de interes.

El contenido publico de la landing esta escrito en aleman. El repositorio
tambien contiene un mock visual independiente, en espanol, para comentarios de
tareas.

## Estado actual

- Aplicacion de una sola pagina implementada en `index.html`.
- HTML, CSS y JavaScript vanilla embebidos; no existe proceso de build.
- Diseno responsive con puntos de ajuste para escritorio, tablet y movil.
- Formularios Early-Bird conectados a Zoho CRM WebToContact: solicitan
  nombre de cliente, apellido y correo electronico y muestran confirmacion tras el envio.
- Dominio personalizado configurado mediante `CNAME`:
  `crowdfunding.stellamia.eu`.

## Estructura

```text
.
|-- CNAME                          # Dominio para GitHub Pages
|-- index.html                     # Landing crowdfunding publica
|-- mocks/
|   `-- comments-task-detail.html  # Mock de UI para comentarios de una tarea
`-- README.md                      # Documentacion del proyecto
```

## Ejecucion local

Como no hay dependencias ni compilacion, se puede abrir `index.html`
directamente en el navegador. Para servirlo mediante HTTP local:

```bash
cd stellamia-crowdfunding
python3 -m http.server 8000
```

Abrir:

- Landing: <http://localhost:8000/>
- Mock de comentarios: <http://localhost:8000/mocks/comments-task-detail.html>

## Landing page

`index.html` contiene toda la implementacion de la pagina:

| Area | Descripcion |
| --- | --- |
| Navegacion | Logo de Stellamia y CTA anclado al formulario principal. |
| Hero | Mensaje de campana, imagen, descuento Early-Bird y primer formulario. |
| Ediciones | Tarjetas para `0-1`, `1-3` y `3-6` anos, cada una con CTA. |
| Por que Stellamia | Propuesta de valor, estadisticas y testimonio. |
| Bloque limitado | Mensaje de disponibilidad del precio especial. |
| Registro final | Segundo formulario y lista de beneficios. |
| Footer | Navegacion secundaria, aviso de registro y CTA final. |

### Comportamiento JavaScript

La landing mantiene la navegacion hacia el formulario con `scrollToSignup()` y
registra ambos bloques Early-Bird mediante Zoho CRM WebToContact. El script:

- valida los campos obligatorios de nombre de cliente, apellido y correo electronico;
- envia los datos a `https://crm.zoho.eu/crm/WebToContactForm`;
- mantiene los parametros ocultos y el script de analitica requeridos por Zoho;
- muestra confirmacion o error sin abandonar la landing.

El consentimiento, la politica de privacidad y la baja deben revisarse antes
de usar la captacion en produccion.

### Diseno y recursos externos

La interfaz usa variables CSS locales para la paleta Stellamia y estas fuentes
de Google Fonts:

- `Cormorant Infant` para titulos destacados.
- `Cormorant Garamond` como serif complementaria.
- `Inter` para texto e interfaz.

Las imagenes no estan versionadas en este repositorio. Se cargan desde:

- `stellamia.eu` para el logo y las imagenes de las ediciones.
- `stellamia-crowdfunding.lovable.app` para la imagen del hero.

La disponibilidad del sitio depende de que esos recursos externos sigan
publicados y permitan su carga desde el dominio de la landing.

## Mock de comentarios

`mocks/comments-task-detail.html` es una maqueta autocontenida para una
interfaz de comentarios de tarea. No forma parte del flujo de la landing.

Incluye:

- Lista de comentarios con autores humanos y agentes, badges de tipo y
  visibilidad.
- Respuesta inline y expansion/colapso de respuestas.
- Marcado visual de un comentario resuelto.
- Ejemplos comentados de estados vacio, carga y error.

Las interacciones son demostrativas; no consumen APIs ni persisten cambios.

## Publicacion

La disposicion del repositorio es compatible con GitHub Pages sirviendo la raiz
de la rama publicada:

1. Publicar el contenido de la rama configurada para Pages.
2. Mantener `CNAME` en la raiz con el valor `crowdfunding.stellamia.eu`.
3. Configurar el DNS del dominio para apuntar al sitio de GitHub Pages.
4. Verificar HTTPS y la carga de imagenes/fuentes tras el despliegue.

La configuracion de GitHub Pages y DNS ocurre fuera de este repositorio.

## Mantenimiento

Para cambios de contenido o estilos, editar `index.html`; el CSS y el
JavaScript estan embebidos en el mismo archivo. Al actualizar la pagina se
debe comprobar:

- Visualizacion en anchos de movil, tablet y escritorio.
- Navegacion de los CTA al bloque de registro.
- Validacion de los campos de correo.
- Carga de logo, imagenes y fuentes externas.
- Enlaces legales (`Impressum` y `Datenschutz`), actualmente definidos como
  placeholders `#`.

## Pendientes antes de produccion

- Validar en Zoho CRM la recepcion, segmentacion y automatizaciones de los registros Early-Bird.
- Incorporar consentimiento, privacidad y mecanismo real de baja conforme a
  los requisitos aplicables.
- Sustituir los enlaces placeholder de aviso legal y privacidad.
- Confirmar que cifras, testimonio, descuento y fecha de lanzamiento estan
  aprobados para publicacion.
- Considerar versionar u hospedar bajo control propio las imagenes criticas de
  la landing.
