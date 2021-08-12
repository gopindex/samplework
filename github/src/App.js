import React from "react";
import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/Dashboard";
import User from "./components/User";
import { GithubProvider } from "./context/GithubContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
export default function App() {
  return (
    <Router>
      <div className="App" style={{ height: "100%" }}>
        <Layout>
          <Switch>
            <GithubProvider>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/user/:username" component={User}></Route>
              </Switch>
            </GithubProvider>

            <Route exact path="/about" component={About}></Route>
            <Route exact path="/contact" component={Contact}></Route>
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}
// SHORT BREAK
