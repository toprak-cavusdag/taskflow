# TaskFlow API

Görev yönetimi için Node.js ve Express ile yazılmış bir REST API. Görevleri oluşturabilir, listeleyebilir, güncelleyebilir, silebilir, filtreleyebilir ve raporlayabilirsiniz. Veriler bellekte tutulur; veritabanı gerekmez.

## Gereksinimler

- Node.js 18+
- npm

## Kurulum

```bash
git clone <repo-url>
cd taskflow
npm install
```

## Çalıştırma

```bash
npm start      # üretim modu
npm run dev    # geliştirme modu (nodemon ile otomatik yeniden başlatma)
```

Sunucu `http://localhost:3000` adresinde açılır. Port değiştirmek için:

```bash
PORT=4000 npm start
```

Çalıştığını doğrulamak için:

```bash
curl http://localhost:3000/
# {"message":"TaskFlow API calisiyor."}
```

## Görev Alanları

| Alan | Tip | Zorunlu | Açıklama |
|---|---|---|---|
| `id` | UUID | Hayır | Sunucu üretir |
| `title` | string | Evet | Başlık, boş olamaz |
| `description` | string | Evet | Açıklama, boş olamaz |
| `priority` | `low`, `medium`, `high` | Evet | Öncelik |
| `assignee` | string | Evet | Atanan kişi, boş olamaz |
| `status` | `pending`, `in-progress`, `completed` | Hayır | Varsayılan `pending` |
| `createdAt`, `updatedAt` | ISO 8601 | Hayır | Sunucu üretir |

## Endpoint'ler

| Metot | Yol | Açıklama |
|---|---|---|
| POST | `/tasks` | Görev oluşturur |
| GET | `/tasks` | Görevleri listeler (filtre, sıralama, sayfalama) |
| GET | `/tasks/search?keyword=...` | Başlık ve açıklamada arama yapar |
| GET | `/tasks/assignee/:name` | Bir kişiye atanmış görevleri listeler |
| GET | `/tasks/:id` | Tek görevi döndürür |
| PUT | `/tasks/:id` | Görevi günceller |
| DELETE | `/tasks/:id` | Görevi siler (`204 No Content`) |
| GET | `/reports/completed` | Tamamlanan görevlerin sayısını ve listesini döndürür |
| GET | `/reports/pending` | Bekleyen görevlerin sayısını ve listesini döndürür |
| GET | `/reports/summary` | Toplam sayı ile duruma ve önceliğe göre dağılımı döndürür |

### `GET /tasks` parametreleri

| Parametre | Örnek | Varsayılan | Açıklama |
|---|---|---|---|
| `status` | `?status=completed` | — | Duruma göre filtreler |
| `priority` | `?priority=high` | — | Önceliğe göre filtreler |
| `sort` | `?sort=createdAt` veya `?sort=-createdAt` | — | Artan veya azalan (`-`) sıralar |
| `page` | `?page=2` | `1` | Sayfa numarası |
| `limit` | `?limit=5` | `10` | Sayfa başına kayıt |

Parametreler birlikte kullanılabilir:

```
GET /tasks?priority=high&sort=-createdAt&page=1&limit=5
```

### Örnekler

```bash
# Görev oluştur
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Backend kurulumu","description":"Express projesini kur","priority":"high","assignee":"musa"}'

# Tamamlanan görevler
curl "http://localhost:3000/tasks?status=completed"

# Anahtar kelime ara
curl "http://localhost:3000/tasks/search?keyword=backend"

# Bir kişinin görevleri
curl http://localhost:3000/tasks/assignee/musa

# Görevi tamamla
curl -X PUT http://localhost:3000/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Backend kurulumu","description":"Express projesini kur","priority":"high","assignee":"musa","status":"completed"}'
```

İstek ve yanıt örnekleri için [docs/api-documentation.md](docs/api-documentation.md), adım adım kullanım için [docs/kullanim-kilavuzu.md](docs/kullanim-kilavuzu.md) dosyalarına bakın.

## Hata Yanıtları

| Kod | Durum |
|---|---|
| 400 | Doğrulama hatası: `{ "error": "Validation failed", "details": [...] }` |
| 404 | Görev veya endpoint bulunamadı |
| 500 | Beklenmeyen sunucu hatası |

## Proje Yapısı

```
taskflow/
├── server.js                 giriş noktası
├── src/
│   ├── app.js                Express uygulaması ve middleware kaydı
│   ├── routes/               endpoint tanımları
│   ├── controllers/          istek ve yanıt mantığı
│   ├── middleware/           logger, doğrulama, hata yakalama
│   └── models/taskStore.js   bellek içi veri deposu
├── docs/                     API ve kullanım dokümanları
└── homework/                 proje tanıtımı ve Postman ekran görüntüleri
```

## Notlar

- Sunucu yeniden başlatılınca tüm görevler silinir.
- Her istek `logs/requests.log` dosyasına yazılır.
- Kimlik doğrulama yoktur.
