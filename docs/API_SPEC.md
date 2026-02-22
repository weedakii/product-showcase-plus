# Adhlal Backend API Specification

This document describes the REST API required by the Adhlal (اظلال) frontend. Use it in the Laravel backend project to implement routes, controllers, validation, and responses.

- **Purpose**: Backend API for the Adhlal React SPA (marketing site, store, contact, and admin dashboard).
- **Base URL**: `https://your-api-domain.com/api/v1` (or `/api`).
- **Auth**: All admin/dashboard endpoints require `Authorization: Bearer <token>` (Laravel Sanctum). Public endpoints: contact, login, products, categories.

---

## 1. Authentication

### POST /auth/login

Authenticate admin user and return a token.

**Request**

```json
{
  "email": "admin@adhlal.sa",
  "password": "secret"
}
```

**Response** `200 OK`

```json
{
  "token": "1|abc123...",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@adhlal.sa"
  }
}
```

**Errors**

- `422 Unprocessable Entity` — validation (e.g. missing email/password, invalid format).
- `401 Unauthorized` — invalid credentials.

---

### POST /auth/logout

Revoke the current token. Requires auth.

**Headers**: `Authorization: Bearer <token>`

**Response** `200 OK`

```json
{
  "message": "Logged out successfully"
}
```

**Errors**

- `401 Unauthorized` — missing or invalid token.

---

## 2. Public APIs

### POST /contact

Submit contact form (inquiry). No auth required.

**Request**

```json
{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "phone": "+966501234567",
  "message": "أريد استفسار عن أسعار الستائر الخشبية."
}
```

- `name` (required), `email` (required), `message` (required).
- `phone` optional.

**Response** `201 Created`

```json
{
  "message": "تم استلام رسالتك، سنتواصل معك قريباً."
}
```

**Errors**

- `422 Unprocessable Entity` — validation errors (e.g. invalid email, missing required fields).

---

### GET /products

List products for Store and Home. Optional filter by category.

**Query parameters**

| Parameter  | Type   | Required | Description        |
|-----------|--------|----------|--------------------|
| category  | string | No       | Filter by category |

**Response** `200 OK`

```json
{
  "data": [
    {
      "id": 1,
      "name": "الستائر الجدارية",
      "category": "الستائر الجدارية",
      "price": "450",
      "description": "أقمشة راقية للحصول على مظهر فاخر وراقي في منزلك.",
      "image_url": "https://example.com/images/product-1.jpg",
      "stock": 45,
      "status": "متوفر"
    }
  ]
}
```

---

### GET /categories

List categories for Store filter and product forms.

**Response** `200 OK`

```json
{
  "data": [
    "الكل",
    "الستائر الجدارية",
    "الستائر الخشبية",
    "الستائر الرأسية",
    "ستائر زيبرا",
    "الستائر الدوارة",
    "الستائر المعدنية"
  ]
}
```

Or with id/slug if needed:

```json
{
  "data": [
    { "id": 1, "name": "الستائر الجدارية", "slug": "sheer" }
  ]
}
```

---

### GET /faqs (optional)

For home FAQ section if content is managed in backend.

**Response** `200 OK`

```json
{
  "data": [
    {
      "id": 1,
      "question": "ما هي مدة التوصيل والتركيب؟",
      "answer": "يتم التوصيل والتركيب خلال 3-7 أيام عمل من تاريخ تأكيد الطلب..."
    }
  ]
}
```

---

## 3. Admin APIs

All admin endpoints require header: `Authorization: Bearer <token>`. Return `401 Unauthorized` if missing or invalid.

---

### Dashboard

#### GET /admin/dashboard

Aggregated data for dashboard overview: stats, sales chart, recent orders, recent messages.

**Response** `200 OK`

```json
{
  "stats": {
    "total_sales": "42,500 ر.س",
    "total_orders": 346,
    "visitors": 12845,
    "conversion_rate": "3.2%"
  },
  "sales_chart": [
    { "month": "يناير", "sales": 4200, "orders": 35 },
    { "month": "فبراير", "sales": 5100, "orders": 42 }
  ],
  "category_distribution": [
    { "name": "ستائر خشبية", "value": 30 },
    { "name": "ستائر زيبرا", "value": 25 }
  ],
  "recent_orders": [
    {
      "id": "#1234",
      "customer": "أحمد محمد",
      "product": "ستائر خشبية",
      "amount": "1,250 ر.س",
      "status": "مكتمل",
      "date": "2026-02-14"
    }
  ],
  "recent_messages": [
    {
      "id": 1,
      "name": "خالد العمري",
      "message": "أريد استفسار عن أسعار الستائر الخشبية...",
      "time": "منذ 5 دقائق",
      "read": false
    }
  ]
}
```

