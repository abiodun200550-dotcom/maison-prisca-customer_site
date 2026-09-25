# Maison Prisca storefront and admin — fixes and setup

## Summary

This update fixes the customer/admin application errors listed in the attached audit while preserving the owner's requirement that **no invented products, prices, or garment images be included**. The storefront remains intentionally empty until authentic products and photography are added and published through the admin dashboard.

The existing Appwrite project, database, Products table, storage bucket, and WhatsApp values from the uploaded `.env.example` files are retained. The code no longer silently falls back to a second, unrelated set of Appwrite IDs or WhatsApp number. The supplied Orders table ID, `6ab506fe00248c9e19bf`, is included in both deployment templates. The storefront's metadata and public-site links use the Maison Prisca URL named in the audit: <https://maison-prisca-customer.netlify.app>. The known existing admin deployment, <https://maison-prisca-admin.netlify.app>, was retained from the uploaded environment template and checked as a live site.

## Fixes made

The storefront now reports Appwrite configuration and catalogue failures separately from a genuinely empty collection. It shows `Published`, `Sold out`, and `Coming soon` products appropriately, while permitting orders only for published items. Product, catalogue, and order queries page beyond Appwrite's default first page. Admin update calls send only supported product fields instead of Appwrite system attributes. Uploaded JPG/PNG photographs are limited to 10 MB and displayed via resized WebP previews. Product slugs are generated from product names, and the product page requires an explicit size selection.

Cart data is merged by product and size, loaded without an empty-state flash, refreshed against current Appwrite products and prices, and rechecked immediately before order submission. Unavailable products cannot be ordered; changed prices require review and a second submit. A successful order clears the cart. A failed Orders-table write is shown clearly, preserves the cart, and still provides a complete WhatsApp message while explicitly warning that the order was not saved for admin tracking. Browser storage access is guarded, with an in-memory order handoff for restricted browsers.

Admin catalogue/order load failures, publish failures, delete failures, and save failures are now visible. Public-site links return to the verified Maison Prisca customer site rather than the admin root. Product cards and product details distinguish unavailable statuses. The product-page responsive controls no longer overlap at tablet widths. No sample catalogue data or placeholder garment assets were added.

## Deployment environment

Use the `.env.example` in each project as the deployment checklist. The values below come from the original uploaded project configuration (except the owner-supplied Orders table ID and the corrected customer URL).

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | `https://fra.cloud.appwrite.io/v1` |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | `6ab3f77800235eff10da` |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | `6ab3fc4100065a0c55ff` |
| `NEXT_PUBLIC_APPWRITE_PRODUCTS_TABLE_ID` | `6ab3fc590027440805cc` |
| `NEXT_PUBLIC_APPWRITE_ORDERS_TABLE_ID` | `6ab506fe00248c9e19bf` |
| `NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID` | `6ab3ff81000d25bdfd2b` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `2348145000582` |
| `NEXT_PUBLIC_PUBLIC_SITE_URL` | `https://maison-prisca-customer.netlify.app` |
| `NEXT_PUBLIC_ADMIN_SITE_URL` | `https://maison-prisca-admin.netlify.app` (confirmed existing deployment from the uploaded template). |
| `NEXT_PUBLIC_ADMIN_EMAIL` (admin app) | `abiodun200550@gmail.com` |

Add these values as Netlify environment variables for the corresponding customer and admin sites and redeploy. The application fails with a clear message if the required Appwrite values are missing; no Appwrite API key is used in browser code. Netlify does not automatically read `.env.example` as production environment variables.

## Appwrite Products table

The product admin reads and writes these custom attributes. Match the attribute keys exactly; array attributes contain strings. `price` and `originalPrice` should be numeric, `featured` and `hasDiscount` Boolean, and `status` a String or compatible enum.

| Attribute | Expected value |
|---|---|
| `name`, `slug`, `category`, `description`, `fabric`, `image`, `discountLabel` | String |
| `price`, `originalPrice` | Integer or Float |
| `sizes`, `colours`, `gallery` | Array of Strings |
| `status` | String: `Draft`, `Published`, `Sold out`, or `Coming soon` |
| `featured`, `hasDiscount` | Boolean |

The customer site renders only data stored in this Products table. Upload actual product photographs in admin; there are no locally invented products or images to remove. Permit public Read for product rows and public Read for uploaded product images. Keep product Create/Update/Delete, and Storage write access, limited to the authenticated administrator/team. The storefront no longer needs a custom index on `status`; it pages through rows and filters supported statuses in the app.

## Appwrite Orders table

Create the Orders table in database `6ab3fc4100065a0c55ff` with the owner-provided ID `6ab506fe00248c9e19bf`, or confirm that exact table already exists. Define the following attributes; `items` must hold a JSON string and should be `mediumtext` (or another type permitting more than 16,000 characters).

| Attribute | Type / notes |
|---|---|
| `orderNumber` | String |
| `customerName`, `customerPhone` | String |
| `customerEmail`, `deliveryNote`, `ref` | Optional String; the client sends an empty string when absent |
| `deliveryAddress`, `deliveryCity`, `deliveryState` | String |
| `items` | `mediumtext` or equivalent; JSON array of `{productId,name,size,quantity,price}` |
| `subtotal`, `total` | Integer or Float, in NGN |
| `status` | String: `New`, `Confirmed`, `Processing`, `Ready`, or `Completed` |

For this browser-direct checkout, use table-level permissions: allow **Create** to `role:any`; permit **Read/Update/Delete** only to the specific authenticated admin user or a dedicated admin team; do not grant public Read or Update. Configure the Orders table so its row-level security is **off** and table permissions control access. If row-level security must stay on, anonymous shoppers cannot safely assign admin-team row permissions; route order creation through a trusted Appwrite Function with a server API key instead. Do not make Orders readable to `role:any` or `role:users`. A failed permission or schema check is surfaced to the customer and admin UI instead of being presented as a saved order.

For the Products table, allow public Read and restrict write operations to the admin user/team. For the Storage bucket, allow public file Read (so product preview URLs work) and keep file Create/Update/Delete restricted to the admin user/team.

## Build and static route behavior

The customer project keeps its existing Next.js static export configuration. Product details use `/store/product?slug=<product-slug>` and confirmation uses `/order-confirmation?order=<order-number>`, avoiding unsupported dynamic paths in the Netlify export. Install from the included lockfile and run `npm run build` in both project directories before deployment.

The admin and storefront code changes were built and checked during this update. No production deployment, product write, order submission, or permissions change was made in Appwrite; those are applied by you in the respective Netlify and Appwrite consoles.

## References

Appwrite [permissions](https://appwrite.io/docs/advanced/security/permissions), [Tables](https://appwrite.io/docs/products/databases/tablesdb/tables), and [Storage](https://appwrite.io/docs/products/storage) documentation.
