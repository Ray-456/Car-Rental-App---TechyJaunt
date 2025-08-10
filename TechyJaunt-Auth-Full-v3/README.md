# TechyJaunt-Auth-Full v3
Extended TechyJaunt authentication + Cars + Rentals + Flutterwave payments example.

## Quickstart
1. Copy `.env.example` to `.env` and fill keys.
2. `npm install`
3. `npm run dev` (requires nodemon) or `npm start`
4. Use Postman to create cars, rentals and call `/api/payments/initiate` to get Flutterwave payment link.

## Postman
There's a Postman collection in `postman/TechyJaunt.postman_collection.json`.
Import it into Postman and update the `baseUrl` environment variable to `http://localhost:4500`.
