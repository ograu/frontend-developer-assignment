export const EmailList = ({ recipients }: { recipients: string[] }) => {
  return (
    <ul>
      {recipients.map((recipient) => (
        <li key={recipient}>{recipient}</li>
      ))}
    </ul>
  );
};
