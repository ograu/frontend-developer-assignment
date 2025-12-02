import { ReactComponent as TimescaleLogo } from "../assets/logo.svg";
import "../index.css";
import { EmailManager } from "./emailManager/EmailManager";

const App = () => (
  <div className="flex flex-col min-h-screen">
    <header className="border-b py-4">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-3 items-start sm:flex-row sm:justify-between sm:items-center">
          <TimescaleLogo />
          <h1 className="text-3xl font-bold">Frontend Assignment</h1>
        </div>
      </div>
    </header>
    <main className="flex-1 py-8">
      <EmailManager />
    </main>
    <footer className="border-t py-4">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        {/* Footer content*/}
      </div>
    </footer>
  </div>
);

export default App;
