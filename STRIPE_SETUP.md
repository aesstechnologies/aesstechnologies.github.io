# Stripe Setup Guide

This guide will help you configure Stripe Checkout integration for the AESS Technologies website.

## Prerequisites

- Stripe account (sign up at https://stripe.com)
- Backend server (Azure or other) to handle checkout session creation

## Step 1: Get Your Stripe API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API keys**
3. Copy your **Publishable key** (starts with `pk_test_` for test mode or `pk_live_` for live mode)
4. Copy your **Secret key** (starts with `sk_test_` for test mode or `sk_live_` for live mode)

**Important:** Never expose your secret key in the frontend code. It should only be used on your backend server.

## Step 2: Configure Frontend

1. Open your `.env` file
2. Add your Stripe publishable key:

```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
REACT_APP_STRIPE_MODE=test
```

For production, use your live key:

```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here
REACT_APP_STRIPE_MODE=live
```

## Step 3: Implement Backend Endpoint

You need to implement a backend endpoint to create Stripe Checkout sessions. See [BACKEND_REQUIREMENTS.md](./BACKEND_REQUIREMENTS.md) for the endpoint specification.

### Example Implementation (Node.js/Express)

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/stripe/create-checkout-session', async (req, res) => {
  try {
    const { serviceId, amount, serviceName, successUrl, cancelUrl } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'sek',
            product_data: {
              name: serviceName,
              description: `AESS Technologies - ${serviceName}`,
            },
            unit_amount: amount, // Amount in smallest currency unit (öre for SEK)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        serviceId: serviceId,
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: error.message });
  }
});
```

### Example Implementation (C#/Azure Functions)

```csharp
using Stripe;
using Stripe.Checkout;

[FunctionName("CreateCheckoutSession")]
public async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Function, "post", Route = "stripe/create-checkout-session")] HttpRequest req)
{
    StripeConfiguration.ApiKey = Environment.GetEnvironmentVariable("STRIPE_SECRET_KEY");

    var requestBody = await new StreamReader(req.Body).ReadToEndAsync();
    var data = JsonConvert.DeserializeObject<CheckoutRequest>(requestBody);

    var options = new SessionCreateOptions
    {
        PaymentMethodTypes = new List<string> { "card" },
        LineItems = new List<SessionLineItemOptions>
        {
            new SessionLineItemOptions
            {
                PriceData = new SessionLineItemPriceDataOptions
                {
                    Currency = "sek",
                    ProductData = new SessionLineItemPriceDataProductDataOptions
                    {
                        Name = data.ServiceName,
                        Description = $"AESS Technologies - {data.ServiceName}",
                    },
                    UnitAmount = data.Amount,
                },
                Quantity = 1,
            },
        },
        Mode = "payment",
        SuccessUrl = data.SuccessUrl,
        CancelUrl = data.CancelUrl,
        Metadata = new Dictionary<string, string>
        {
            { "serviceId", data.ServiceId },
        },
    };

    var service = new SessionService();
    var session = await service.CreateAsync(options);

    return new OkObjectResult(new { sessionId = session.Id });
}
```

## Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm start
   ```

2. Navigate to the Services page
3. Click "Buy Now" on a fixed-price service
4. You should be redirected to Stripe Checkout
5. Use Stripe test card numbers:
   - **Success:** `4242 4242 4242 4242`
   - **Decline:** `4000 0000 0000 0002`
   - Use any future expiry date and any 3-digit CVC

## Step 5: Go Live

When you're ready to accept real payments:

1. Switch to live mode in your `.env`:
   ```env
   REACT_APP_STRIPE_MODE=live
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
   ```

2. Update your backend to use live secret key
3. Test with a real card (Stripe will charge a small amount)
4. Monitor transactions in your Stripe Dashboard

## Security Best Practices

1. **Never expose secret keys** - Only use publishable keys in frontend code
2. **Validate on backend** - Always validate payment amounts and service IDs on your backend
3. **Use HTTPS** - Always use HTTPS in production
4. **Verify webhooks** - Set up Stripe webhooks to verify payment completion
5. **Handle errors gracefully** - Implement proper error handling and user feedback

## Webhook Setup (Recommended)

Set up Stripe webhooks to handle payment completion:

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Add endpoint: `https://your-backend.com/api/stripe/webhook`
3. Select events: `checkout.session.completed`
4. Implement webhook handler to:
   - Verify payment completion
   - Send confirmation emails
   - Update order status
   - Trigger fulfillment processes

## Troubleshooting

### Checkout redirects but shows error
- Verify your publishable key is correct
- Check that backend endpoint is accessible
- Verify CORS is configured correctly on backend

### Payment succeeds but no confirmation
- Check webhook configuration
- Verify webhook endpoint is accessible
- Check backend logs for errors

### Test mode not working
- Ensure `REACT_APP_STRIPE_MODE=test`
- Use test API keys (start with `pk_test_`)
- Use Stripe test card numbers

## Additional Resources

- [Stripe Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Testing](https://stripe.com/docs/testing)

## Support

For Stripe-specific issues, contact [Stripe Support](https://support.stripe.com).

For integration issues with this website, see the main [README.md](./README.md) or open an issue on GitHub.

