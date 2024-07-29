import { Admin, Resource } from 'react-admin';

import dataProvider from './dataProvider';
import authProvider from './authProvider';

import AboutList from './components/contents/AboutList';
import HousingList from './components/contents/HousingList';
import ContactList from './components/contents/ContactList';
import ImageList from './components/images/ImageList';
import AboutEdit from './components/contents/AboutEdit';
import ContactEdit from './components/contents/ContactEdit';
import HousingEdit from './components/contents/HousingEdit';

const App = () => <Admin authProvider={authProvider} dataProvider={dataProvider}>
  <Resource name="contents/about" list={AboutList} edit={AboutEdit}/>
  <Resource name="contents/housing" list={HousingList} edit={HousingEdit}/>
  <Resource name="contents/contact" list={ContactList} edit={ContactEdit}/>
  <Resource name="images/about" list={ImageList}/>
  <Resource name="images/tent" list={ImageList}/>
  <Resource name="images/mansion" list={ImageList}/>
  <Resource name="images/contact" list={ImageList}/>
  <Resource name="images/gallery" list={ImageList}/>
</Admin>

export default App;
