# Timescale Frontend Programming Assignment

Thank you for taking the time to apply for a frontend position at Timescale!
We hope you'll enjoy this small coding assignment that was designed to illustrate your coding skills. It should take around
3 hours to complete at a time of your choosing. If you have any questions, feel free to reach out to us and we'll be happy
to help. Happy hacking!

## Assignment

Implement a React component that allows managing email addresses. The component displays two lists: available recipients and selected recipients.

<img src="./src/assets/wireframe.png" height="50%" width="50%" />

Use the included `recipientsData.json` file to populate the lists within the component.

### Use cases

As a user, I can

- See the list of all available recipients. A recipient is either an email or a group of emails sharing the same company domain
- Select an individual recipient or a company domain. When a company domain is selected, all emails with the domain are added to the selected recipients' list
- Enter the name of a company into the autocomplete and select a recipient from the available suggestions
- Enter any email in the autocomplete. If the email passes validation it is possible to add it to the list of available recipients
- See the list of the selected recipients that are grouped into company and email recipients. The groups are expandable and show the contained members
- Remove the recipients from the selected list. It is possible to remove an individual email or all emails sharing a domain at once

### The rules

- The component should have a simple and clean design
- You can use a component library of your choice (we use Chakra UI)
- The component should work in the latest Chrome on Mac OS
- We don't expect a full test coverage, but a couple of unit tests would be nice to have
- Fork the repo to your own account, make it public and send us the repo url when you are completed. We will
  clone and run the site on our local.

### Observations and assumptions

For this implementation, I've made the following assumptions:

- Company emails can be selected/deselected one at a time, as well as all at once when clicking on the domain.
- Emails are grouped into company-domain blocks only when there is more than one email in their respective recipient boxes (available or selected).
- Regarding nesting, I followed what I visually inferred from the wireframes. The available-recipients box has only one level of nesting, while the selected-recipients box has two levels.
- I haven't used persistent storage or any state-management tool.
- I decided to write some integration tests instead of unit tests because they provide much more value for only a bit more effort, following the philosophy of React Testing Library and Kent C. Dodds’s testing trophy.

Other than that:

- I used TailwindCSS for styling, as it's the tool I've been using for the last couple of years.
- I didn't use any component library, as I didn't need one to build this simple app.

Also, please note that I’m aware that what’s currently in `EmailManager.tsx` could — and probably should — be split into different layers if the feature or app were larger: state management, API logic, helper functions, etc. I chose to keep everything within a single component because I believe this is the most appropriate approach given the size of the app. Since I don’t have any information about how it would evolve if it were a live product, I think the wisest decision is to keep things as simple as possible, and co-location helps a lot in that regard, in my opinion.
