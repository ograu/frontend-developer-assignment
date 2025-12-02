import { EmailList } from "./EmailList";
import { UIRecipients } from "./types";

type Props = {
  companyRecipients: UIRecipients["companyRecipients"];
  individualRecipients: UIRecipients["individualRecipients"];
  onClickRecipient: (recipient: string) => void;
  onClickCompany: (domain: string) => void;
  errorMessage?: string;
};

export const Recipients = ({
  companyRecipients,
  individualRecipients,
  onClickRecipient,
  onClickCompany,
  errorMessage,
}: Props) => {
  const handleOnClickCompany = (
    event: React.MouseEvent<HTMLElement>,
    domain: string
  ) => {
    event.preventDefault();
    onClickCompany(domain);
  };

  return (
    <>
      <ul>
        {Object.entries(companyRecipients).map(([domain, emails]) => (
          <li key={domain}>
            <details open className="cursor-pointer">
              <summary>
                <strong onClick={(e) => handleOnClickCompany(e, domain)}>
                  {domain}
                </strong>
              </summary>
              <div className="pl-8 mb-4">
                <EmailList
                  recipients={emails}
                  onClickRecipient={onClickRecipient}
                />
              </div>
            </details>
          </li>
        ))}
      </ul>

      <div className="pl-3.5 mb-2">
        <EmailList
          recipients={individualRecipients}
          onClickRecipient={onClickRecipient}
        />
      </div>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </>
  );
};
