import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as utils from "../../lib/utils";
import { EmailManager } from "./EmailManager";

it("renders recipients in its correspondant box", () => {
  jest.spyOn(utils, "getUIRecipients").mockImplementation(() => ({
    availableRecipients: [
      "hello@example.com",
      "goodbye@example.com",
      "another@email.com",
    ],
    selectedRecipients: ["hey@example.com"],
  }));

  render(<EmailManager />);

  const availableBox = screen
    .getByText(/available recipients/i)
    .closest("article");
  const selectedBox = screen
    .getByText(/selected recipients/i)
    .closest("article");

  expect(
    within(availableBox).getByText("hello@example.com")
  ).toBeInTheDocument();
  expect(
    within(availableBox).getByText("goodbye@example.com")
  ).toBeInTheDocument();
  expect(
    within(availableBox).getByText("another@email.com")
  ).toBeInTheDocument();
  expect(within(selectedBox).getByText("hey@example.com")).toBeInTheDocument();
});

it("selects recipient", async () => {
  const user = userEvent.setup();
  jest.spyOn(utils, "getUIRecipients").mockImplementation(() => ({
    availableRecipients: [
      "hello@example.com",
      "goodbye@example.com",
      "another@email.com",
    ],
    selectedRecipients: ["hey@example.com"],
  }));

  render(<EmailManager />);

  const availableBox = screen
    .getByText(/available recipients/i)
    .closest("article");
  const selectedBox = screen
    .getByText(/selected recipients/i)
    .closest("article");

  const email = within(availableBox).getByText("hello@example.com");
  expect(email).toBeInTheDocument();
  expect(
    within(selectedBox).queryByText("hello@example.com")
  ).not.toBeInTheDocument();

  await user.click(email);

  expect(
    within(selectedBox).getByText("hello@example.com")
  ).toBeInTheDocument();
  expect(
    within(availableBox).queryByText("hello@example.com")
  ).not.toBeInTheDocument();
});
