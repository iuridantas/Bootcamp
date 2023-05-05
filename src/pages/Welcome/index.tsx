import { Page, PageContainer } from './styles';
import { Top } from '../../COMPONENTS/top';
import { Sidebar } from '../../COMPONENTS/sidebar';

export function Welcome() {
  return (
    <Page>
      <Sidebar />
      <PageContainer>
        <Top />
        <h1>Seja bem-vindo à plataforma!</h1>
      </PageContainer>
    </Page>
  );
}
