import { useState } from "react";

const Index = () => {
  const [data, setData] = useState([{ Name: "", Age: "" }]);

  const AddMore = (event) => {
    event.preventDefault();
    setData([...data, { Name: "", Age: "" }]);
  };

  const RemoveFields = (event, i) => {
    event.preventDefault();

    data.splice(i, 1);
    setData([...data]);
  };

  const handleChange = (event, i) => {
    data[i][event.target.name] = event.target.value;
    setData([...data]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {data.map((ele, i) => (
          <div key={i}>
            <input
              placeholder="Enter Name"
              name="Name"
              onChange={(event) => handleChange(event, i)}
            />
            <input
              placeholder="Enter Age"
              name="Age"
              onChange={(event) => handleChange(event, i)}
            />
            <button onClick={(event) => RemoveFields(event, i)}>Remove</button>
          </div>
        ))}
        <button onClick={AddMore}>Add More..</button>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </>
  );
};

export default Index;
