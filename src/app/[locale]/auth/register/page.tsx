import { Link } from "@/packages/internationalization";
import { RegisterForm } from "./components/RegisterFrom";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-md p-8 space-y-8 bg-gradient-to-br from-[#eef1f3] via-white to-[#d5e8f3] rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#1E4063]">
          Registrarse
        </h1>

        <RegisterForm />

        <div className="flex flex-col text-center border-t border-gray-100">
          <Link
            href={`/auth/login`}
            className="mt-4 inline-block text-sm text-[#1E4063] hover:text-[#0798F0] var(--font-nunito) font-medium transition-colors"
          >
            ¿Ya tienes cuenta? Inicia sesión aquí
          </Link>
          <Link
            href="/"
            className="mt-4 inline-block text-sm text-[#1E4063] hover:text-[#0798F0] var(--font-nunito) font-medium transition-colors"
          >
            ← Volver a inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
