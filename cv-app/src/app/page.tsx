import { createClient } from '@/lib/supabase/server'
import UnifiedPage from './UnifiedPage'

export default async function Home() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return <UnifiedPage initialUser={user} />
}
