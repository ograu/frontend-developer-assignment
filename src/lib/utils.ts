import { APIRecipient, UIRecipients } from "@/components/types";

export const getUIRecipients = (apiRecipients: APIRecipient[]) => {
  const availableRecipients = apiRecipients
    .filter((r) => !r.isSelected)
    .map(({ email }) => email);
  const selectedRecipients = apiRecipients
    .filter((r) => r.isSelected)
    .map(({ email }) => email);

  return {
    availableRecipients,
    selectedRecipients,
  };
};

export const processRecipients = (emails: string[]): UIRecipients => {
  const recipients: UIRecipients = {
    companyRecipients: {},
    individualRecipients: [],
  };

  const companyEmails = getCompanyEmails(emails);

  emails.forEach((email) => {
    const isCompanyEmail = companyEmails.includes(getDomain(email));
    insertEmail(email, isCompanyEmail, recipients);
  });

  recipients.individualRecipients.sort((a, b) =>
    getDomain(a).localeCompare(getDomain(b))
  );

  // Sort emails within each domain and recreate object with sorted domain keys
  recipients.companyRecipients = Object.keys(recipients.companyRecipients)
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, domain) => {
      acc[domain] = recipients.companyRecipients[domain].sort((a, b) =>
        a.localeCompare(b)
      );
      return acc;
    }, {} as Record<string, string[]>);

  return recipients;
};

const insertEmail = (
  email: string,
  isCompanyEmail: boolean,
  recipients: UIRecipients
) => {
  const domain = getDomain(email);

  if (isCompanyEmail) {
    if (!recipients.companyRecipients[domain]) {
      recipients.companyRecipients[domain] = [];
    }
    recipients.companyRecipients[domain].push(email);
    return;
  }

  recipients.individualRecipients.push(email);
};

export function getCompanyEmails(recipients: string[]) {
  const groupedDomains = recipients.reduce((acc, recipient) => {
    const domain = getDomain(recipient);

    if (!acc[domain]) {
      acc[domain] = [];
    }

    acc[domain].push(recipient);

    return acc;
  }, {} as Record<string, string[]>);

  return Object.keys(groupedDomains).filter((domain) => {
    return groupedDomains[domain].length > 1;
  });
}

const getDomain = (email: string) => email.split("@")[1];
