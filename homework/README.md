# TaskFlow API — Kurulum Notu

Node.js ve Express ile yazılmış görev yönetimi REST API'si. Veriler bellekte tutulur.

## Gereksinimler

- Node.js 18 veya üzeri
- npm
- Test için Postman

## Kurulum ve Çalıştırma

```bash
cd taskflow
npm install
npm start          # veya: npm run dev (nodemon ile otomatik yeniden başlatma)
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır. Farklı port için:

```bash
PORT=4000 npm start
```

Başarılı açılışta konsolda şu mesaj görünür:

```
TaskFlow API http://localhost:3000 adresinde calisiyor.
```

Sağlık kontrolü: `GET http://localhost:3000/` → `{ "message": "TaskFlow API calisiyor." }`

## Endpoint'ler

| Metot | Yol | İşlev |
|---|---|---|
| POST | `/tasks` | Görev ekle |
| GET | `/tasks` | Listele (`status`, `priority`, `page`, `limit`, `sort`) |
| GET | `/tasks/search?keyword=` | Ara |
| GET | `/tasks/assignee/:name` | Kişiye göre listele |
| GET | `/tasks/:id` | Detay |
| PUT | `/tasks/:id` | Güncelle |
| DELETE | `/tasks/:id` | Sil |
| GET | `/reports/completed`, `/reports/pending`, `/reports/summary` | Raporlar |

Örnek POST gövdesi:

```json
{ "title": "Backend kurulumu", "description": "Express projesini kur", "priority": "high", "assignee": "musa" }
```

Ayrıntılar için: [../docs/api-documentation.md](../docs/api-documentation.md)

## Notlar

- Sunucu yeniden başlatılınca tüm görevler silinir.
- Her istek `logs/requests.log` dosyasına yazılır.
