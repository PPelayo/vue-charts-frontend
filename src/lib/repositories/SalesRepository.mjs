import axiosClient from "../model/AxiosClient.mjs"
import DataResult from "../model/DataResult.mjs"

class SalesRepository {
    async createSales({ productsIdsAndQuantities = [] }){
        try{
            await axiosClient.post('/sales', productsIdsAndQuantities)
            
        } catch (e) {
            return DataResult.createFailure(e.message)
        }
    }
}


export const salesRepository = new SalesRepository()