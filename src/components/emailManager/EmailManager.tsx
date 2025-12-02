import { useEffect, useMemo, useRef, useState } from "react";
import emails from "../../assets/recipientsData.json";
import { useDebouncedCallback } from "../../hooks/useDebouncedCallback";
import { Box } from "../ui/Box";
import { Recipients } from "./Recipients";
import { getUIRecipients, processRecipients } from "./utils";

export const EmailManager = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true); // this is just to mimic an async data fetch
  const [availableEmails, setAvailableEmails] = useState<string[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<string[]>();
  const [shouldShowAddOption, setShouldShowAddOption] =
    useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const { availableRecipients, selectedRecipients } = getUIRecipients(emails);
    setAvailableEmails(availableRecipients);
    setSelectedEmails(selectedRecipients);
    setIsLoading(false);
  }, []);

  const availableUIRecipients = useMemo(() => {
    const availableList =
      inputRef.current?.value?.length > 0 ? filteredEmails : availableEmails;
    return processRecipients(availableList);
  }, [availableEmails, filteredEmails]);

  const selectedUIRecipients = useMemo(() => {
    return processRecipients(selectedEmails);
  }, [selectedEmails]);

  const handleSearchChange = () => {
    const value = inputRef.current?.value.toLowerCase();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const filteredRecipients = availableEmails.filter((email) =>
      email.includes(value)
    );

    if (
      filteredRecipients.length === 0 &&
      isValidEmail &&
      !selectedEmails.includes(value)
    ) {
      setShouldShowAddOption(true);
    } else {
      setShouldShowAddOption(false);
    }

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

  const addNewAvailableRecipient = () => {
    setAvailableEmails((prev) => [...prev, inputRef.current?.value]);
    setShouldShowAddOption(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            userMessage={
              inputRef.current?.value?.length > 0 &&
              filteredEmails?.length === 0
                ? "No recipients found"
                : ""
            }
          />
          {shouldShowAddOption && (
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
              onClick={addNewAvailableRecipient}
            >
              Add <i>{inputRef.current?.value}</i> to recipients
            </button>
          )}
        </Box>
        <Box title="Selected recipients">
          <Recipients
            companyRecipients={selectedUIRecipients.companyRecipients}
            individualRecipients={selectedUIRecipients.individualRecipients}
            onClickRecipient={deselectRecipient}
            onClickCompany={deselectCompany}
            userMessage={
              selectedEmails.length === 0 ? "No recipients selected" : ""
            }
            isSelectedList
          />
        </Box>
      </div>
    </div>
  );
};
