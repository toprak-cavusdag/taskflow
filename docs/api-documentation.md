# API Dokümantasyonu — TaskFlow

Base URL: `http://localhost:3000`

## Veri Modeli — Task

| Alan | Tip | Zorunlu | Açıklama |
|---|---|---|---|
| `id` | string (UUID) | sistem tarafından üretilir | Görev kimliği |
| `title` | string | ✅ | Görev başlığı |
| `description` | string | ✅ | Görev açıklaması |
| `priority` | `"low" \| "medium" \| "high"` | ✅ | Öncelik |
| `assignee` | string | ✅ | Atanan kişi |
| `status` | `"pending" \| "in-progress" \| "completed"` | ❌ (varsayılan `"pending"`) | Durum |
| `createdAt` | ISO 8601 string | sistem tarafından üretilir | Oluşturulma zamanı |
| `updatedAt` | ISO 8601 string | sistem tarafından üretilir | Son güncelleme zamanı |

Doğrulama kuralları (Validation middleware): `title`, `description`, `assignee` boş olmayan string olmalı; `priority` yukarıdaki üç değerden biri olmalı; `status` gönderilirse yukarıdaki üç değerden biri olmalı. Kural ihlalinde `400 Bad Request` döner.

---

## Görev (Task) Endpoint'leri

### `POST /tasks` — Görev Ekleme

Request body:
```json
{
  "title": "Backend kurulumu",
  "description": "Express projesini kur",
  "priority": "high",
  "assignee": "musa"
}
```

Response `201 Created`:
```json
{
  "id": "d9d24604-5d03-44fe-bf8d-1c3b214a9044",
  "title": "Backend kurulumu",
  "description": "Express projesini kur",
  "priority": "high",
  "assignee": "musa",
  "status": "pending",
  "createdAt": "2026-09-16T11:23:15.044Z",
  "updatedAt": "2026-09-16T11:23:15.044Z"
}
```

Response `400 Bad Request` (örn. `title` eksik):
```json
{
  "error": "Validation failed",
  "details": ["title alani zorunludur ve bos olmayan bir metin olmalidir."]
}
```

### `GET /tasks` — Görev Listeleme

Query parametreleri (hepsi opsiyonel, birlikte kullanılabilir):

| Parametre | Örnek | Açıklama |
|---|---|---|
| `status` | `?status=completed` | Duruma göre filtreler |
| `priority` | `?priority=high` | Önceliğe göre filtreler |
| `sort` | `?sort=createdAt` / `?sort=-createdAt` | Artan/azalan sıralar |
| `page` | `?page=2` | Sayfa numarası (varsayılan 1) |
| `limit` | `?limit=10` | Sayfa başına kayıt (varsayılan 10) |

Response `200 OK`:
```json
{
  "data": [ { "id": "...", "title": "...", "...": "..." } ],
  "pagination": { "page": 1, "limit": 10, "total": 2, "totalPages": 1 }
}
```

### `GET /tasks/search?keyword=...` — Görev Arama

`title` ve `description` alanlarında büyük/küçük harf duyarsız arama yapar.

```
GET /tasks/search?keyword=backend
```

Response `200 OK`: `{ "data": [...], "count": 1 }`

Response `400 Bad Request` (keyword eksikse): `{ "error": "Validation failed", "details": ["keyword query parametresi zorunludur."] }`

### `GET /tasks/assignee/:name` — Kullanıcı Bazlı Listeleme

```
GET /tasks/assignee/musa
```

Response `200 OK`: `{ "data": [...], "count": 1 }`

### `GET /tasks/:id` — Görev Detayı

Response `200 OK`: görev nesnesi.

Response `404 Not Found`: `{ "error": "Gorev bulunamadi: <id>" }`

### `PUT /tasks/:id` — Görev Güncelleme

Request body (POST ile aynı doğrulama kuralları geçerlidir; `status` opsiyoneldir):
```json
{
  "title": "Backend kurulumu (güncellendi)",
  "description": "Express projesini kur",
  "priority": "medium",
  "assignee": "musa",
  "status": "in-progress"
}
```

Response `200 OK`: güncellenmiş görev nesnesi.

Response `404 Not Found`: görev bulunamadığında.
Response `400 Bad Request`: doğrulama hatası olduğunda.

### `DELETE /tasks/:id` — Görev Silme

Response `204 No Content` (başarılı silme, gövde boş döner).

Response `404 Not Found`: görev bulunamadığında.

---

## Raporlama Endpoint'leri

### `GET /reports/completed`

`status=completed` olan görevlerin sayısı ve görevlerin kendisi (`data` dizisi) döner.

```json
{
  "completedCount": 1,
  "data": [
    {
      "id": "d9d24604-5d03-44fe-bf8d-1c3b214a9044",
      "title": "Backend kurulumu",
      "description": "Express projesini kur",
      "priority": "high",
      "assignee": "musa",
      "status": "completed",
      "createdAt": "2026-09-16T11:23:15.044Z",
      "updatedAt": "2026-09-16T11:30:00.000Z"
    }
  ]
}
```

### `GET /reports/pending`

`status=pending` olan görevlerin sayısı ve görevlerin kendisi (`data` dizisi) döner.

```json
{
  "pendingCount": 1,
  "data": [
    {
      "id": "d9d24604-5d03-44fe-bf8d-1c3b214a9044",
      "title": "Backend kurulumu",
      "description": "Express projesini kur",
      "priority": "high",
      "assignee": "musa",
      "status": "pending",
      "createdAt": "2026-09-16T11:23:15.044Z",
      "updatedAt": "2026-09-16T11:30:00.000Z"
    }
  ]
}
```

### `GET /reports/summary`

```json
{
  "totalTasks": 2,
  "byStatus": { "pending": 1, "in-progress": 0, "completed": 1 },
  "byPriority": { "low": 1, "medium": 0, "high": 1 }
}
```

---

## Genel Hata Formatları

| Durum | Kod | Gövde |
|---|---|---|
| Bilinmeyen endpoint | 404 | `{ "error": "Endpoint bulunamadi: <method> <path>" }` |
| Doğrulama hatası | 400 | `{ "error": "Validation failed", "details": [...] }` |
| Sunucu hatası | 500 | `{ "error": "<mesaj>" }` |
