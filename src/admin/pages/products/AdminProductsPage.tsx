import { AdminTitle } from "@/admin/components/AdminTitle"
import { useProducts } from "@/shop/hooks/useProducts"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PencilIcon, PlusIcon } from "lucide-react"
import { Link } from "react-router"
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading"
import { currencyFormatter } from "@/lib/currency-formatter"

export const AdminProductsPage = () => {
    const { data, isLoading } = useProducts();

    if (isLoading) {
        return <CustomFullScreenLoading />
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <AdminTitle title="Productos" subTitle="Aquí puedes ver y administrar tus productos" />
                <div className="flex justify-end mb-10 gap-4">
                    <Link to="/admin/products/new">
                        <Button>
                            <PlusIcon />Nuevo producto
                        </Button>
                    </Link>
                </div>
            </div>

            <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        {/* <TableHead className="w-[100px]">ID</TableHead> */}
                        <TableHead>Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Inventario</TableHead>
                        <TableHead>Tallas</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.products.map((product) => {
                            return (
                                <TableRow key={product.id}>
                                    {/* <TableCell className="font-medium">{product.id}</TableCell> */}
                                    <TableCell>
                                        <img src={product.images[0] || 'https://placehold.co/250x250'} alt={product.title} className="h-20 w-20 object-cover rounded-md" />
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin/products/${product.id}`} className="hover:text-blue-500 underline">
                                            {product.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{currencyFormatter(product.price)}</TableCell>
                                    <TableCell>{product.gender}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>{product.sizes.toString()}</TableCell>
                                    <TableCell className="text-center">
                                        <Link to={`/admin/products/${product.id}`}>
                                            <PencilIcon className="w-4 h-4 text-blue-500" />
                                        </Link>
                                    </TableCell>
                                </TableRow>

                            )
                        })
                    }
                </TableBody>
            </Table>

            <CustomPagination totalPages={data?.pages || 0} />
        </div>
    )
}
