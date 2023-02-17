import { App } from '@/components/containers';
import { MainLayout } from '@/components/layouts';
import { NextLayout } from '@/types';

export const metadata = {
  title: 'Trains Schedule App',
  description: 'Trains Schedule App',
};

const Layout: NextLayout = ({ children }) => (
  <App>
    <MainLayout>{children}</MainLayout>
  </App>
);

export default Layout;
