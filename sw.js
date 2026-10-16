// Service Worker لتطبيق ALIXOR Planner
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// استقبال أمر إظهار الإشعار وعرضه فوراً
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const title = event.data.title || 'ALIXOR PLANNER ✦';
    const options = {
      body: event.data.body || 'لا تنسَ تسجيل حصاد اليوم في الأركان الأربعة!',
      icon: './icon-512.png',
      badge: './icon-512.png',
      vibrate: [200, 100, 200],
      dir: 'rtl',
      lang: 'ar',
      data: { url: './index.html' }
    };
    self.registration.showNotification(title, options);
  }
});

// فتح التطبيق عند نقر المستخدم على الإشعار
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('./index.html');
      }
    })
  );
});
