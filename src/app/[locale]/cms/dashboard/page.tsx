export default function CMSDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panel de administración CMS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Publicaciones</h2>
          <p className="text-gray-600">
            Administra artículos y contenido del blog
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Medios</h2>
          <p className="text-gray-600">
            Gestión de imágenes y archivos multimedia
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Comentarios</h2>
          <p className="text-gray-600">Moderación de comentarios y reseñas</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">SEO</h2>
          <p className="text-gray-600">Optimización para motores de búsqueda</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Ajustes</h2>
          <p className="text-gray-600">Configuración general del sistema</p>
        </div>
      </div>
    </div>
  );
}
