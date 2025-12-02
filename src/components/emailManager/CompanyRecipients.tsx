import { RecipientList } from "./RecipientList";
import { UIRecipients } from "./types";

type Props = {
  companyRecipients: UIRecipients["companyRecipients"];
  onClickRecipient: (recipient: string) => void;
  onClickCompany: (domain: string) => void;
};

export const CompanyRecipients = ({
  companyRecipients,
  onClickRecipient,
  onClickCompany,
}: Props) => {
  const handleOnClickCompany = (
    event: React.MouseEvent<HTMLElement>,
    domain: string
  ) => {
    event.preventDefault();
    onClickCompany(domain);
  };

  return (
    <ul>
      {Object.entries(companyRecipients).map(([domain, emails]) => (
        <li key={domain}>
          <details open className="cursor-pointer">
            <summary>
              <strong onClick={(e) => handleOnClickCompany(e, domain)}>
                {domain}
              </strong>
            </summary>
            <div className="pl-8">
              <RecipientList
                recipients={emails}
                onClickRecipient={onClickRecipient}
              />
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
};
