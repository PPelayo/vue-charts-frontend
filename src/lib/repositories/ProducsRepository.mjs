import DataResult from "../model/DataResult.mjs"
import axiosClient from "../model/AxiosClient.mjs"
import { AxiosError } from "axios"

class ProductsRepository {

    async getAll() {
        try{

            const result = await axiosClient.get(`/products`)
            return DataResult.createSuccess(result.data)

        } catch(e) {
            return DataResult.createFailure('Error recuperando los productos')
        }
    }

    async getById({ id }){
        try{
            const result = await axiosClient.get(`/products/${id}`)
            return DataResult.createSuccess(result.data)

        } catch(ex) {
            if(ex instanceof AxiosError) {
                if(ex.status === 401)
                    return DataResult.createFailure('Producto no encontrado')
            }
            return DataResult.createFailure('Error al recuperar el producto')
        }
    }

    async create({ product }){
        try {
            const result = await axiosClient.post(`${import.meta.env.VITE_API_URL}/products`, product)
            
            return DataResult.createSuccess(result.data)
        } catch (e) {
            return DataResult.createFailure('Error al guardar el registro')
        }
    }

    async update({ product }){
        try {
            const result = await axiosClient.put(`${import.meta.env.VITE_API_URL}/products/${product.id}`, product)
            
            return DataResult.createSuccess(result.data)
        } catch (e) {
            return DataResult.createFailure(`Error al guardar el registro: ${e.message}`)
        }
    }

    async delete({ id }){
        try {
            await axiosClient.delete(`${import.meta.env.VITE_API_URL}/products/${id}`)
        
            return DataResult.createSuccess({})
        } catch (e) {
            return DataResult.createFailure(`Error al eliminar el registro: ${e.message}`)
        }
    }
}


export const productsRepository = new ProductsRepository()