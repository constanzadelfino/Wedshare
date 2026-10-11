import { ContactLink, LegalPage, LegalSection } from '../components/LegalPage';

// Términos de uso de Wedshare (/terminos).
export function TermsPage() {
  return (
    <LegalPage current="terminos" title="Términos de uso">
      <LegalSection title="1. Qué es Wedshare">
        <p>
          Wedshare es una app para que los novios armen la invitación digital de su casamiento, la compartan con
          sus invitados, sigan las confirmaciones y controlen el ingreso con un código QR. Los invitados la ven
          desde el navegador con un link propio, sin instalar nada ni crear una cuenta.
        </p>
        <p>
          Al crear una cuenta o usar la app aceptás estos términos. Si no estás de acuerdo con ellos, te pedimos
          que no la uses.
        </p>
      </LegalSection>

      <LegalSection title="2. Tu cuenta">
        <p>
          Para crear una cuenta tenés que ser mayor de 18 años. Podés registrarte con tu email y una contraseña,
          o con tu cuenta de Google. Cuidá tu contraseña: lo que se haga desde tu cuenta queda a tu cargo.
        </p>
        <p>
          Cada cuenta tiene un solo casamiento. Podés eliminar tu cuenta cuando quieras desde Perfil, y con ella
          se borra todo lo que cargaste.
        </p>
      </LegalSection>

      <LegalSection title="3. Lo que cargás">
        <p>
          Los textos, las fotos y los datos de tus invitados que cargás siguen siendo tuyos. Nos das permiso
          para guardarlos y mostrarlos en tu invitación, solo para que el servicio funcione.
        </p>
        <p>Al cargarlos, te comprometés a que:</p>
        <ul>
          <li>tenés derecho a usar las fotos que subís y las personas que aparecen están de acuerdo;</li>
          <li>
            los nombres y teléfonos de tus invitados los conseguiste de forma legítima y los usás solo para
            invitarlos a tu casamiento;
          </li>
          <li>no subís contenido ofensivo, ilegal o que afecte los derechos de otras personas.</li>
        </ul>
        <p>Si algo no cumple estas reglas, podemos quitarlo o suspender la cuenta.</p>
      </LegalSection>

      <LegalSection title="4. Links de la invitación">
        <p>
          Cada grupo de invitados recibe un link propio. Quien tenga ese link puede ver la invitación y responder
          por el grupo, así que te recomendamos mandarlo solo a sus destinatarios. Las fotos de la invitación
          quedan publicadas en una dirección difícil de adivinar, pero cualquiera que la tenga puede verlas.
        </p>
      </LegalSection>

      <LegalSection title="5. Regalos y servicios de otras empresas">
        <p>
          Wedshare no maneja dinero. Los botones de regalos abren los links de pago o de productos que cargan los
          novios, y los datos de la cuenta bancaria los escriben ellos mismos. Cualquier pago o transferencia se
          hace por fuera de Wedshare, entre el invitado y los novios o el comercio que corresponda.
        </p>
        <p>
          La invitación también puede mostrar el reproductor de Spotify y abrir Google Maps o Google Calendar. Esos
          servicios tienen sus propias condiciones, y Wedshare no es responsable de cómo funcionan.
        </p>
      </LegalSection>

      <LegalSection title="6. Disponibilidad">
        <p>
          Wedshare es un proyecto académico y se ofrece tal como está. Hacemos lo posible para que funcione bien,
          pero no podemos garantizar que esté siempre disponible ni libre de errores. Te recomendamos guardar por
          tu cuenta la información importante, como la lista de invitados. Los invitados pueden guardar su pase
          de ingreso como imagen para usarlo sin señal.
        </p>
      </LegalSection>

      <LegalSection title="7. Privacidad">
        <p>
          Cómo tratamos tus datos y los de tus invitados está explicado en la{' '}
          <a href="/privacidad" className="font-semibold text-accent underline">
            Política de privacidad
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="8. Cambios en estos términos">
        <p>
          Si cambiamos estos términos, vamos a actualizar la fecha de arriba. Si el cambio es importante, también
          lo vamos a avisar en la app.
        </p>
      </LegalSection>

      <LegalSection title="9. Ley aplicable y contacto">
        <p>
          Estos términos se rigen por las leyes de la República Argentina. Para cualquier consulta, escribinos a{' '}
          <ContactLink />.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
