import classes from "./styles/App.module.scss";
import Router from "./router";

function App() {
  return (
    <div className={classes.App}>
      <Router />
    </div>
  );
}

export default App;
