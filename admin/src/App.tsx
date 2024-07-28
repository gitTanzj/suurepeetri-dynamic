import { Admin, Resource } from 'react-admin';

import dataProvider from './dataProvider';
import authProvider from './authProvider';

import AboutList from './components/contents/AboutList';
import HousingList from './components/contents/HousingList';
import ContactList from './components/contents/ContactList';
import AboutImageList from './components/images/AboutImagesList';

import AboutEdit from './components/contents/AboutEdit';
import ContactEdit from './components/contents/ContactEdit';
import HousingEdit from './components/contents/HousingEdit';

const App = () => <Admin authProvider={authProvider} dataProvider={dataProvider}>
  <Resource name="contents/about" list={AboutList} edit={AboutEdit}/>
  <Resource name="contents/housing" list={HousingList} edit={HousingEdit}/>
  <Resource name="contents/contact" list={ContactList} edit={ContactEdit}/>
  <Resource name="images/about" list={AboutImageList}/>
  <Resource name="images/tent"/>
  <Resource name="images/mansion"/>
  <Resource name="images/contact"/>
  <Resource name="images/gallery"/>
</Admin>

export default App;
