# Online Étterem Rendelői Felület

Ez az alkalmazás egy Laravel és React alapú webes platform, amely lehetővé teszi az ügyfelek számára, hogy online ételrendeléseket végezzenek. Tartalmaz egy adminisztrációs felületet az ételek és felhasználók kezelésére, valamint modern felhasználói élményt nyújt Tailwind CSS segítségével.

## Használt technológiák
- **Laravel**: Backend keretrendszer.
- **React**: Frontend felület.
- **Docker**: Konténerizált környezet futtatása.
- **SQLite**: Könnyen hordozható adatbázis.
- **Tailwind CSS**: Letisztult és reszponzív stílusok.

## Főbb funkciók
- Online ételrendelési lehetőség.
- Felhasználói bejelentkezés és regisztráció.
- Adminisztrációs felület ételek hozzáadásához, szerkesztéséhez és kezeléséhez.

## Telepítési útmutató (Docker)
A projekt a Docker Hub-ról könnyen letölthető a következő parancsokkal:

- docker pull kalapom/etterem-frontend:latest
- docker pull kalapom/etterem-backend:latest

Az alábbi parancsokkal indíthatja el a frontendet és a backendet helyi környezetben a Docker segítségével:

- docker network create etterem-network
- docker run -d --name backend --network etterem-network -p 8000:8000 kalapom/etterem-backend:latest
- docker run -d --name frontend --network etterem-network -p 5173:5173 kalapom/etterem-frontend:latest

**Megjegyzés:** A Play with Docker platform dinamikusan generált URL-eket és portokat használ, amelyek nem támogatják a projekt konfigurációit. Ezért ezen a platformon nem működik megfelelően. Ugyanakkor bármely Docker-támogatott környezetben (például Docker Desktop) a rendszer probléma nélkül fut.

## Tesztelési felhasználók

Az alábbi adminisztrátori és felhasználói adatok kizárólag a rendszer kipróbálására szolgálnak:

- Adminisztrátor:
  - **Email:** sasa@gmail.com
  - **Jelszó:** 123

- Felhasználó:
  - **Email:** sanyi@gmail.com
  - **Jelszó:** 123

Új felhasználók regisztrálására is lehetőség van.

## További tervek
- **Reszponzív design:** Mobilbarát elrendezés kialakítása a Tailwind CSS segítségével.
- **Értesítések:** Automatikus email-értesítések integrálása a rendelési állapotokról (pl. rendelés visszaigazolása).

## Demo képek

![Főoldal](./screenshots/dishes.PNG)
![Adminisztrációs felület](./screenshots/admin.PNG)
![Rendelési felület](./screenshots/order.PNG)

