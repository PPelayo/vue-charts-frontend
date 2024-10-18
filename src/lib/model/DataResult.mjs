export default class DataResult {
    #success
    #error
    #data

    constructor(success, data, error){
        this.#success = success
        this.#data = data
        this.#error = error
    }

    static createSuccess(data){
        return new DataResult(true, data, null)
    }

    static createFailure(error){
        return new DataResult(false, null, error)
    }


    isSuccess() {
        return this.#success
    }

    isFailure() {
        return !this.#success
    }

    getData(){
        if(!this.#success) throw new Error('The result cannot be accessed because it is not success')
        return this.#data
    }

    getError(){
        if(this.#success) throw new Error('The error cannot be accessed because it is success')
        return this.#error
    }

    toString(){
        return JSON.stringify(
            this.toJson()
        )
         
    }

    toJson(){
        return {
            success: this.#success,
            data : this.#data,
            error : this.#error
        }
    }

    handle({onSuccess, onFailure, onFinally = () => {}}) {
        if(!this.#success){
            onFailure(this.#error)
        } else {
            onSuccess(this.#data)
        }

        onFinally()
    }
}