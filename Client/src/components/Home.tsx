import axios from "axios";
const Home = () => {
  const handleuser = async () => {
    const res = await axios.post("http://localhost:3000/api/users/v1/register");

    console.log(res);
  };
  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleuser}> click</button>
    </div>
  );
};

export default Home;
