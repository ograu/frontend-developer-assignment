import { UserMessage } from "../ui/UserMessage";
import { CompanyRecipients } from "./CompanyRecipients";
import { IndividualRecipients } from "./IndividualRecipients";
import { RecipientsBoxProps } from "./types";

export const SelectedRecipients = ({
  companyRecipients,
  individualRecipients,
  onClickRecipient,
  onClickCompany,
  userMessage,
}: RecipientsBoxProps) => (
  <>
    <details className="cursor-pointer mb-5">
      <summary>
        <strong>company recipients</strong>
      </summary>
      <div className="pl-8 mb-4">
        <CompanyRecipients
          companyRecipients={companyRecipients}
          onClickRecipient={onClickRecipient}
          onClickCompany={onClickCompany}
        />
      </div>
    </details>
    <details className="cursor-pointer">
      <summary>
        <strong>email recipients</strong>
      </summary>
      <div className="pl-8 mb-4">
        <IndividualRecipients
          individualRecipients={individualRecipients}
          onClickRecipient={onClickRecipient}
        />
      </div>
    </details>
    <UserMessage message={userMessage} />
  </>
);
