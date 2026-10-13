import { ContactLink, LegalPage, LegalSection } from '../components/LegalPage';

// Política de privacidad de Wedshare (/privacidad). Describe lo que la app guarda hoy:
// si se suma un dato o un servicio nuevo, hay que actualizarla.
export function PrivacyPage() {
  return (
    <LegalPage current="privacidad" title="Política de privacidad">
      <LegalSection title="1. Quién es responsable">
        <p>
          La responsable de los datos personales que se guardan en Wedshare es Constanza Delfino. Para cualquier
          consulta sobre tus datos, escribinos a <ContactLink />.
        </p>
      </LegalSection>

      <LegalSection title="2. Qué datos guardamos de los novios">
        <ul>
          <li>
            <strong>Tu cuenta:</strong> tu nombre y tu email. Si entrás con Google, recibimos de Google tu nombre,
            tu email y tu foto de perfil (la foto no la usamos). Las contraseñas no las guardamos nosotros:
            las maneja nuestro proveedor de inicio de sesión, cifradas.
          </li>
          <li>
            <strong>Tu casamiento:</strong> los nombres de los novios, la fecha, los lugares y direcciones, los
            textos, las fotos, el dress code, el link de la playlist, los regalos y, si la cargás, la cuenta
            bancaria para transferencias (titular, alias y CBU).
          </li>
          <li>
            <strong>Tu Google Calendar, si lo conectás:</strong> el email de la cuenta de Google y un permiso que
            Google nos da para crear, cambiar y borrar en tu calendario los eventos del casamiento. El permiso se
            guarda cifrado y solo lo usamos para eso: no leemos el resto de tu calendario. Si lo desconectás,
            sacamos esos eventos del calendario y borramos el permiso.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Qué datos guardamos de los invitados">
        <p>Los invitados no crean una cuenta. Sus datos los cargan los novios o los completan ellos al responder:</p>
        <ul>
          <li>el nombre de cada persona y del grupo o familia, y un número de WhatsApp si los novios lo cargan;</li>
          <li>si cada persona asiste o no, su preferencia alimentaria (si la escribe) y el mensaje para los novios;</li>
          <li>la hora en que cada persona entró al casamiento, cuando escanean su QR en la puerta.</li>
        </ul>
        <p>
          La preferencia alimentaria es opcional y solo se usa para que los novios organicen el menú. Como puede
          dar a entender algo sobre la salud o las creencias de una persona, te pedimos que escribas solo lo
          necesario para la comida.
        </p>
      </LegalSection>

      <LegalSection title="4. Para qué los usamos">
        <p>
          Usamos los datos solo para que Wedshare funcione: mostrar la invitación a cada grupo, guardar sus
          respuestas, mostrarles a los novios quién confirmó y validar los pases de ingreso. No los vendemos, no
          los usamos para publicidad y no mandamos mensajes a los invitados: el link lo mandan los novios desde su
          propio WhatsApp.
        </p>
      </LegalSection>

      <LegalSection title="5. Quién puede verlos">
        <ul>
          <li>Los novios ven todos los datos de su casamiento y de sus invitados, y nadie más puede verlos desde la app.</li>
          <li>
            Cada invitado ve la invitación y las respuestas de su propio grupo. No ve los datos de otros grupos ni
            los teléfonos.
          </li>
          <li>
            Las fotos de la invitación quedan publicadas en una dirección difícil de adivinar. Cualquiera que tenga
            esa dirección puede verlas.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Servicios que usamos">
        <p>Para funcionar, Wedshare se apoya en otras empresas que procesan algunos datos por nosotros:</p>
        <ul>
          <li>
            <strong>Supabase:</strong> guarda la base de datos, las fotos y las cuentas. Sus servidores están en
            San Pablo, Brasil.
          </li>
          <li>
            <strong>Google:</strong> el inicio de sesión con Google, la búsqueda de direcciones al cargar los
            lugares (Google recibe lo que escribís en el buscador), Google Calendar si los novios lo conectan y
            las fuentes tipográficas de la invitación.
          </li>
          <li>
            <strong>Spotify:</strong> si los novios suman su playlist, la invitación muestra el reproductor de
            Spotify, que puede guardar sus propias cookies.
          </li>
        </ul>
        <p>Cada uno tiene su propia política de privacidad.</p>
      </LegalSection>

      <LegalSection title="7. Lo que se guarda en tu celular o navegador">
        <p>
          La app guarda tu sesión para que no tengas que ingresar cada vez, y si ya viste la presentación. La web
          del invitado recuerda si ya se abrió el sobre de la invitación, para no mostrarlo de nuevo. No usamos
          cookies de publicidad ni de seguimiento.
        </p>
      </LegalSection>

      <LegalSection title="8. Cuánto tiempo los guardamos">
        <p>
          Guardamos los datos mientras la cuenta de los novios exista. Si eliminan la cuenta desde Perfil, se
          borran su casamiento, sus invitados con sus respuestas y sus fotos, y sacamos de su Google Calendar los
          eventos que había agendado Wedshare.
        </p>
      </LegalSection>

      <LegalSection title="9. Tus derechos">
        <p>
          Podés pedirnos acceder a tus datos, corregirlos o borrarlos escribiendo a <ContactLink />. Los novios
          pueden hacer casi todo desde la app. Si sos invitado y querés que borremos tus datos, también podés
          pedírselo a los novios, que los cargaron.
        </p>
        <p>
          El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma
          gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto
          conforme lo establecido en el artículo 14, inciso 3 de la Ley N° 25.326. La Agencia de Acceso a la
          Información Pública, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de
          atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por
          incumplimiento de las normas vigentes en materia de protección de datos personales.
        </p>
      </LegalSection>

      <LegalSection title="10. Cambios en esta política">
        <p>
          Si cambiamos esta política, vamos a actualizar la fecha de arriba. Si el cambio es importante, también lo
          vamos a avisar en la app.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
