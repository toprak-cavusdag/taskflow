# TaskFlow API

Ekip görevlerini takip etmek için geliştirilmiş, Node.js ve Express ile yazılmış bir REST API.

Görev oluşturma, listeleme, güncelleme ve silme; durum/öncelik filtreleme, anahtar kelime arama, kişi bazlı listeleme, sayfalama, sıralama ve raporlama özelliklerini içerir. Veriler bellekte tutulur, harici bir veritabanı gerektirmez.

## Gereksinimler

- Node.js 18 veya üzeri
- npm

## Kurulum

```bash
git clone <repo-url>
cd taskflow
npm install
```

## Çalıştırma

```bash
npm start        # üretim modu
npm run dev      # geliştirme modu (nodemon ile otomatik yeniden başlatma)
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır. Başka bir port için:

```bash
PORT=4000 npm start
```

Çalışıp çalışmadığını kontrol etmek için:

```bash
curl http://localhost:3000/
# {"message":"TaskFlow API calisiyor."}
```

## Görev Modeli

| Alan | Tip | Zorunlu | Açıklama |
|---|---|---|---|
| `id` | string (UUID) | — | Sunucu tarafından üretilir |
| `title` | string | ✅ | Görev başlığı |
| `description` | string | ✅ | Görev açıklaması |
| `priority` | `low` \| `medium` \| `high` | ✅ | Öncelik |
| `assignee` | string | ✅ | Atanan kişi |
| `status` | `pending` \| `in-progress` \| `completed` | — | Varsayılan `pending` |
| `createdAt` | ISO 8601 | — | Sunucu tarafından üretilir |
| `updatedAt` | ISO 8601 | — | Sunucu tarafından üretilir |

## Endpoint'ler

| Metot | Yol | Açıklama |
|---|---|---|
| POST | `/tasks` | Görev oluşturur |
| GET | `/tasks` | Görevleri listeler; filtre, sıralama ve sayfalama destekler |
| GET | `/tasks/search?keyword=...` | Başlık ve açıklamada arama yapar |
| GET | `/tasks/assignee/:name` | Belirli bir kişiye atanmış görevleri listeler |
| GET | `/tasks/:id` | Tek bir görevi döndürür |
| PUT | `/tasks/:id` | Görevi günceller |
| DELETE | `/tasks/:id` | Görevi siler (`204 No Content`) |
| GET | `/reports/completed` | Tamamlanan görevlerin sayısı ve listesi |
| GET | `/reports/pending` | Bekleyen görevlerin sayısı ve listesi |
| GET | `/reports/summary` | Toplam sayı, duruma ve önceliğe göre dağılım |

### Listeleme parametreleri (`GET /tasks`)

| Parametre | Örnek | Açıklama |
|---|---|---|
| `status` | `?status=completed` | Duruma göre filtreler |
| `priority` | `?priority=high` | Önceliğe göre filtreler |
| `sort` | `?sort=createdAt`, `?sort=-createdAt` | Alana göre artan/azalan sıralar (`-` azalan) |
| `page` | `?page=2` | Sayfa numarası (varsayılan `1`) |
| `limit` | `?limit=5` | Sayfa başına kayıt (varsayılan `10`) |

Parametreler birlikte kullanılabilir: `GET /tasks?priority=high&sort=-createdAt&page=1&limit=5`

### Örnek istekler

```bash
# Görev oluştur
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Backend kurulumu","description":"Express projesini kur","priority":"high","assignee":"musa"}'

# Tamamlanan görevleri listele
curl "http://localhost:3000/tasks?status=completed"

# "backend" kelimesini ara
curl "http://localhost:3000/tasks/search?keyword=backend"

# Bir kişinin görevleri
curl http://localhost:3000/tasks/assignee/musa

# Görevi tamamla
curl -X PUT http://localhost:3000/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Backend kurulumu","description":"Express projesini kur","priority":"high","assignee":"musa","status":"completed"}'
```

Tüm endpoint'lerin istek ve yanıt örnekleri için [docs/api-documentation.md](docs/api-documentation.md) dosyasına bakın.

## Hata Yanıtları

| Kod | Ne zaman |
|---|---|
| 400 | Doğrulama hatası (`{ "error": "Validation failed", "details": [...] }`) |
| 404 | Görev veya endpoint bulunamadı |
| 500 | Beklenmeyen sunucu hatası |

## Proje Yapısı

```
taskflow/
├── server.js                 # giriş noktası
├── src/
│   ├── app.js                # Express uygulaması ve middleware kaydı
│   ├── routes/               # endpoint tanımları
│   ├── controllers/          # istek/yanıt mantığı
│   ├── middleware/           # logger, doğrulama, hata yakalama
│   └── models/taskStore.js   # bellek içi veri deposu
├── docs/
│   ├── api-documentation.md  # API referansı
│   └── kullanim-kilavuzu.md  # istemci tarafı kullanım kılavuzu
└── homework/                 # proje tanıtım dokümanı ve Postman test ekran görüntüleri
```

## Notlar

- Veriler bellekte tutulur. Sunucu yeniden başlatıldığında tüm görevler silinir.
- Her istek, sunucu çalıştığı sürece `logs/requests.log` dosyasına yazılır.
- Kimlik doğrulama yoktur. Bu bir eğitim/demo projesidir.
