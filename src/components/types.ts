export type APIRecipient = {
  email: string;
  isSelected: boolean;
};

export type UIRecipient = {
  email: string;
  isCompanyEmail: boolean;
};

export type UIRecipients = {
  companyRecipients: Record<string, string[]>;
  individualRecipients: string[];
};
