export const UserMessage = ({ message }: { message: string }) =>
  message ? <p className="text-red-500 mt-2 pl-3.5">{message}</p> : null;
