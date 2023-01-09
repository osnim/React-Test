import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
function Header(props) {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>

      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Nav(props) {
  const lis = [];
  props.topics.forEach((element) => {
    lis.push(
      <li key={element.id}>
        <a
          id={element.id}
          href={"/read/" + element.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
          }}
        >
          {element.title}
        </a>
      </li>
    );
  });

  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);

  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];
  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello WEB"></Article>;
  } else if (mode === "READ") {
    let title,
      body = null;
    topics.forEach((element) => {
      if (element.id === id) {
        title = element.title;
        body = element.body;
      }
    });
    content = <Article title={title} body={body}></Article>;
  }
  return (
    <div className="App">
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setMode("READ");
          setId(_id);
        }}
      ></Nav>
      {content}
    </div>
  );
}

export default App;
