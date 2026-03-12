'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Простая инициализация Telegram
    try {
      // @ts-ignore
      const tg = window.Telegram?.WebApp;
      
      if (tg) {
        tg.ready();
        tg.expand();
        
        if (tg.initDataUnsafe?.user) {
          setUser(tg.initDataUnsafe.user);
          console.log('Пользователь:', tg.initDataUnsafe.user);
        }
        
        // Сохраняем данные для API
        if (tg.initData) {
          localStorage.setItem('telegram-token', tg.initData);
        }
      }
    } catch (e) {
      console.error('Ошибка:', e);
    } finally {
      setIsReady(true);
    }
  }, []);

  if (!isReady) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>Загрузка...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
        Мое Telegram Mini App
      </h1>
      
      {user && (
        <div style={{
          backgroundColor: '#f0f0f0',
          padding: '15px',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h2>Привет, {user.first_name}! 👋</h2>
          <p>ID: {user.id}</p>
          {user.username && <p>Username: @{user.username}</p>}
        </div>
      )}
      
      <button
        onClick={() => alert('Работает!')}
        style={{
          backgroundColor: '#0088cc',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Нажми меня
      </button>
    </div>
  );
}