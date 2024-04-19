
require('dotenv').config();

const stripe = require('stripe')(process.env.Secret_key);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("Server is running.....")

})


app.post('/payment-sheet', async (req, res) => {
  try {
    const { amount , email} = req.body;
    const customer = await stripe.customers.create({
      email:email
    });
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2023-10-16' }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "AUD",
      customer: customer.id,
      payment_method_types: ['card'],
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  } catch (error) {
    if (error.type === 'StripeCardError') {
      // The card has been declined
      res.status(402).json({ error: error.message });
    } else if (error.type === 'StripeInvalidRequestError') {
      // Invalid parameters were supplied to Stripe's API
      res.status(400).json({ error: error.message });
    } 
   
    else if (error.type === 'StripeAPIError') {
      // An error occurred internally with Stripe's API
      res.status(500).json({ error: error.message });
    } else {
      // Other unexpected errors
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
});



app.listen(3000, () => console.log("Running on http://192.168.0.109:3000"))
