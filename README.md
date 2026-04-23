# Todo API

Simple Node.js + TypeScript API for authentication and todo management.

## Tech Stack

- Node.js
- Express 5
- TypeScript
- MongoDB + Mongoose
- JWT auth
- Zod validation
- Resend (login email notifications)

## Project Structure

```text
src/
	app/            # Express app setup and route mounting
	auth/           # Auth routes/controller/service/model/zod
	todo/           # Todo routes/controller/service/model/zod
	comman/         # Middleware, validation, utils, response helpers
	db/             # MongoDB connection
	index.ts        # App entrypoint
```

## Environment Variables

Create a `.env` file in project root:

```env
PORT=8080
MONGO_DB_URL=mongodb://127.0.0.1:27017/todo
JWT_ACCESS_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=auth@example.com
```

## Install and Run

```bash
pnpm install
pnpm build
pnpm start
```

For dev watch mode:

```bash
pnpm dev
```

## API Base URL

```text
http://localhost:8080
```

## Auth Flow

1. Register with `POST /auth/register`
2. Login with `POST /auth/login`
3. Copy JWT token from response `data`
4. Send token in `Authorization` header:

```text
Authorization: Bearer <token>
```

All `/todo/*` routes are protected by JWT middleware.

## Request Validation (Zod)

Validation source files:

- `src/auth/zod/zod.modals.ts`
- `src/todo/zod/zod.modals.ts`

Current todo validation rules:

- Create todo:
	- `title`: required, string, min 1, max 120
	- `description`: optional, string, max 2000
	- `tag`: optional, string
	- `date`: optional, date/date-time input (coerced by Zod)
- Update todo:
	- all fields optional (`title`, `description`, `tag`, `date`)
	- at least one updatable field is required

## API Response Shape

Success response:

```json
{
	"success": true,
	"message": "...",
	"data": {}
}
```

Error response:

```json
{
	"success": false,
	"message": "..."
}
```

## Endpoints

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Todo (Protected)

- `POST /todo/create` - create todo
- `GET /todo` - get all todos of logged-in user
- `GET /todo/today` - get today's todos of logged-in user
- `PATCH /todo/:id` - update todo
- `DELETE /todo/:id` - delete todo

## OpenAPI Specification (Frontend Handoff)

The complete API contract is available in:

- `specfication.api.json`

This file contains:

- exact paths and methods
- auth requirements
- request body schemas aligned with Zod
- success/error response types

Frontend team can import this file in Postman/Swagger tools for quick integration.

## Sample Todo Create Request

```bash
curl --request POST \
	--url http://localhost:8080/todo/create \
	--header "Content-Type: application/json" \
	--header "Authorization: Bearer <token>" \
	--data '{
		"title": "Finish integration",
		"description": "Connect frontend with todo API",
		"tag": "work",
		"date": "2026-04-24T12:30:00.000Z"
	}'
```

## Notes

- This project uses MongoDB (no SQL schema/migrations required).
- If you want, a Swagger UI route can be added to serve `specfication.api.json` directly from the backend.
