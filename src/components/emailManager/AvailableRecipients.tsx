import { UserMessage } from "../ui/UserMessage";
import { CompanyRecipients } from "./CompanyRecipients";
import { IndividualRecipients } from "./IndividualRecipients";
import { RecipientsBoxProps } from "./types";

export const AvailableRecipients = ({
  companyRecipients,
  individualRecipients,
  onClickRecipient,
  onClickCompany,
  userMessage,
}: RecipientsBoxProps) => (
  <>
    <div className="mb-4">
      <CompanyRecipients
        companyRecipients={companyRecipients}
        onClickRecipient={onClickRecipient}
        onClickCompany={onClickCompany}
      />
    </div>
    <IndividualRecipients
      individualRecipients={individualRecipients}
      onClickRecipient={onClickRecipient}
    />
    <UserMessage message={userMessage} />
  </>
);
