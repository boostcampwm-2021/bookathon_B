import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SearchStudy from "./pages/SearchStudy";
import CreateStudy from "./pages/CreateStudy";
import GroupDetail from "./pages/GroupDetail";
import FirstPage from "./pages/FirstPage";

function App() {
  let isLoggedIn = true; // 로그인  API 받고 나서 바꾸기
  return (
    <div className="App">
      {isLoggedIn ? (
        <Switch>
          <Route path="/" exact={true} component={Main} />
          <Route path="/search" exact={true} component={SearchStudy} />
          <Route path="/study/create" exact={true} component={CreateStudy} />
          <Route path="/study/:id" exact={true} component={GroupDetail} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact={true} component={FirstPage} />
          <Route path="/signin" exact={true} component={SignIn} />
          <Redirect from="*" to="/" />
        </Switch>
      )}
    </div>
  );
}

export default App;
