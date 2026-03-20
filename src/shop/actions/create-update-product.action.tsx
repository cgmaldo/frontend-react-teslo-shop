import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface"
import { sleep } from "@/lib/sleep";

const API_URL = import.meta.env.VITE_API_URL;

export interface FileUploadResponse {
    secureUrl: string;
    fileName: string;
}

export const createUpdateProductAction = async (productLike: Partial<Product> & { files?: File[] }): Promise<Product> => {

    sleep(1500);

    const { id, user, images = [], files = [], ...rest } = productLike;
    const isCreating = (id === 'new')
    rest.stock = Number(rest.stock) || 0;
    rest.price = Number(rest.price) || 0;

    // Preparar las imagenes
    if (files.length > 0) {
        const newImageNames = await uploadFiles(files);
        images.push(...newImageNames);
    }

    const imagesToSave = images.map(image => {
        if (image.includes('http')) return image.split('/').pop() || '';
        return image;
    })

    const { data } = await tesloApi<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'post' : 'patch',
        data: {
            ...rest,
            images: imagesToSave,
        }
    })

    return {
        ...data,
        images: data.images.map((image) => {
            if (image.includes('http')) return image
            return `${API_URL}/files/product/${image}`
        })
    }
}

export const uploadFiles = async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map(async file => {
        const formData = new FormData()
        formData.append('file', file);
        const { data } = await tesloApi<FileUploadResponse>({
            url: '/files/product',
            method: 'POST',
            data: formData
        });
        return data.fileName;
    });

    const uploadFileNames = await Promise.all(uploadPromises);
    return uploadFileNames;
}