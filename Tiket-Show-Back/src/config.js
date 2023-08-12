const { config } = require('dotenv')

config()

const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT
const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET
const PAYPAL_API = process.env.PAYPAL_API
const HOST = process.env.HOST
module.exports = {PAYPAL_API_CLIENT, PAYPAL_API_SECRET, PAYPAL_API, HOST}