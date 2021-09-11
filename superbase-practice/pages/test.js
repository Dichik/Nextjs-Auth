import { Auth, Typography, Button } from '@supabase/ui'
import supabase from "../utils/initSuperbase";


const Container = (props) => {
    const { user } = Auth.useUser()
    if (user)
        return (
            <>
                <Button style={{
                    width: '100px',
                    height: '35px',
                    background: 'black'
                }} className={'sign-out-button'} block onClick={() => props.supabaseClient.auth.signOut()}>
                    Sign out
                </Button>
            </>
        )
    return props.children
}

export default function AuthBasic() {
    return (
        <Auth.UserContextProvider supabaseClient={supabase}>
            <Container supabaseClient={supabase}>
                <Auth style={{
                    position: 'absolute',
                    width: '400px',
                    left: '510px',
                    top: '100px'
                }} supabaseClient={supabase} redirectTo={'/profile'} />
            </Container>
        </Auth.UserContextProvider>
    )
}