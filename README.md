# Ramunusi Holdings

Lightweight React + Vite company website aligned with the supplied logo. Eight statically rendered routes, responsive layouts, service-specific quote links and accessible form validation. Runtime dependencies are React and React DOM only.

## Run

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

Deploy the `dist` directory to a static host that serves directory `index.html` files. Each route has its own HTML, metadata and rendered content, so direct links and search crawlers work without a JavaScript-only shell. Configure the host to serve `404.html` for missing pages with HTTP 404. The development server provides the usual Vite fallback.

## Before going live

- Fill in `src/config/company.js`: phone, international WhatsApp digits, email, area, operating hours and production website origin. Empty values deliberately show “To be confirmed”; no business information is invented.
- Copy `.env.example` to `.env` and set `VITE_QUOTE_ENDPOINT` to a JSON-compatible form service (such as Formspree) or backend endpoint. Rebuild after changing it. The endpoint must accept cross-origin POST requests from your domain and return a 2xx response on success. Implement server-side validation, spam protection and appropriate handling of enquiry data at that endpoint. Public frontend environment variables must never contain secrets.
- Until delivery is configured, the form clearly explains that enquiries cannot be sent and never presents a false success. WhatsApp links become active when the number is set; the floating contact button otherwise points to contact details.
- Confirm the service descriptions and business details. Set `website` and rebuild to generate canonical URLs and a sitemap. Structured data only includes supplied details. No ratings, credentials, addresses or guarantees are invented.

## Maintain

Services and their detailed page content live in `src/data/services.js`. Shared sections, layout and the form live in `src/components`. Submission and validation are separate in `src/lib/quote.js`. Styles are plain CSS. The supplied logo is in `public/logo.png`; the solar-home visual is an original inline SVG. DM Sans loads with `display=swap` and a system-font fallback. The copyright year is generated at build/runtime; rebuild at least annually to keep static HTML current.

The quote form uses only the configured endpoint. It does not store enquiry data locally. React escapes entered content. Review privacy wording and retention practices for your chosen delivery service before launch.
