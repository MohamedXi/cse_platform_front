import { Router } from '@reach/router'

// Types
import { Roles } from './consts/roles'

// Pages
import ProtectedRoute from './pages/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import RentalsPage from './pages/items/RentalsPage'
import CataloguePage from './pages/items/CataloguePage'
import CreaLocAdminItems from './pages/items/admin/CreaLocAdminItems'
import ItemEditPage from './pages/items/ItemEditPage'
import CreaLocAdminTags from './pages/items/admin/CreaLocAdminTags'
import CreaLocPersons from './pages/items/CreaLocPersons'

function Routes() {
  return (
    <Router className="h-full">
      <ProtectedRoute component={Dashboard} roles={[Roles.collaborator]} path="/*" />
      {/*ITEMS*/}
      <ProtectedRoute component={RentalsPage} roles={[Roles.admin, Roles.storekeeper]} path="items/rentals" />
      <ProtectedRoute component={CataloguePage} roles={[Roles.collaborator]} path="items/catalogue" />
      {/*ADMINISTRATION*/}
      <ProtectedRoute component={CreaLocAdminItems} roles={[Roles.admin]} path="admin/items" />
      <ProtectedRoute component={ItemEditPage} roles={[Roles.admin]} path="admin/items/add" />
      <ProtectedRoute component={CreaLocAdminTags} roles={[Roles.collaborator]} path="admin/tags" />
      <ProtectedRoute component={CreaLocPersons} roles={[Roles.admin]} path="admin/persons" />
    </Router>
  )
}

export default Routes
