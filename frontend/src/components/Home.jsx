import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Home = () => {
  const [stories, setStories] = useState();
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/')
    .then(function (response) {
      console.log(response)
      setStories(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])
  return (
    <section className="min-h-dvh bg-white dark:bg-gray-900">
      <div className="py-8 px-4 md:py-10 mx-auto max-w-screen-xl lg:px-6">
        <div className="flex justify-between">
          <h1 className="text-left text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Stories
          </h1>
          <a href="/write" type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Write
          </a>

        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" /> 

        <div className="grid gap-8 lg:grid-cols-2">

          {stories?.map(story => (
            <article key={story.id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-slate-800 dark:border-slate-700">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {story.title}
                </h2>
                <p className="mb-4 text-md font-medium text-gray-300 dark:text-gray-300">
                    {story.first_para.text.substring(0,200)+'..'}
                </p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <span className="font-medium dark:text-white">
                        </span>
                    </div>
                    <a href={`story/${story.id}`} className="flex items-center text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-600">
                        Read
                        <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path></svg>
                    </a>
                </div>
            </article>
          ))} 
                                
         </div>  
      </div>
    </section>
  )
}

export default Home