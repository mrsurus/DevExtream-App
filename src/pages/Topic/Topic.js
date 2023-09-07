import React, { useState } from "react";
import "../../pages/Topic/Topic.scss";

import "whatwg-fetch";
import Tabile from "./Tabile";
import { Link } from "react-router-dom";

const Topic = () => {
  const [listData, setListData] = useState();

  const handleList = async (event) => {
    event.preventDefault();
    const from = event?.target;
    const name = from?.name?.value;
    const position = from?.position?.value;
    const news = from?.news?.value;
    const articale = from?.articale?.value;
    const highlight = from?.highlight?.value;
    const description = from?.description?.value;
    const heading = from?.heading?.value;
    const mainHeading = from?.main?.value;
    const menuFlag = from?.menuFlag?.value;
    const uploadLogo = from?.uploadLogo?.value;
    const navLogo = from?.navLogo?.value;

    const fomData = {
      name,
      position,
      news,
      articale,
      highlight,
      description,
      heading,
      mainHeading,
      menuFlag,
      uploadLogo,
      navLogo,
    };

    try {
      const response = await fetch("http://localhost:3000/createTopic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fomData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Article added successfully:", responseData);
      } else {
        console.error("Error adding article:", response.status);
      }
    } catch (error) {
      console.error("Error adding article:", error);
    }

    console.log();
    console.log(listData);

    // create a date
    let date = new Date();
    let date1 = date.toString();
    let date2 = date1.split(" ");
    const finaldate = date2.slice(1, 4);
    const fullFinalData = finaldate.join("-");

    const YYYY_MM_DD_Formater = (date, format = "YYYY-MM-DD") => {
      const t = new Date(date);
      const y = t.getFullYear();
      const m = ("0" + (t.getMonth() + 1)).slice(-2);
      const d = ("0" + t.getDate()).slice(-2);
      return format.replace("YYYY", y).replace("MM", m).replace("DD", d);
    };
    const formateDate = YYYY_MM_DD_Formater(fullFinalData);
    console.log(formateDate);

    setListData(name, formateDate);
    event.target.reset();
  };

  return (
    <div className="lg:p-10 md:p-5 p-3  h-[100vh]">
      <div className="mt-5 lg:mx-60 md:mx-12 flex justify-around items-center">
        {listData}
        <div>
          <p className="text-4xl font-bold">Create Topic</p>
        </div>
        {/* Open the modal using ID.showModal() method */}
        <Link to={'/topic/topicFrom'}>
          <button className="btn btn-primary btn-outline btn-sm">Create</button>
        </Link>
        <dialog id="my_modal_2" className="modal">
          <form onSubmit={handleList} method="dialog" className="modal-box">
            <p className="font-bold text-lg">Create a topic list</p>
            <p className="my-2 mx-6 mt-5">Topic Name</p>
            <input
              required
              name="name"
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xl"
            />
            <p className="my-2 mx-6 mt-5">Position</p>
            <input
              required
              name="position"
              type="text"
              placeholder="Type Your position"
              className="input input-bordered w-full max-w-xl"
            />
            <p className="my-2 mx-6 mt-5">News</p>
            <input
              required
              name="news"
              type="text"
              placeholder="Type Your news"
              className="input input-bordered w-full max-w-xl"
            />
            <p className="my-2 mx-6 mt-5">Ariticales</p>
            <input
              required
              name="articale"
              type="text"
              placeholder="Type Your ariticales"
              className="input input-bordered w-full max-w-xl"
            />
            <p className="my-2 mx-6 mt-5">Highlights</p>
            <input
              required
              name="highlight"
              type="text"
              placeholder="Type Your highlights"
              className="input input-bordered w-full max-w-xl"
            />
            <p className="my-2 mx-6 mt-5">Description</p>
            <input
              required
              name="description"
              type="text"
              placeholder="Type Your description"
              className="input input-bordered w-full max-w-xl"
            />
            <p className="my-2 mx-6 mt-5">Main Heading</p>
            <input
              required
              name="main"
              type="text"
              placeholder="Type Your main heading"
              className="input input-bordered w-full max-w-xl"
            />
            <p className="my-2 mx-6 mt-5">MenuFlag</p>
            <input
              required
              name="menuFlag"
              type="text"
              placeholder="Type Your main menuflag"
              className="input input-bordered w-full max-w-xl"
            />

            <p className="my-2 mx-6 mt-5">Upload Logo</p>
            <input
              required
              name="uploadLogo"
              type="text"
              placeholder="Type Your main menuflag"
              className="input input-bordered w-full max-w-xl"
            />
            <p className="my-2 mx-6 mt-5">Upload Nav Logo</p>
            <input
              required
              name="navLogo"
              type="text"
              placeholder="Type Your main menuflag"
              className="input input-bordered w-full max-w-xl"
            />

            <div className="mt-3 mx-6 flex items-center">
              <input type="checkbox" className="checkbox" />
              <p className="mx-3">please accept tream and condition </p>
            </div>

            <input
              className="btn w-40 flex mx-auto btn-active btn-sm my-2 btn-primary mt-10"
              type="submit"
              value={"submit"}
            />
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>

      <div className="mt-5 lg:mx-60 md:mx-12">
        <div class="md:w-3/3 py-3">
          <Tabile></Tabile>
        </div>
      </div>
    </div>
  );
};

export default Topic;
