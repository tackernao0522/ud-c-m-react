const Hello = (props) => {
  // props.name = 'Bob';
  const desc= Reflect.getOwnPropertyDescriptor(props, 'name');
  console.log(desc);
  // console.log(props.name);
  return (
    <div>
      <h3>Hello {props.name}</h3>
    </div>
  );
};

export default Hello;