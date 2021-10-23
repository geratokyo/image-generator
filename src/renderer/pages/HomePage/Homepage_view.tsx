import { Page } from "../../ui/page/Page"
import { MainPanel } from "../GeneratorPanel/MainPanel/MainPanel_view"


export interface HomePageProps {

}


export const HomePage: React.FC<HomePageProps> = () => {
  return <Page>
    <MainPanel />
  </Page>
}
