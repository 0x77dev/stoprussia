import { Route, Routes as Switch } from 'react-router-dom'
import { PageBattlefield } from '../battlefield'
import { PageHome } from '../home'

const App = () => {
  return (
    <Switch>
      <Route path="/" element={<PageHome />} />
      <Route path="/battlefield" element={<PageBattlefield />} />
    </Switch>
  )
}

export { App }
