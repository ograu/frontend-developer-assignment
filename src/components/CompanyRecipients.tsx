import { EmailList } from "./EmailList";
import { UIRecipients } from "./types";

type Props = {
  companyRecipients: UIRecipients["companyRecipients"];
  onClickRecipient: (recipient: string) => void;
  onClickCompany: (e: React.MouseEvent<HTMLElement>, domain: string) => void;
};

export const CompanyRecipients = ({
  companyRecipients,
  onClickRecipient,
  onClickCompany,
}: Props) => (
  <ul>
    {Object.entries(companyRecipients).map(([domain, emails]) => (
      <li key={domain}>
        <details open className="cursor-pointer">
          <summary>
            <strong onClick={(e) => onClickCompany(e, domain)}>{domain}</strong>
          </summary>
          <div className="pl-8">
            <EmailList
              recipients={emails}
              onClickRecipient={onClickRecipient}
            />
          </div>
        </details>
      </li>
    ))}
  </ul>
);
