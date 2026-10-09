# Kullanım Kılavuzu — TaskFlow API Entegrasyonu

Bu kılavuz, TaskFlow API'sini bir istemci uygulamadan (frontend, script, başka bir servis) nasıl kullanacağınızı adım adım açıklar.

## 1. Sunucuyu Başlatma

```bash
npm install
npm run dev   # http://localhost:3000
```

## 2. Genel Kurallar

- Tüm istek/yanıt gövdeleri **JSON** formatındadır. İstek gövdesi gönderirken `Content-Type: application/json` header'ı eklenmelidir.
- Kimlik doğrulama gerektirmez.
- Tarihler ISO 8601 formatındadır (örn. `2026-09-16T11:23:15.044Z`).

## 3. Adım Adım: Bir Görev Oluşturup Takip Etme

**Adım 1 — Görev oluştur:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"API testi","description":"Postman ile test et","priority":"medium","assignee":"ayse"}'
```
Dönen yanıttaki `id` alanını not edin (örn. `abc-123`).

**Adım 2 — Görevi listeleyip doğrula:**
```bash
curl http://localhost:3000/tasks
```

**Adım 3 — Göreve özel detay al:**
```bash
curl http://localhost:3000/tasks/abc-123
```

**Adım 4 — Görevi güncelle (örn. durumu "in-progress" yap):**
```bash
curl -X PUT http://localhost:3000/tasks/abc-123 \
  -H "Content-Type: application/json" \
  -d '{"title":"API testi","description":"Postman ile test et","priority":"medium","assignee":"ayse","status":"in-progress"}'
```

**Adım 5 — Görevi tamamlandı yap:**
```bash
curl -X PUT http://localhost:3000/tasks/abc-123 \
  -H "Content-Type: application/json" \
  -d '{"title":"API testi","description":"Postman ile test et","priority":"medium","assignee":"ayse","status":"completed"}'
```

**Adım 6 — Genel özet raporunu kontrol et:**
```bash
curl http://localhost:3000/reports/summary
```

**Adım 7 — Görevi sil:**
```bash
curl -X DELETE http://localhost:3000/tasks/abc-123
```

## 4. Filtreleme / Arama / Sayfalama Kullanımı

```bash
# Sadece tamamlanan görevler
curl "http://localhost:3000/tasks?status=completed"

# Öncelik + sayfalama birlikte
curl "http://localhost:3000/tasks?priority=high&page=1&limit=5"

# Anahtar kelime araması
curl "http://localhost:3000/tasks/search?keyword=api"

# Kişi bazlı listeleme
curl "http://localhost:3000/tasks/assignee/ayse"

# Oluşturulma tarihine göre en yeniden en eskiye sıralama
curl "http://localhost:3000/tasks?sort=-createdAt"
```

## 5. Hata Yönetimi

İstemci tarafında, dönen HTTP status koduna göre davranış ayarlanmalıdır:

| Kod | Anlamı | İstemci Aksiyonu |
|---|---|---|
| `400` | Doğrulama hatası | `error.details` dizisindeki mesajları kullanıcıya göster |
| `404` | Kayıt/endpoint bulunamadı | Kullanıcıya "bulunamadı" mesajı göster |
| `500` | Sunucu hatası | Genel hata mesajı göster, tekrar denemeyi öner |

## 6. Postman ile Test

İstekleri Postman'de elle oluşturup sırayla çalıştırabilirsiniz (base URL: `http://localhost:3000`). Örnek test sonuçları için [homework/postman-ekran-goruntuleri/](../homework/postman-ekran-goruntuleri/) klasörüne bakın.
