import { Admin, Resource } from 'react-admin';

import dataProvider from './dataProvider';
import authProvider from './authProvider';

import AboutList from './components/AboutList';
import HousingList from './components/HousingList';
import ContactList from './components/ContactList';

import AboutEdit from './components/AboutEdit';
import ContactEdit from './components/ContactEdit';
import HousingEdit from './components/HousingEdit';

const App = () => <Admin authProvider={authProvider} dataProvider={dataProvider}>
  <Resource name="contents/about" list={AboutList} edit={AboutEdit}/>
  <Resource name="contents/housing" list={HousingList} edit={HousingEdit}/>
  <Resource name="contents/contact" list={ContactList} edit={ContactEdit}/>
</Admin>

export default App;
