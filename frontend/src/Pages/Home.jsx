export default function Home() {
  return (
    <>
<section className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-gray-100" style={{ backgroundImage: 'url("https://path-to-your-background-image.jpg")' }}>
  <h1 className="text-4xl font-bold mb-8">Főoldal</h1>
  
  <div className="w-full max-w-lg bg-gray-800 bg-opacity-90 rounded-lg shadow-md p-8">
    <article className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Felhasználó:</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Email:</strong> sanyi@gmail.com</li>
        <li><strong>Jelszó:</strong> 123</li>
      </ul>
    </article>

    <article>
      <h2 className="text-2xl font-semibold mb-4">Admin felhasználó:</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Email:</strong> sasa@gmail.com</li>
        <li><strong>Jelszó:</strong> 123</li>
      </ul>
    </article>
  </div>
</section>

    </>
  );
}