You may split into separate endpoints (e.g. `GET /admin/dashboard/stats`, `GET /admin/dashboard/sales-chart`) if preferred.

---

### Products (admin)

#### GET /admin/products

List products with optional search and category filter.

**Query parameters**

| Parameter | Type   | Required | Description        |
|-----------|--------|----------|--------------------|
| search    | string | No       | Search name/category |
| category  | string | No       | Filter by category |

**Response** `200 OK`

```json
{
  "data": [
    {
      "id": "1",
      "name": "ستائر خشبية كلاسيك",
      "category": "ستائر خشبية",
      "price": "1,250 ر.س",
      "stock": 45,
      "status": "متوفر"
    }
  ]
}
```

Product status values: `متوفر`, `محدود`, `نفذ`.

---

#### POST /admin/products

Create a product.

**Request**

```json
{
  "name": "ستائر خشبية كلاسيك",
  "category": "ستائر خشبية",
  "price": "1,250 ر.س",
  "stock": 45,
  "status": "متوفر",
  "description": "وصف اختياري",
  "image_url": "https://example.com/image.jpg"
}
```

- Required: `name`, `category`, `price`. Optional: `stock`, `status`, `description`, `image_url`.
- `status` one of: `متوفر`, `محدود`, `نفذ`.

**Response** `201 Created`

```json
{
  "data": {
    "id": "1",
    "name": "ستائر خشبية كلاسيك",
    "category": "ستائر خشبية",
    "price": "1,250 ر.س",
    "stock": 45,
    "status": "متوفر"
  }
}
```

**Errors**: `422` — validation.

---

#### GET /admin/products/{id}

Single product.

**Response** `200 OK`

```json
{
  "data": {
    "id": "1",
    "name": "ستائر خشبية كلاسيك",
    "category": "ستائر خشبية",
    "price": "1,250 ر.س",
    "stock": 45,
    "status": "متوفر",
    "description": "...",
    "image_url": "..."
  }
}
```

**Errors**: `404 Not Found` — product not found.

---

#### PUT /admin/products/{id}

Update product. Same fields as create (all optional in request; send only changed fields or full object).

**Response** `200 OK` — return updated product (same shape as GET single).

**Errors**: `404`, `422`.

---

#### DELETE /admin/products/{id}

Delete product.

**Response** `200 OK` or `204 No Content`

```json
{
  "message": "تم حذف المنتج"
}
```

**Errors**: `404`.

---

### Orders (admin)

#### GET /admin/orders

List orders with optional filters.

**Query parameters**

| Parameter | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| status    | string | No       | Filter: جديد, قيد التنفيذ, مكتمل, ملغي |
| search    | string | No       | Search customer, order id, product |

**Response** `200 OK`

```json
{
  "data": [
    {
      "id": "#1234",
      "customer": "أحمد محمد",
      "product": "ستائر خشبية",
      "amount": "1,250 ر.س",
      "status": "مكتمل",
      "date": "2026-02-14",
      "phone": "0501234567"
    }
  ]
}
```

Order status values: `جديد`, `قيد التنفيذ`, `مكتمل`, `ملغي`.

---

#### GET /admin/orders/{id}

Full order details (for Order details page).

**Response** `200 OK`

```json
{
  "data": {
    "id": "#1234",
    "date": "2026-02-14",
    "status": "مكتمل",
    "customer": {
      "name": "أحمد محمد",
      "email": "ahmed@email.com",
      "phone": "0501234567",
      "address": "الرياض، حي النخيل، شارع الملك فهد"
    },
    "items": [
      {
        "name": "ستائر خشبية كلاسيك - بني فاتح",
        "qty": 2,
        "price": "500 ر.س",
        "total": "1,000 ر.س",
        "dimensions": "180×240 سم"
      }
    ],
    "subtotal": "1,250 ر.س",
    "shipping": "0 ر.س",
    "tax": "187.50 ر.س",
    "total": "1,437.50 ر.س",
    "payment_method": "بطاقة ائتمان",
    "payment_status": "مدفوع",
    "delivery_date": "2026-02-16",
    "notes": "يرجى التواصل قبل التوصيل بساعة",
    "timeline": [
      { "status": "تم استلام الطلب", "date": "14 فبراير 2026 - 10:30 ص", "done": true },
      { "status": "جاري التجهيز", "date": "14 فبراير 2026 - 02:00 م", "done": true },
      { "status": "تم الشحن", "date": "15 فبراير 2026 - 09:00 ص", "done": true },
      { "status": "تم التسليم", "date": "16 فبراير 2026 - 11:30 ص", "done": true }
    ]
  }
}
```

