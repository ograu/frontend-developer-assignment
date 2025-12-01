import { ReactComponent as TimescaleLogo } from "../assets/logo.svg";
import "../index.css";
import { Box } from "./Box";

const App = () => (
  <div className="flex flex-col min-h-screen">
    {/* Header */}
    <header className="border-b py-4">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-3 items-start sm:flex-row sm:justify-between sm:items-center">
          <TimescaleLogo />
          <h1 className="text-3xl font-bold">Frontend Assignment</h1>
        </div>
      </div>
    </header>

    {/* Main Content */}
    <main className="flex-1 py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
          <Box title="Available recipients" recipients={[]}>
            <p>This is the content of Box 1.</p>
          </Box>
          <Box title="Selected recipients" recipients={[]}>
            <p>This is the content of Box 2.</p>
          </Box>
        </div>
      </div>
    </main>

    {/* Footer */}
    <footer className="border-t py-4">
      <div className="container mx-auto max-w-7xl px-4 "></div>
    </footer>
  </div>
);

export default App;
