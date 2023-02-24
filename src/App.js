import s from './App.module.scss';
import { ListContainer } from './components/ListContainer';
import { PreviewContainer } from './components/PreviewContainer';

function App() {
  return (
    <div className={s.app}>
      <PreviewContainer />
      <div style={{ width: '2px' }} />
      <ListContainer />
    </div>
  );
}

export default App;
