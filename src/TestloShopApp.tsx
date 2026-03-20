import { RouterProvider } from "react-router"
import { appRouter } from "./router/app.router"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from 'sonner';
// import { checkAuthAction } from "./auth/actions/check-auth.action";
import type { PropsWithChildren } from "react";
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading";
import { useAuthStore } from "./auth/store/auth.store";

const queryClient = new QueryClient()

// Creamos este HOC porque no podemos utilizar el codigo directamente ya que ejecuta (TanStackQuery) porque el proveedor se define más tarde
const CheckAuthProvider = ({ children }: PropsWithChildren) => {

    //Añadimos la acciçón verificar token al Store y lo empleamos como función en TanStackQuery
    const { checkAuthStatus } = useAuthStore();

    const { isLoading } = useQuery({
        queryKey: ['auth'],
        // queryFn: () => checkAuthAction(),
        queryFn: () => checkAuthStatus(),
        retry: false,
        refetchInterval: 1000 * 60 * 1.5, //Cada hora y media se refresca el token de forma automática
        refetchOnWindowFocus: true,
    });

    if (isLoading) return <CustomFullScreenLoading />

    return children;
}

export const TestloShopApp = () => {

    //! No es posible usar aqui ningún código que emplee TanStackQuery por eso creamos el HOC CheckAuthProvider

    return (
        <QueryClientProvider client={queryClient}>
            <Toaster richColors />

            <CheckAuthProvider>
                <RouterProvider router={appRouter} />
            </CheckAuthProvider>

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}