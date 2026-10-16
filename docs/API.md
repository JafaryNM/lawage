# LawAge API

JSON API behind the admin dashboard, served by Next.js route handlers under `src/app/api`.
The admin UI calls it with TanStack Query (`src/lib/api`).

## Conventions

- **Success:** `{ "data": … }`, or `204 No Content` with no body.
- **Errors:** `{ "error": { "message": string, "fieldErrors"?: { [field]: string } } }`

  | Status | Meaning |
  | ------ | ------- |
  | 400 | Validation failed; `fieldErrors` names the fields |
  | 401 | Not signed in, or the session expired |
  | 403 | Request came from another site (origin check) |
  | 404 | Not found |
  | 500 | Unexpected server error |

- **Auth:** signing in sets the httpOnly cookie `lawage_admin_session` (7 days). All `/api/admin/*`
  routes require it. Requests that change data must come from this site's own origin.
- After any slide change, the home page is regenerated so visitors see it immediately.

## Types

```ts
type Admin = { id: number; username: string; name: string };

type SlideFocus = "center" | "top" | "bottom";

type AdminSlide = {
  id: number;
  title: string;
  description: string;
  image: string;        // "builtin:<name>" or "upload:<file>"
  imageUrl: string;     // ready-to-use URL
  imageAlt: string;
  focus: SlideFocus;    // which part of the photo stays in view when cropped
  primaryLabel: string; // "" = no button
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  sortOrder: number;
  isActive: boolean;
};

type PublicSlide = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  focus: SlideFocus;
  primary: { label: string; href: string } | null;
  secondary: { label: string; href: string } | null;
};
```

## Auth

| Method | Path | Body | Response |
| ------ | ---- | ---- | -------- |
| `POST` | `/api/auth/login` | `{ username, password }` | `200 { data: Admin }` + session cookie · `400` · `401` wrong username or password |
| `POST` | `/api/auth/logout` | – | `204`, cookie cleared |
| `GET` | `/api/auth/me` | – | `200 { data: Admin }` · `401` |

## Public

| Method | Path | Response |
| ------ | ---- | -------- |
| `GET` | `/api/slides` | `200 { data: PublicSlide[] }`, visible slides in order (built-in slides if none) |

## Hero slides (admin)

| Method | Path | Body | Response |
| ------ | ---- | ---- | -------- |
| `GET` | `/api/admin/slides` | – | `200 { data: AdminSlide[] }`, all slides in order |
| `POST` | `/api/admin/slides` | `multipart/form-data`, see below | `201 { data: AdminSlide }` · `400` |
| `GET` | `/api/admin/slides/:id` | – | `200 { data: AdminSlide }` · `404` |
| `PUT` | `/api/admin/slides/:id` | `multipart/form-data`, see below | `200 { data: AdminSlide }` · `400` · `404` |
| `PATCH` | `/api/admin/slides/:id` | `{ isActive: boolean }` | `200 { data: AdminSlide }` · `404` |
| `DELETE` | `/api/admin/slides/:id` | – | `204` · `404` |
| `POST` | `/api/admin/slides/:id/move` | `{ direction: "up" \| "down" }` | `200 { data: AdminSlide[] }`, the new order |

**Slide form fields** (`POST` and `PUT`):

| Field | Rules |
| ----- | ----- |
| `title` | required, ≤ 120 characters |
| `description` | ≤ 300 characters |
| `imageFile` | optional file: JPG, PNG or WebP, ≤ 5 MB. Takes priority over `builtinImage` |
| `builtinImage` | optional: `builtin:law-library`, `builtin:handshake-file`, `builtin:legal-tech` |
| `imageAlt` | ≤ 160 characters; defaults to the title |
| `focus` | `center` \| `top` \| `bottom` |
| `primaryLabel`, `primaryHref`, `secondaryLabel`, `secondaryHref` | label ≤ 30; link starts with `/`, `#`, `http(s)://`, `tel:` or `mailto:`; a button needs both or neither |
| `isActive` | `"true"` or `"false"` |

A new slide must have a photo (`imageFile` or `builtinImage`). On `PUT`, leaving both out keeps
the current photo. A replaced or deleted uploaded photo is removed from disk once nothing uses it.

## Files

| Method | Path | Response |
| ------ | ---- | -------- |
| `GET` | `/uploads/slides/:file` | The uploaded photo, cached as immutable |
