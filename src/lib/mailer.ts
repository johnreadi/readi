export type SendEmailInput = {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
};

function getSmtpEnv() {
  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secureRaw = process.env.SMTP_SECURE;

  if (!host || !portRaw || !user || !pass) {
    return null;
  }

  const port = Number(portRaw);
  const secure = secureRaw ? secureRaw === 'true' : port === 465;

  return { host, port, user, pass, secure };
}

type TransporterLike = {
  sendMail: (options: {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
    replyTo?: string;
  }) => Promise<unknown>;
};

let cachedTransporter: TransporterLike | null = null;

async function getTransporter(): Promise<TransporterLike> {
  if (cachedTransporter) return cachedTransporter;

  let nodemailer: typeof import('nodemailer');
  try {
    nodemailer = await import('nodemailer');
  } catch {
    throw new Error(
      'Le module nodemailer n\'est pas installé. Installe-le (npm i nodemailer) ou configure un autre mécanisme d\'envoi.'
    );
  }

  const smtp = getSmtpEnv();
  if (!smtp) {
    throw new Error(
      'Configuration SMTP manquante. Définis SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (et optionnellement SMTP_SECURE) dans les variables d\'environnement.'
    );
  }

  cachedTransporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });

  return cachedTransporter;
}

export async function sendEmail(input: SendEmailInput) {
  const transporter = await getTransporter();
  return transporter.sendMail({
    from: input.from,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
    replyTo: input.replyTo,
  });
}
