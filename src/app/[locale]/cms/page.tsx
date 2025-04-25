export default function CMSHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Área protegida - CMS</h1>
      <p className="mb-4">
        Esta es una página protegida que requiere autenticación.
      </p>
      <div className="p-4 bg-blue-100 border-l-4 border-blue-500 rounded">
        <p className="text-blue-700">
          Si puedes ver esta página, significa que estás autenticado o que el
          middleware está permitiendo el acceso temporalmente para fines de
          desarrollo.
        </p>
      </div>
    </div>
  );
}
