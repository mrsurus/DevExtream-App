
import SubTopicTabile from "./StuTopicTabile";
import { Link } from "react-router-dom";

const SubTopic = () => {

  return (
    <div className="lg:p-10 md:p-5 p-3  h-[100vh]">
      <div className="mt-5 lg:mx-60 md:mx-12 flex justify-around items-center">
        <div>
          <p className="text-4xl font-bold">Create SubTopic</p>
        </div>
        <Link to={'/subtopic/subtopicform'}>
          <button className="btn btn-primary btn-outline btn-sm">Create</button>
        </Link>

      </div>

      <div className="mt-5 lg:mx-60 md:mx-12">
        <div class="md:w-3/3 py-3">
          <SubTopicTabile></SubTopicTabile>
        </div>
      </div>
    </div>
  );
};

export default SubTopic;

//  <div className="mx-5">
// <select className="select select-bordered w-full max-w-[240px] md:max-w-[360px] ">
//   {subList.map((list) => (
//     <option  >
//       {list.Name}
//     </option>
//   ))}
// </select>
// </div>
