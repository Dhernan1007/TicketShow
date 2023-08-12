const axios = require('axios')
const {PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET, HOST} = require('../../config')
const getControllers = require('../eventControllers/getControllers')
const createOrder = async(req,res) => {

    

    try {
        const { value } = req.body
        const order = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: value,
                    },
                    
                    description: 'venta Ticket Show',
                },
            ],
            application_context: {
                brand_name: 'ticketshow.com',
                landing_page: 'LOGIN',
                user_action: 'PAY_NOW',
                return_url: `${HOST}/capture-order`,
                cancel_url: `${HOST}/cancel-order`,
            }
        }
    
        const params = new URLSearchParams()
        params.append('grant_type', 'client_credentials')
    
        const {data: {access_token}} = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
    
            },
        
            auth: {
                username: PAYPAL_API_CLIENT,
                password: PAYPAL_API_SECRET,
            }
        })
        console.log(access_token)
    
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                Authorization: `Bearer ${access_token}`
    
            }
        })
    
        console.log(response.data, 'si llega la data')
        res.json(response.data)

    } catch (error) {
        return res.status(500).send('Algo salió mal')
    }
    
}

const captureOrder = async(req,res) => {

    const {token} = req.query

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
        auth:{
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET,
        }
    })
    console.log(response.data)
    return res.redirect('http://localhost:5173/approved')
}

const cancelOrder = (req,res) => {

    res.redirect('http://localhost:5173/')
    res.send('cancelOrder')
}




module.exports = {createOrder, captureOrder, cancelOrder}