**Errors**: `404`.

---

#### PUT /admin/orders/{id}

Update order (at least status; optionally product summary, amount, etc.).

**Request**

```json
{
  "status": "قيد التنفيذ",
  "product": "ستائر زيبرا",
  "amount": "890 ر.س"
}
```

All fields optional; send only what changes.

**Response** `200 OK` — return updated order (same shape as GET order list item or detail).

**Errors**: `404`, `422`.

---

#### DELETE /admin/orders/{id}

Delete/cancel order.

**Response** `200 OK` or `204 No Content`

```json
{
  "message": "تم حذف الطلب"
}
```

**Errors**: `404`.

---

### Notifications (admin)

#### GET /admin/notifications

List notifications with optional filters.

**Query parameters**

| Parameter | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| type      | string | No       | order, product, message, customer    |
| read      | boolean| No       | Filter by read (0/1 or true/false)   |

**Response** `200 OK`

```json
{
  "data": [
    {
      "id": "1",
      "type": "order",
      "title": "طلب جديد #1235",
      "description": "طلب جديد من العميل أحمد محمد بقيمة 1,450 ر.س",
      "time": "منذ 3 دقائق",
      "read": false
    }
  ]
}
```

Notification types: `order`, `product`, `message`, `customer`.

---

#### PATCH /admin/notifications/{id}/read

Mark one notification as read.

**Request** (optional body)

```json
{
  "read": true
}
```

**Response** `200 OK`

```json
{
  "data": {
    "id": "1",
    "read": true
  }
}
```

**Errors**: `404`.

---

#### POST /admin/notifications/mark-all-read

Mark all notifications as read.

**Response** `200 OK`

```json
{
  "message": "تم تحديد الكل كمقروء"
}
```

---

#### DELETE /admin/notifications/{id}

Delete a notification.

**Response** `200 OK` or `204 No Content`

```json
{
  "message": "تم حذف الإشعار"
}
```

**Errors**: `404`.

---

## 4. Data models (reference)

Use these as a reference for Laravel migrations and Eloquent models.

| Entity       | Main fields |
|-------------|-------------|
| **Product** | id, name, category, price, stock, status, description, image_url, timestamps |
| **Order (list)** | id, customer (name), product (summary), amount, status, date, phone |
| **Order (detail)** | As above + customer (email, address), items[], subtotal, shipping, tax, total, payment_method, payment_status, delivery_date, notes, timeline[] |
| **Contact / Inquiry** | id, name, email, phone, message, timestamps |
| **Notification** | id, type (order\|product\|message\|customer), title, description, time, read, timestamps |

Product status: `متوفر`, `محدود`, `نفذ`.  
Order status: `جديد`, `قيد التنفيذ`, `مكتمل`, `ملغي`.

---

## 5. Laravel implementation notes

- **Routes**: Use `Route::prefix('api')->group()` or `api/v1`. Register routes in `routes/api.php`.
- **Auth**: Use Laravel Sanctum. Protect admin routes with `middleware('auth:sanctum')`.
- **Controllers**: Suggested names — `AuthController`, `ContactController`, `ProductController`, `CategoryController`, `OrderController`, `DashboardController`, `NotificationController`.
- **Validation**: Use Form Request classes for POST/PUT bodies (e.g. `StoreProductRequest`, `UpdateOrderRequest`).
- **Responses**: Return JSON with consistent structure (e.g. `data` wrapper, `message` for success/error). Use `response()->json()` with status codes: 200, 201, 204, 401, 404, 422.
- **CORS**: Configure CORS for the frontend origin in `config/cors.php` or middleware.

---

## 6. Optional / future

- **POST /orders** (public): Create order / checkout when the frontend adds a checkout flow. Body: customer info, items, shipping, etc.
- **GET /settings** or **GET /content/about**: Site settings (contact email, phone, address) or CMS-driven content for About, Privacy, Terms pages.
