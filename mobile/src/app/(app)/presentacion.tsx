import { router } from 'expo-router';

import { Button } from '../../components/Button';
import { IntroPager } from '../../components/IntroPager';
import { useIntro } from '../../controllers/useIntro';

// "Ver la presentación" desde Perfil: las mismas pantallas de Bienvenida, y al terminar vuelve.
export default function PresentacionScreen() {
  const intro = useIntro();

  return (
    <IntroPager intro={intro} skipLabel="Cerrar" onSkip={() => router.back()}>
      <Button title="Listo" onPress={() => router.back()} />
    </IntroPager>
  );
}
