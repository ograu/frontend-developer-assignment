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

export type RecipientsBoxProps = {
  companyRecipients: UIRecipients["companyRecipients"];
  individualRecipients: UIRecipients["individualRecipients"];
  onClickRecipient: (recipient: string) => void;
  onClickCompany: (domain: string) => void;
  userMessage?: string;
};
