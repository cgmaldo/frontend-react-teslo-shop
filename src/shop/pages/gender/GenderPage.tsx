import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useParams } from "react-router"
import { useProducts } from "@/shop/hooks/useProducts"

export const GenderPage = () => {

    const { gender } = useParams();

    let genderLabel = '';
    switch (gender) {
        case 'men':
            genderLabel = 'Hombres';
            break;
        case 'women':
            genderLabel = 'Mujeres';
            break;
        case 'kid':
            genderLabel = 'Niños';
            break;
    }

    const { data } = useProducts();

    return <div>
        <CustomJumbotron title={`Productos para ${genderLabel}`} />
        <ProductsGrid products={data?.products || []} />
        <CustomPagination totalPages={data?.pages || 0} />
    </div>
}
