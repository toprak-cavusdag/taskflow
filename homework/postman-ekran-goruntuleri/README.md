# Postman Test Ekran Görüntüleri

Sunucuyu çalıştırıp (`npm start`) aşağıdaki CRUD isteklerini Postman'de gönderin. Her ekran görüntüsünde istek, **status code** ve response body görünmeli. Dosyaları bu klasöre kaydedin.

| Dosya adı | İstek | Beklenen |
|---|---|---|
| `1-create.png` | `POST /tasks` (geçerli body) | 201 Created |
| `2-create-validation.png` | `POST /tasks` (title boş) | 400 Bad Request |
| `3-list.png` | `GET /tasks` | 200 OK |
| `4-get-by-id.png` | `GET /tasks/:id` | 200 OK |
| `5-update.png` | `PUT /tasks/:id` | 200 OK |
| `6-delete.png` | `DELETE /tasks/:id` | 204 No Content |
| `7-get-after-delete.png` | `GET /tasks/:id` (silinen) | 404 Not Found |

İsteğe bağlı: `GET /tasks/search?keyword=...` ve `GET /reports/summary`.
