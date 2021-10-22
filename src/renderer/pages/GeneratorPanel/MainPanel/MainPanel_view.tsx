import { useEffect, useState } from "react"
import { Page } from "../../../ui/page/Page"
import { MainPanelModel } from "./MainPanel_model"



export interface MainPanelProps {

}

export const MainPanel: React.FC<MainPanelProps> = (props) => {
  const [model,] = useState(() => new MainPanelModel())
  useEffect(() => {
    model.onMount();
    return model.onUnmount();
  }, [model])
  return <Page className="main-panel">
    tests

    <br /><br /><br /><br /><br />
    <button onClick={model.generate}>
      generatessss
    </button>


  </Page>
}
