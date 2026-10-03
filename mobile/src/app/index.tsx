import { Redirect } from 'expo-router';

// Provisorio: cuando conectemos Supabase, esta decisión depende de si hay sesión iniciada.
export default function Index() {
  return <Redirect href="/login" />;
}
