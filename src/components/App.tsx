import { ErrorBoundary } from "react-error-boundary";
import "../index.css";
import { EmailManager } from "./emailManager/EmailManager";
import { Layout } from "./ui/Layout";

const App = () => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <Layout>
      <EmailManager />
    </Layout>
  </ErrorBoundary>
);

export default App;
