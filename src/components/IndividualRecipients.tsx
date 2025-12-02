import { EmailList } from "./EmailList";
import { UIRecipients } from "./types";

type Props = {
  individualRecipients: UIRecipients["individualRecipients"];
  onClickRecipient: (recipient: string) => void;
};

export const IndividualRecipients = ({
  individualRecipients,
  onClickRecipient,
}: Props) => (
  <div className="pl-3.5 mb-2">
    <EmailList
      recipients={individualRecipients}
      onClickRecipient={onClickRecipient}
    />
  </div>
);
