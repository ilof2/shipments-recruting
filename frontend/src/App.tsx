import { QueryClientProvider } from 'react-query';
import Shipments from './shipments/Shipments';
import { queryClient } from './lib/queryClient';

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <Shipments />
      </QueryClientProvider>
  );
}

export default App;
