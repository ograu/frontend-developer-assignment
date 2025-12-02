import { UIRecipients } from "./types";

type Props = {
  companyRecipients: UIRecipients["companyRecipients"];
  individualRecipients: UIRecipients["individualRecipients"];
  onClickRecipient: (recipient: string) => void;
  errorMessage?: string;
};

export const EmailList = ({
  companyRecipients,
  individualRecipients,
  onClickRecipient,
  errorMessage,
}: Props) => {
  return (
    <>
      <ul>
        {Object.entries(companyRecipients).map(([domain, emails]) => (
          <li key={domain}>
            <strong>{domain}</strong>
            <RecipientList
              recipients={emails}
              onClickRecipient={onClickRecipient}
            />
          </li>
        ))}
      </ul>

      <RecipientList
        recipients={individualRecipients}
        onClickRecipient={onClickRecipient}
      />
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </>
  );
};

const RecipientList = ({
  recipients,
  onClickRecipient,
}: {
  recipients: string[];
  onClickRecipient: (recipient: string) => void;
}) => (
  <ul>
    {recipients.map((email) => (
      <li
        className="cursor-pointer"
        key={email}
        onClick={() => onClickRecipient(email)}
      >
        {email}
      </li>
    ))}
  </ul>
);
