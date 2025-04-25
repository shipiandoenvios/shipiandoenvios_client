import { Resend } from "resend";

// Instancia de Resend (usa tu API key real en producción)
const resend = new Resend(process.env.RESEND_API_KEY!);

// Define los tipos de variables para cada template
type TemplateVars = {
  welcome: {
    name: string;
    email: string;
    password: string;
    fromName: string;
  };
  resetPassword: { link: string };
};

const templates: {
  [K in keyof TemplateVars]: (vars: TemplateVars[K]) => string;
} = {
  welcome: ({ name, email, password, fromName }) => `
  <div style="font-family: Arial, sans-serif; color: #222; max-width: 480px;">
    <h1 style="font-size: 2rem; margin-bottom: 0.5rem; text-align: left;">Bienvenido ${name},</h1>
    <p style="margin: 0 0 16px 0; text-align: left;">Gracias por unirte a Sopy.</p>
    <p style="margin: 0 0 16px 0; text-align: left;">
      <strong>Tu email es:</strong> ${email}<br/>
      <strong>Tu contraseña es:</strong> ${password}
    </p>
    <p style="margin: 0 0 16px 0; text-align: left;">
      Por favor ingresa al sistema y actualízala.
    </p>
    <p style="margin: 0 0 16px 0; text-align: left;">
      Puedes ingresar a tu cuenta desde: <a href="https://sopy.cl/es/auth/login" style="color: #0F8E95; text-decoration: underline;">https://sopy.cl/es/auth/login</a>
    </p>
    <p style="margin: 0 0 24px 0; text-align: left;">
      Atentamente,<br/>${fromName}
    </p>
    <img 
      src="https://sopy.cl/logo_sopy.png" 
      alt="Logo Sopy" 
      style="width: 120px; margin-top: 16px; display: block;"
    />
  </div>
  `,
  resetPassword: ({ link }) =>
    `<p>Haz clic <a href="${link}">aquí</a> para restablecer tu contraseña.</p>`,
};

type SendEmailOptions<K extends keyof TemplateVars> = {
  to: string | string[];
  subject: string;
  templateName: K;
  templateVars: TemplateVars[K];
  from?: string;
};

export async function sendEmail<K extends keyof TemplateVars>({
  to,
  subject,
  templateName,
  templateVars,
  from = "Sopy <no-reply@sopy.cl>",
}: SendEmailOptions<K>) {
  const html = templates[templateName]
    ? templates[templateName](templateVars)
    : "";

  if (!html) throw new Error("Template no encontrado");

  return resend.emails.send({
    from,
    to,
    subject,
    html,
  });
}

// Ejemplo de uso tipado:
// await sendEmail({
//   to: 'usuario@correo.com' || ['correo1@gmail.com', 'correo2@gmail.com'],
//   subject: 'Bienvenido a Sopy',
//   templateName: 'welcome',
//   templateVars: { name: 'Juan' },
// });
