import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [files, setFiles] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files)); // Convert FileList to Array for manipulation
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    await axios.post("http://localhost:8000/upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    alert("Files uploaded and processed successfully!");
  };

  const handleQuestionSubmit = async () => {
    const response = await axios.post("http://localhost:8000/ask/", { question });
    setAnswer(response.data.answer);
  };

 

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-gray-800 text-gray-100 p-4">
        <h1 className="text-2xl font-bold mt-4 mb-4">PDF QA System</h1>
        <div className="relative mb-4">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
          />
          <div className="flex justify-between items-center bg-slate-700 rounded-sm p-1">
            <span className="text-gray-300">Choose File</span>
            <span className="text-gray-300">{files.length} file(s) selected</span>
          </div>
          <div className="mt-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-700 rounded-md px-3 py-2 mb-2">
                <span className="text-gray-300">{file.name}</span>

              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleUpload}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full"
        >
          Upload Files
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            onClick={handleQuestionSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-2 md:mt-0 md:ml-2 rounded-md w-full md:w-auto"
          >
            Submit Question
          </button>
        </div>
        {answer && (
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">Answer:</h2>
            <p>{answer}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
