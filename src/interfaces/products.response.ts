import type { Product } from "@/interfaces/product.interface";

export interface ProductsResponse {
    count: number;
    pages: number;
    products: Product[];
}


