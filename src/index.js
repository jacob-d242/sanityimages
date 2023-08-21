import React from "react";
import ReactDOM from "react-dom";
import PortableText from "@sanity/block-content-to-react";
import urlBuilder from "@sanity/image-url";
import doc from "./doc.json";
import "./styles.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
const urlFor = (source) =>
  urlBuilder({ projectId: "uip7l8ai", dataset: "production" }).image(source);

const serializer = {
  types: {
    mainImage: (props) => (
      <figure>
        <img
          src={urlFor(props.node.asset).width(600).url()}
          alt={props.node.alt}
        />

        <figcaption>{props.node.caption}</figcaption>
      </figure>
    ),
    code: (props) => {
      if (props.node && props.node.code && props.node.language) {
        return (
          <SyntaxHighlighter language="props.node.language" style={dark}>
            {props.node.code}
          </SyntaxHighlighter>
        );
      } else {
        return null;
      }
    },
    image: (props) => (
      <figure>
        <img
          src={urlFor(props.node.asset._ref).width(600).url()}
          alt={props.node.alt}
        />
        {props.node.caption && <figcaption>{props.node.caption}</figcaption>}
      </figure>
    )
  }
};

function App() {
  return (
    <div className="App">
      <PortableText blocks={doc.body} serializers={serializer} />
      <hr />
      <h2>Raw data</h2>
      <pre>{JSON.stringify(doc.body, null, 2)}</pre>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
