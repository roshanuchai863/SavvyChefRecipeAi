import axios from "axios";

const creatPaymentIntent = (data) => {
    return new Promise((resolve, reject) => {
        axios.post('http://192.168.0.109:3000/payment-sheet', data).then(function (res) {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

export default creatPaymentIntent