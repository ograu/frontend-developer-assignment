import { useEffect, useRef, useState } from "react";
import emails from "../assets/recipientsData.json";
import { useDebouncedCallback } from "../hooks/useDebouncedCallback";
import { getEmails } from "../lib/utils";
import { Box } from "./Box";
import { EmailList } from "./EmailList";

export const EmailManager = () => {
  const [availableRecipients, setAvailableRecipients] = useState<string[]>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [filteredRecipients, setFilteredRecipients] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const { availableRecipients, selectedRecipients } = getEmails(emails);
    setAvailableRecipients(availableRecipients);
    setSelectedRecipients(selectedRecipients);
  }, []);

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
          <div className="absolute top-4 left-6">
            <span className="absolute top-[8px] left-[8px] text-[0.8rem]">
              🔍
            </span>
            <input
              type="text"
              placeholder="search"
              className="pl-7 pr-3 py-1 border rounded-md w-64"
              onChange={debouncedHandleSearchChange}
              ref={inputRef}
            />
          </div>
          <EmailList
            recipients={
              inputRef.current?.value?.length > 0
                ? filteredRecipients
                : availableRecipients
            }
            onClickRecipient={selectRecipient}
            errorMessage={
              inputRef.current?.value?.length > 0 &&
              filteredRecipients.length === 0
                ? "No recipients found"
                : availableRecipients.length === 0
                ? "No available recipients"
                : ""
            }
          />
        </Box>
        <Box title="Selected recipients">
          <EmailList
            recipients={selectedRecipients}
            onClickRecipient={deselectRecipient}
          />
        </Box>
      </div>
    </div>
  );
};
