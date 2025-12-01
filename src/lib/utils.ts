import { Recipient } from "@/components/types";

export const getEmails = (emails: Recipient[]) => {
  let availableRecipients: string[] = [];
  let selectedRecipients: string[] = [];

  emails.forEach((email) => {
    if (email.isSelected) {
      selectedRecipients.push(email.email);
      return;
    }

    availableRecipients.push(email.email);
  });

  return {
    availableRecipients,
    selectedRecipients,
  };
};
