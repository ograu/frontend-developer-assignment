import { useEffect, useRef, useState } from "react";
import emails from "../assets/recipientsData.json";
import { useDebouncedCallback } from "../hooks/useDebouncedCallback";
import { getUIRecipients, processRecipients } from "../lib/utils";
import { Box } from "./Box";
import { EmailList } from "./EmailList";
import { UIRecipients } from "./types";

const UIRecipientsFactory = (): UIRecipients => ({
  companyRecipients: {},
  individualRecipients: [],
});

export const EmailManager = () => {
  const [availableRecipients, setAvailableRecipients] = useState<string[]>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [filteredRecipients, setFilteredRecipients] = useState<string[]>();

  const [availableUIRecipients, setAvailableUIRecipients] =
    useState<UIRecipients>(UIRecipientsFactory());
  const [selectedUIRecipients, setSelectedUIRecipients] =
    useState<UIRecipients>(UIRecipientsFactory());

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const { availableRecipients, selectedRecipients } = getUIRecipients(emails);
    setAvailableRecipients(availableRecipients);
    setSelectedRecipients(selectedRecipients);
  }, []);

  useEffect(() => {
    let availableEmails =
      inputRef.current?.value?.length > 0
        ? filteredRecipients
        : availableRecipients;
    setAvailableUIRecipients(processRecipients(availableEmails));
    setSelectedUIRecipients(processRecipients(selectedRecipients));
  }, [availableRecipients, selectedRecipients, filteredRecipients]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    const filteredRecipients = availableRecipients.filter((email) =>
      email.includes(query)
    );
    setFilteredRecipients(filteredRecipients);
  };

  const { debounced: debouncedHandleSearchChange } =
    useDebouncedCallback(handleSearchChange);

  const selectRecipient = (recipient: string) => {
    setAvailableRecipients((prev) =>
      prev.filter((email) => email !== recipient)
    );
    setSelectedRecipients((prev) => [...prev, recipient]);
  };

  const deselectRecipient = (recipient: string) => {
    setSelectedRecipients((prev) =>
      prev.filter((email) => email !== recipient)
    );
    setAvailableRecipients((prev) => [...prev, recipient]);
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
          <EmailList
            companyRecipients={availableUIRecipients.companyRecipients}
            individualRecipients={availableUIRecipients.individualRecipients}
            onClickRecipient={selectRecipient}
            errorMessage={
              inputRef.current?.value?.length > 0 &&
              filteredRecipients?.length === 0
                ? "No recipients found"
                : ""
            }
          />
        </Box>
        <Box title="Selected recipients">
          <EmailList
            companyRecipients={selectedUIRecipients.companyRecipients}
            individualRecipients={selectedUIRecipients.individualRecipients}
            onClickRecipient={deselectRecipient}
          />
        </Box>
      </div>
    </div>
  );
};
