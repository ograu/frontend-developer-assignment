import { CompanyRecipients } from "./CompanyRecipients";
import { IndividualRecipients } from "./IndividualRecipients";
import { UIRecipients } from "./types";

type Props = {
  companyRecipients: UIRecipients["companyRecipients"];
  individualRecipients: UIRecipients["individualRecipients"];
  onClickRecipient: (recipient: string) => void;
  onClickCompany: (domain: string) => void;
  errorMessage?: string;
  isSelectedList?: boolean;
};

export const Recipients = ({
  companyRecipients,
  individualRecipients,
  onClickRecipient,
  onClickCompany,
  errorMessage,
  isSelectedList = false,
}: Props) => {
  const handleOnClickCompany = (
    event: React.MouseEvent<HTMLElement>,
    domain: string
  ) => {
    event.preventDefault();
    onClickCompany(domain);
  };

  if (isSelectedList) {
    return (
      <>
        <details className="cursor-pointer mb-5">
          <summary>
            <strong>company recipients</strong>
          </summary>
          <div className="pl-8 mb-4">
            <CompanyRecipients
              companyRecipients={companyRecipients}
              onClickRecipient={onClickRecipient}
              onClickCompany={handleOnClickCompany}
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
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </>
    );
  }

  return (
    <>
      <CompanyRecipients
        companyRecipients={companyRecipients}
        onClickRecipient={onClickRecipient}
        onClickCompany={handleOnClickCompany}
      />
      <IndividualRecipients
        individualRecipients={individualRecipients}
        onClickRecipient={onClickRecipient}
      />
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </>
  );
};
