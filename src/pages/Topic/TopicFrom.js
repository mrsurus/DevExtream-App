import { Url } from "devextreme-react/chart";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";



const TopicFrom = () => {
  const [isToggled, setIsToggled] = useState(false);
  const location = useLocation()

  const handleToggle = () => {
    setIsToggled(!isToggled);
    
    const quearyString = location.search;
    const queryParams = new URLSearchParams(quearyString);

    const id = queryParams.get('id')
    console.log('idfahf', id)
  };

 
  
 


  const handleList = async (event) => {
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
// input value 
    event.preventDefault();
    const from = event?.target;
    const Name = from?.name?.value;
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
    const isActive = isToggled;
    const sequence = "";
    const createdBy = "";
    const CreatedOn = formateDate;
    const editOn = "";

    const fomData = {
      Name,
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
      sequence,
      createdBy,
      CreatedOn,
      editOn,
      isActive,
    };

    try {
      const response = await fetch("http://localhost:3000/topic", {
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

    event.target.reset();
  };
  return (
    <form onSubmit={handleList} className="my-10">
      <p className="font-bold text-2xl mx-6 lg:px-40">Create a Topic List</p>
      <div className="grid grid-cols-2 lg:px-40">
        <div>
          <p className="my-2 mx-6 mt-5">Topic Name</p>
          <input
            required
            name="name"
            type="text"
            placeholder="Enter Your name"
            className="input input-bordered "
          />
        </div>
        <div>
          <p className="my-2 mx-6 mt-5">Position</p>
          <input
            required
            name="position"
            type="text"
            placeholder="Enter Your position"
            className="input input-bordered "
          />
        </div>
        <div>
          <p className="my-2 mx-6 mt-5">News</p>
          <input
            required
            name="news"
            type="text"
            placeholder="Enter Your news"
            className="input input-bordered"
          />
        </div>
        <div>
          <p className="my-2 lg:mx-6 mt-5">Ariticales</p>
          <input
            required
            name="articale"
            type="text"
            placeholder="Enter Your ariticales"
            className="input input-bordered "
          />
        </div>
        <div>
          <p className="my-2 mx-6 mt-5">Highlights</p>
          <input
            required
            name="highlight"
            type="text"
            placeholder="Enter Your highlights"
            className="input input-bordered "
          />
        </div>
        <div>
          <p className="my-2 mx-6 mt-5">Description</p>
          <input
            required
            name="description"
            type="text"
            placeholder="Enter Your description"
            className="input input-bordered "
          />
        </div>
        <div>
          <p className="my-2 mx-6 mt-5">Main Heading</p>
          <input
            required
            name="main"
            type="text"
            placeholder="Enter Your main heading"
            className="input input-bordered "
          />
        </div>
        <div>
          <p className="my-2 mx-6 mt-5">MenuFlag</p>
          <input
            required
            name="menuFlag"
            type="text"
            placeholder="Enter Your main menuflag"
            className="input input-bordered "
          />
        </div>

        <div>
          <p className="my-2 mx-6 mt-5">Upload Logo</p>
          <input
            required
            name="uploadLogo"
            type="text"
            placeholder="Enter Your  menuflag"
            className="input input-bordered "
          />
        </div>
        <div>
          <p className="my-2 mx-6 mt-5">Upload Nav Logo</p>
          <input
            required
            name="navLogo"
            type="text"
            placeholder="Enter Your nav logo"
            className="input input-bordered "
          />
        </div>
      </div>

      <div className="mt-5 lg:mx-48 mx-4 flex items-center">
        <input
          onChange={handleToggle}
          type="checkbox"
          name="isActive"
          className="toggle toggle-primary"
        />
        <p className="mx-3">Is Active</p>
      </div>

      <input
        className="btn w-40 lg:mx-48 mx-4 btn-active btn-sm my-2 btn-primary mt-10"
        type="submit"
        value={"submit"}
      />
    </form>
  );
};

export default TopicFrom;
