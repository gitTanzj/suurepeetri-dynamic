import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import { AboutList } from './components/About';

const dataProvider = simpleRestProvider('http://localhost:4000/api/contents');

const App = () => <Admin dataProvider={dataProvider}>
  <Resource name="about" list={AboutList}/>
</Admin>

export default App;
