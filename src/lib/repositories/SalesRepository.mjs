import dayjs from "dayjs"
import axiosClient from "../model/AxiosClient.mjs"
import DataResult from "../model/DataResult.mjs"
import { AxiosError } from "axios"

class SalesRepository {
    async createSales({ productsIdsAndQuantities = [] }){
        try{
            await axiosClient.post('/sales', productsIdsAndQuantities)
            
        } catch (e) {
            return DataResult.createFailure(e.message)
        }
    }

    async getTotalsSalesByDate({ startDate, endDate }) {

        const dateFormat = 'YYYY-MM-DD'

        try{
            const result = await axiosClient.get('/sales/totalsByDate', {
                params: {
                    startDate: startDate.format(dateFormat),
                    endDate: endDate.format(dateFormat)
                }
            })

            return DataResult.createSuccess(result.data)
        } catch(ex) {
            if(ex instanceof AxiosError){
                if(ex.status === 400)
                    return DataResult.createFailure('La fecha introducida no es correcta o no está bien formateada')
            }

            return DataResult.createFailure(`Error desconocido: ${ex.message}`)
        }
    }
}


export const salesRepository = new SalesRepository()