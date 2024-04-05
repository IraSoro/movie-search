export default function App() {
  return (
    <>
      <h1>Hello world</h1>
      <h1>{process.env.TOKEN ?? "undefined"}</h1>
      <div>
        <img src="/assets/react.png" />
      </div>
      <div>
        <img src="/static/favicon.ico" />
      </div>
    </>
  );
}
