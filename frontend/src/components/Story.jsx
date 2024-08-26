import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Story = () => {
  const { id } = useParams();
  const [story, setStory] = useState();
  const [isStory, setIsStory] = useState(false);
  const [paras, setParas] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/get_story/${id}`)
      .then(function (response) {
        console.log(response);
        setStory(response.data);
        setIsStory(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (isStory) {
      get_paragraph(story.first_para.id)
    }
  }, [isStory]);

  const get_paragraph = (id) => {
    axios.get(`http://127.0.0.1:8000/get_paragraph/${id}`)
        .then(function (response) {
          setParas(prevParas => [...prevParas, response.data]);
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  const load_paragraph = (id) => {
    get_paragraph(id);
  }

  return (
    <div className="bg-gray-900 min-h-screen w-screen-lg px-4 sm:px-6 lg:px-8">
      <div className="w-auto md:max-w-screen-md lg:max-w-screen-xl md:pt-8 mx-auto">
        <div className="w-full lg:col-span-2">
          <div className="px-4 md:px-14 py-6 lg:pe-8 lg:mt-4">
            <div className="container space-y-4 lg:space-y-8">
              <a className="inline-flex items-center gap-x-1.5 text-md text-gray-600 decoration-2 hover:text-violet-600 dark:text-violet-400" href="/">
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
                Go back
                </a>
                {isStory && (
                    <h2 className="text-2xl font-bold lg:text-3xl dark:text-white">
                    {story.title}
                    </h2>
                )}
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                {paras?.map((para, index) => (
                  <div key={index} className="container">
                        <p className="text-wrap text-lg text-gray-800 dark:text-neutral-200 truncate">
                            {para.text}
                        </p>

                        {(paras.length -1 === index && para.options.length != 0) && 
                        <div className="my-4">
                            <span className="text-slate-900 text-md dark:text-slate-400 truncate">
                                Pick next option
                            </span>
                            <div className="my-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {para.options.map(option => (
                                    <button key={option.id} onClick={() => load_paragraph(option.next_paragraph_id)}
                                     type="button" className="text-white bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-violet-300 dark:focus:ring-violet-800 shadow-lg shadow-violet-500/50 dark:shadow-lg dark:shadow-violet-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                                        {option.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        }

                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;