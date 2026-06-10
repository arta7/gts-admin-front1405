
import { Router } from './routes/routes'
import { ConfirmDialogContextProvider } from './components/ConfirmDialog/ConfirmDialogContextProvider';
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog'
import { useAuth } from './contexts/AuthContext';
import Spinner from './components/spinner/Spinner';

export default function AuthenticatedApp() {
    const { menus, user }: { menus: any, user: any } = useAuth();

    if (!menus.length  && !user) {
        return <Spinner />
    }

    return <ConfirmDialogContextProvider>
        <Router />
        <ConfirmDialog />
    </ConfirmDialogContextProvider>
}