import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Artical = () => {
  const [topics, setTopics] = useState([]);
  const [subTopics, setSubTopics] = useState([]);


  //load teh topic data 
  useEffect(() => {
    fetch("http://localhost:3000/topic")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data);
      });
  }, []);

  //load the subtopic data
  useEffect(() => {
    fetch("http://localhost:3000/subtopic")
      .then((res) => res.json())
      .then((data) => {
        setSubTopics(data);
      });
  }, []);

  //select section data bainding
  const [topicId, setTopicId] = useState(1);

  const getData = (id) => {
    setTopicId(parseInt(id));
  };
  const filteredTopic = subTopics.filter((topic) => topic.TopicID === topicId);

  const handleSubmit= async (event)=>{
    event.preventDefault()
    const from = event?.target;
    const topic =from.topic?.value;
    const subTopic =from.subtopic?.value;
    const header =from.header?.value;
    const abstract =from.abstract?.value;
    const embed =from.embed?.value;
    // console.log(topic,subTopic,header,abstract,embed);
    const fomData = {
      topic,
      subTopic,
      header,
      abstract,
      embed
    }

    try {
      const response = await fetch("http://localhost:3000/artical", {
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
    
    from.reset()
  }


  // quilll funtion here 
  const [value, setValue] = useState('');

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['align', 'color', 'background'],
        ['size', 'font'],
        ['indent', 'outdent'],
        ['emoji', 'formula'],
        ['table'],
        ['clean'],
      ],
    },
  };

  const handleQuillChange = (content, delta, source, editor) => {
    console.log(content);
    setValue(content); 
  };

  return (
    <form onSubmit={handleSubmit} className="lg:p-10 md:p-5 p-3 bg-base-300 ">
      <div className="flex md:justify-between justify-around md:border p-2 lg:mx-60  ">
        <div className="">
          <div className="flex items-center">
            <p>Topic</p>
            <div className="relative w-full mx-3 ">
              <select name="topic"
                onChange={(event) => getData(event.target.value)} // Attach onChange to the <select> element
                className="md:w-48 w-32 p-2.5 rounded-md shadow-lg outline-none appearance-none focus:border-black"
              >
                {topics.map((topic) => (
                  <option  key={topic.TopicID} value={topic.TopicID}>
                    {topic?.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex items-center">
            <p>SubTopic</p>
            <div className="relative w-full lg:max-w-sm mx-3">
              <select name="subtopic" className="md:w-48 w-32 p-2.5 rounded-md shadow-lg outline-none appearance-none focus:border-indigo-600">
                {filteredTopic?.map((subTopic, index) => (
                  <option key={index}>{subTopic.Name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 lg:mx-60 md:mx-12">
        <p>Header</p>
        <div class="md:w-3/3 py-3">
          <input
          name="header"
          required
            class=" shadow-lg appearance-none border-2-black border-black-200 rounded w-full py-2 px-4  leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="mt-5 lg:mx-60 md:mx-12">
        <p>Abstract</p>
        <div class=" py-3">
          <textarea name="abstract" class="shadow-lg resize rounded-md w-full md:py-10 py-7 p-5"></textarea>
        </div>
      </div>
      {/* <Quill></Quill> */}
      <div>
      <div className='lg:mx-60 bg-white text-black shadow-lg'>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleQuillChange} // Attach the event handler
        modules={modules}
      />
      <style jsx>{`
        .ql-toolbar {
          display: flex;
          flex-wrap: wrap;
          background-color: #f3f4f6;
          border: 1px solid #d1d5db;
          border-radius: 0.25rem;
          padding: 4px;
        }
        .ql-container {
          border: 1px solid #d1d5db;
          border-top: none;
          border-radius: 0 0 0.25rem 0.25rem;
        }
        .ql-editor {
          min-height: 150px;
        }
      `}</style>
    </div>
      </div>
      <div className="mt-5 lg:mx-60 md:mx-12">
        <p>Embed video</p>
        <div class="md:w-3/4 py-3">
          <textarea name="embed" required class="resize rounded-md w-3/4 md:py-10 py-7 shadow-lg p-5"></textarea>
        </div>
      </div>
      <div className="mt-5 lg:mx-60 md:mx-12">
        <p>Upload Image:</p>
        <div class="mb-3 mt-3">
          <input
        
            className=" shadow-lg relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-400 file:px-3 file:py-[0.32rem] file:text-neutral-800 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-400 focus:border-primary focus:text-neutral-800 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-800 dark:file:bg-neutral-00 dark:file:text-neutral-700 dark:focus:border-primary"
            type="file"
            id="formFile"
          />
        </div>
      </div>
      <input value={'Save'} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded lg:mx-60 mt-8 md:mx-12" type="submit"  />
    </form>
  );
};

export default Artical;
