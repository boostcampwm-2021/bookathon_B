import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SearchStudy from "./pages/SearchStudy";
import CreateStudy from "./pages/CreateStudy";
import GroupDetail from "./pages/GroupDetail";
import FirstPage from "./pages/FirstPage";
import { useEffect, useState } from "react";

function App() {
  const [userObj, setUserObj] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserObj = async () => {
      let newObj;
      try {
        newObj = await (await fetch("/user")).json();
      } catch (error) {
        console.error(error);
        // newObj = { email: "dummy@dummy.com", nickName: "prettyDummy" };
      }
      if (newObj) setUserObj(newObj);
    };
    getUserObj();
    setLoading(false);
  }, []);
  if (loading) {
    return <div style={{ fontSize: 40, textAlign: "center", marginTop: 40 + "vh" }}>...loading</div>;
  }
  return (
    <div className="App">
      {userObj ? (
        <Switch>
          <Route path="/" exact={true} userObj={userObj}>
            <Main />
          </Route>
          <Route path="/search" exact={true} userObj={userObj}>
            <SearchStudy />
          </Route>
          <Route path="/study/create" exact={true} userObj={userObj}>
            <CreateStudy />
          </Route>
          <Route path="/study/:id" exact={true} userObj={userObj}>
            <GroupDetail />
          </Route>
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
