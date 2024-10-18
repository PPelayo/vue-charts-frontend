import DataResult from "./model/DataResult.mjs"
import axios from "axios"


class ProductsRepository {

    async getAll() {
        try{

            const result = await axios.get(`${import.meta.env.VITE_API_URL}/products`)
            return DataResult.createSuccess(result.data)

        } catch(e) {
            return DataResult.createFailure('Error recuperando los productos')
        }
    }

}


export const productsRepository = new ProductsRepository()