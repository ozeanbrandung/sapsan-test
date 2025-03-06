import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchPage } from './pages/search-page';

const queryClient = new QueryClient();

function App(): ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen width-full">
        <SearchPage />
      </main>
    </QueryClientProvider>
  );
}

export default App;
