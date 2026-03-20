import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../sctions/get-product-by-id.action";
import { createUpdateProductAction } from "@/shop/actions/create-update-product.action";

export const useProduct = (id: string) => {
    // const handleSubmitForm = async (productLike: Partial<Product>) => {
    //     console.log(productLike);
    // }


    const query = useQuery({
        queryKey: ['product', { id }],
        retry: false,
        queryFn: () => getProductByIdAction(id),
        staleTime: 1000 * 60 * 5,
        enabled: !!id,
    });

    // Objeto para modificar la query
    const queryClient = useQueryClient();

    // TanStack Mutacion utilizada para la creación y modificación de productos
    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product) => {
            // Deshabilitar cache para que se recargue y se muestre el producto actualizado/creado
            queryClient.invalidateQueries({ queryKey: ['products'] })
            queryClient.invalidateQueries({ queryKey: ['product', { id: product.id }] })
            // Actualizar Query Data
            queryClient.setQueryData(['product', { id: product.id }], product)

        }

    });

    return {
        ...query,
        mutation,
    };
}