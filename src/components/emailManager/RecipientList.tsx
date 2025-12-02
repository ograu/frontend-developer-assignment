type Props = {
  recipients: string[];
  onClickRecipient: (recipient: string) => void;
};

export const RecipientList = ({ recipients, onClickRecipient }: Props) => (
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
