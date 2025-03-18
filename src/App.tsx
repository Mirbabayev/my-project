import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout';
import { AppRoutes } from './routes';
import { AuthProvider } from './lib/auth-context';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}