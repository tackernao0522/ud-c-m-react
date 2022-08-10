import "./Container.css";

const Container = ({ title, first, second }) => {
  return (
    <div className="container">
      <h3>{title}</h3>
      {second}
      {first}
    </div>
  );
};

export default Container;
