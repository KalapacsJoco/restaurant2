// import React from 'react';
import { useTranslation } from 'react-i18next'; // 1. Importáljuk a useTranslation hookot

export default function Home() {
  const { t } = useTranslation(); // 2. Inicializáljuk a fordításokat

  return (
    <>
      <section
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-gray-100"
        style={{ backgroundImage: 'url("https://path-to-your-background-image.jpg")' }}
      >
        <h1 className="text-4xl font-bold mb-8">{t('homepage_title')}</h1> {/* 3. A főoldal címének fordítása */}
        
        <div className="w-full max-w-lg bg-gray-800 bg-opacity-90 rounded-lg shadow-md p-8">
          <article className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">{t('user_title')}</h2> {/* 4. "Felhasználó:" fordítása */}
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>{t('email')}:</strong> sanyi@gmail.com {/* 5. "Email:" fordítása */}
              </li>
              <li>
                <strong>{t('password')}:</strong> 123 {/* 6. "Jelszó:" fordítása */}
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-4">{t('admin_user_title')}</h2> {/* 7. "Admin felhasználó:" fordítása */}
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>{t('email')}:</strong> sasa@gmail.com {/* 8. "Email:" fordítása */}
              </li>
              <li>
                <strong>{t('password')}:</strong> 123 {/* 9. "Jelszó:" fordítása */}
              </li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
