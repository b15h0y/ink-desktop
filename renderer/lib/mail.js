import { createTransport } from 'nodemailer';

export async function inviteCollaborators(
  collaborators,
  message,
  projectName,
  remoteUrl,
  user
) {
  collaborators = !Array.isArray(collaborators)
    ? [collaborators]
    : collaborators;

  const transport = createTransport({
    pool: true,
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_TOKEN,
    },
  });

  const body = `${user.email} has invited you to a new session on ununu for their project “${projectName}”.
<p>Click <a href="https://ununu.io/redirect.html?url=${remoteUrl}">here</a> to start collaborating</p>
Their message:

${message}`.replace(/\n/g, '<br>');

  const mailOptions = {
    from: '"Ink Collaborator" <matters@ununu.io>',
    to: collaborators.join(','),
    subject: `You've been invited to collaborate on ${projectName}`,
    html: body,
  };

  return await transport.sendMail(mailOptions);
}
