import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Form from './components/SubForm'

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Form /> 
      </div>
    </ChakraProvider>
  );
}

export default App;
