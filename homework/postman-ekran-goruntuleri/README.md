# Postman Test Ekran Görüntüleri

Her ekran görüntüsünde istek, status code ve response body birlikte görünmelidir.

| Senaryo | İstek | Beklenen | Dosya adı |
|---|---|---|---|
| 1.1 | `POST /tasks` (geçerli body) | 201 | `1.1-create.png` |
| 1.2 | `POST /tasks` (title boş) | 400 | `1.2-create-validation.png` |
| 1.3 | `POST /tasks` (priority `urgent`) | 400 | `1.3-create-invalid-priority.png` |
| 2.1 | `GET /tasks` | 200 | `2.1-list.png` |
| 3.1 | `GET /tasks/search?keyword=...` | 200 | `3.1-search.png` |
| 4.1 | `GET /tasks/assignee/:name` | 200 | `4.1-assignee.png` |
| 5.1 | `GET /tasks/:id` | 200 | `5.1-get-by-id.png` |
| 5.2 | `GET /tasks/:id` (olmayan id) | 404 | `5.2-get-not-found.png` |
| 6.1 | `PUT /tasks/:id` | 200 | `6.1-update.png` |
| 6.2 | `PUT /tasks/:id` (olmayan id) | 404 | `6.2-update-not-found.png` |
| 6.3 | `PUT /tasks/:id` (assignee boş) | 400 | `6.3-update-validation.png` |
| 7.1 | `DELETE /tasks/:id` | 204 | `7.1-delete.png` |
| 7.2 | `DELETE /tasks/:id` (silinmiş id) | 404 | `7.2-delete-not-found.png` |
| 8.1 | `GET /reports/completed` | 200 | `8.1-completed.png` |
| 8.2 | `GET /reports/pending` | 200 | `8.2-pending.png` |
| 8.3 | `GET /reports/summary` | 200 | `8.3-summary.png` |
| 9.1 | `logs/requests.log` içeriği | — | `9.1-request-log.png` |
| 9.2 | `GET /unknown` | 404 | `9.2-unknown-route.png` |
