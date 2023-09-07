import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = () => {
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
    // content contains the HTML content of the editor
    console.log(content);
    setValue(content); // Optional: You can also update the state if needed
  };

  return (
    <div className='lg:mx-60 bg-white text-black'>
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
  );
};

export default QuillEditor;
