type Props = {
  addNewAvailableRecipient: () => void;
  value: string | undefined;
};

export const AddRecipientButton = ({
  addNewAvailableRecipient,
  value,
}: Props) => (
  <button
    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
    onClick={addNewAvailableRecipient}
  >
    Add <i>{value}</i> to recipients
  </button>
);
