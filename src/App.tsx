import Base from "./Base";
import { BaseProvider } from "./contexts/BaseContext";

function App() {
  return (
    <BaseProvider>
      <Base />
    </BaseProvider>
  );
}

export default App;
