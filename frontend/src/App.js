import './App.css';
import { Heading } from '@chakra-ui/react'
import SignUpForm from './components/Form'

function App() {
  return (
    <div className="App">
      <Heading>Recieve Dog Pictures Daily!</Heading>
      <SignUpForm />  
    </div>
  );
}

export default App;
