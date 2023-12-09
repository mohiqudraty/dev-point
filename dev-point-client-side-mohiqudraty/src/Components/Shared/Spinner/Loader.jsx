import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-28 mx-auto mt-60">
      <RingLoader color="rgba(0, 0, 0, 1)" size={80} />
    </div>
  );
};

export default Loader;
