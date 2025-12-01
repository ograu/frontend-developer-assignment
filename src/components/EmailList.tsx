type Props = {
  recipients: string[];
  onClickRecipient: (recipient: string) => void;
  errorMessage?: string;
};

export const EmailList = ({
  recipients,
  onClickRecipient,
  errorMessage,
}: Props) => {
  return (
    <>
      {" "}
      <ul>
        {recipients.map((recipient) => (
          <li key={recipient} onClick={() => onClickRecipient(recipient)}>
            {recipient}
          </li>
        ))}
      </ul>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </>
  );
};
