import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';

import AboutList from './components/AboutList';
import HousingList from './components/HousingList';
import ContactList from './components/ContactList';

import AboutEdit from './components/AboutEdit';
import ContactEdit from './components/ContactEdit';

const App = () => <Admin dataProvider={restProvider('http://localhost:4000/api/contents')}>
  <Resource name="about" list={AboutList} edit={AboutEdit}/>
  <Resource name="housing" list={HousingList} edit={ContactEdit}/>
  <Resource name="contact" list={ContactList}/>
</Admin>

export default App;
