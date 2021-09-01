import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import NotFound from './Pages/NotFound';
import PostDetail from './components/PostDetail';



function App() {
  return (
    <BrowserRouter>
		<div className="App">
		{/* <Header /> */}
		{/* <News /> */}
		</div>
		<Switch>
			<Route path="/" component={Header} exact />
			<Route path="/postDetail" component={PostDetail} />
			<Route component={NotFound} />			
		</Switch> 
    </BrowserRouter>
  );
}

export default App;
