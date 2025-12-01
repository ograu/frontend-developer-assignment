import { useEffect, useState } from "react";
import emails from "../assets/recipientsData.json";
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

  return (
    <div className="container mx-auto max-w-7xl px-4">
      <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
        <Box title="Available recipients">
          <p>Search input</p>
          <EmailList recipients={availableRecipients} />
        </Box>
        <Box title="Selected recipients">
          <EmailList recipients={selectedRecipients} />
        </Box>
      </div>
    </div>
  );
};
