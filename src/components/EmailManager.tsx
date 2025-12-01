import { useEffect, useState } from "react";
import emails from "../assets/recipientsData.json";
import { useDebouncedCallback } from "../hooks/useDebouncedCallback";
import { getEmails } from "../lib/utils";
import { Box } from "./Box";
import { EmailList } from "./EmailList";

export const EmailManager = () => {
  const [availableRecipients, setAvailableRecipients] = useState<string[]>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);

  useEffect(() => {
    const { availableRecipients, selectedRecipients } = getEmails(emails);
    setAvailableRecipients(availableRecipients);
    setSelectedRecipients(selectedRecipients);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    const filteredRecipients = emails
      .filter(
        (email) =>
          !email.isSelected && email.email.toLowerCase().includes(query)
      )
      .map((email) => email.email);
    setAvailableRecipients(filteredRecipients);
  };

  const { debounced: debouncedHandleSearchChange } =
    useDebouncedCallback(handleSearchChange);

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
            />
          </div>
          <EmailList recipients={availableRecipients} />
        </Box>
        <Box title="Selected recipients">
          <EmailList recipients={selectedRecipients} />
        </Box>
      </div>
    </div>
  );
};
