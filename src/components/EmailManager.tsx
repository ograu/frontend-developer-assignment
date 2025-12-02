import { useEffect, useRef, useState } from "react";
import emails from "../assets/recipientsData.json";
import { useDebouncedCallback } from "../hooks/useDebouncedCallback";
import { getUIRecipients, processRecipients } from "../lib/utils";
import { Box } from "./Box";
import { Recipients } from "./Recipients";
import { UIRecipients } from "./types";

const UIRecipientsFactory = (): UIRecipients => ({
  companyRecipients: {},
  individualRecipients: [],
});

export const EmailManager = () => {
  const [availableEmails, setAvailableEmails] = useState<string[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<string[]>();

  const [availableUIRecipients, setAvailableUIRecipients] =
    useState<UIRecipients>(UIRecipientsFactory());
  const [selectedUIRecipients, setSelectedUIRecipients] =
    useState<UIRecipients>(UIRecipientsFactory());

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const { availableRecipients, selectedRecipients } = getUIRecipients(emails);
    setAvailableEmails(availableRecipients);
    setSelectedEmails(selectedRecipients);
  }, []);

  useEffect(() => {
    let availableList =
      inputRef.current?.value?.length > 0 ? filteredEmails : availableEmails;
    setAvailableUIRecipients(processRecipients(availableList));
    setSelectedUIRecipients(processRecipients(selectedEmails));
  }, [availableEmails, selectedEmails, filteredEmails]);

  const handleSearchChange = () => {
    const filteredRecipients = availableEmails.filter((email) =>
      email.includes(inputRef.current?.value.toLowerCase() || "")
    );
    setFilteredEmails(filteredRecipients);
  };

  useEffect(() => {
    handleSearchChange();
  }, [availableEmails]);

  const { debounced: debouncedHandleSearchChange } =
    useDebouncedCallback(handleSearchChange);

  const selectRecipient = (recipient: string) => {
    setAvailableEmails((prev) => prev.filter((email) => email !== recipient));
    setSelectedEmails((prev) => [...prev, recipient]);
  };

  const deselectRecipient = (recipient: string) => {
    setSelectedEmails((prev) => prev.filter((email) => email !== recipient));
    setAvailableEmails((prev) => [...prev, recipient]);
  };

  const selectCompany = (domain: string) => {
    setSelectedEmails((prev) => [
      ...prev,
      ...availableEmails.filter((email) => email.endsWith(`@${domain}`)),
    ]);
    setAvailableEmails((prev) =>
      prev.filter((email) => !email.endsWith(`@${domain}`))
    );
  };

  const deselectCompany = (domain: string) => {
    setAvailableEmails((prev) => [
      ...prev,
      ...selectedEmails.filter((email) => email.endsWith(`@${domain}`)),
    ]);
    setSelectedEmails((prev) =>
      prev.filter((email) => !email.endsWith(`@${domain}`))
    );
  };

  return (
    <div className="container mx-auto max-w-7xl px-4">
      <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
        <Box title="Available recipients">
          <div className="absolute top-8 left-6">
            <span className="absolute top-[8px] left-[8px] text-[0.8rem]">
              🔍
            </span>
            <input
              type="text"
              placeholder="search"
              className="pl-7 pr-3 py-1 border rounded-2xl w-64"
              onChange={debouncedHandleSearchChange}
              ref={inputRef}
            />
          </div>
          <Recipients
            companyRecipients={availableUIRecipients.companyRecipients}
            individualRecipients={availableUIRecipients.individualRecipients}
            onClickRecipient={selectRecipient}
            onClickCompany={selectCompany}
            errorMessage={
              inputRef.current?.value?.length > 0 &&
              filteredEmails?.length === 0
                ? "No recipients found"
                : ""
            }
          />
        </Box>
        <Box title="Selected recipients">
          <Recipients
            companyRecipients={selectedUIRecipients.companyRecipients}
            individualRecipients={selectedUIRecipients.individualRecipients}
            onClickRecipient={deselectRecipient}
            onClickCompany={deselectCompany}
            errorMessage={
              selectedEmails.length === 0 ? "No recipients selected" : ""
            }
            isSelectedList
          />
        </Box>
      </div>
    </div>
  );
};
