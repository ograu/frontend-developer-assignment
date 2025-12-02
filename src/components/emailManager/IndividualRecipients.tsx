import { RecipientList } from "./RecipientList";
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
    <RecipientList
      recipients={individualRecipients}
      onClickRecipient={onClickRecipient}
    />
  </div>
);
