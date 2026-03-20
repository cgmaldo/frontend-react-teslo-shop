import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products.action";
import { useParams, useSearchParams } from "react-router";
import { priceSelectValues } from "../helpers/PriceSelectValues";

export const useProducts = () => {
    const [searchParams] = useSearchParams();

    const queryPage = searchParams.get('page') || '1';
    const page = isNaN(queryPage) ? 1 : +queryPage;

    const queryLimit = searchParams.get('limit') || '9';
    const limit = isNaN(queryLimit) ? 1 : +queryLimit;

    const offset = (page - 1) * limit;

    const { gender } = useParams();

    const sizes = searchParams.get('sizes') || '';

    const price = searchParams.get('price') || 'any';
    const { minPrice, maxPrice } = priceSelectValues({ price });

    const query = searchParams.get('query') || undefined;

    return useQuery({
        queryKey: ['products', { page, limit, gender, sizes, minPrice, maxPrice, query }],
        queryFn: () => getProductsAction({ offset, limit, gender, sizes, minPrice, maxPrice, query }),
        staleTime: 1000 * 60 * 5,
    });
}
