import { createClient } from '@/lib/supabase/server';
import UnifiedPage from './UnifiedPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Daniel Ortiz | Portfolio Profesional",
    description: "Explora mi trayectoria profesional, proyectos y habilidades en Ingeniería Electrónica y Desarrollo Full Stack.",
};

export default async function Home() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return <UnifiedPage initialUser={user} />;
}
