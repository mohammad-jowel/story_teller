import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const Write = () => {
    const [title, setTitle] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState({'name':'', 'para':''});
    const [story, setStory] = useState();
    const [addOptionBtn, setAddOptionBtn] = useState(true);
    const [currOption, setCurrOption] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/write_story', {
            title: title,
            paragraph: paragraph,
          })
          .then(function (response) {
            setTitle('');
            setParagraph('');
            console.log(response.data);
            setStory(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const addOption = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/add_option', {
            para_id: story.first_para.id,
            name: option.name,
            para: option.para,
          })
          .then(function (response) {
            console.log(response.data);
            setOptions(prevOptions => [...prevOptions,  option]);
            setOption({'name':'', 'para':''});
            setAddOptionBtn(true);
          })
          .catch(function (error) {
            console.log(error);
            });
    }

    const optionOnclick = (name) => {
        setCurrOption();
        setAddOptionBtn(false);
    }

    const addOnclick = (name) => {
        setCurrOption('');
        setAddOptionBtn(true);
    }


    return (
        <main className="min-h-dvh place-items-center bg-gray-900 px-6 py-10 md:px-12 md:py-14 lg:py-16">
            <div className="md:max-w-screen-lg lg:max-w-screen-xl mx-auto">
                    <a className="mb-4 md:mb-8 inline-flex items-center gap-x-1.5 text-md text-gray-600 decoration-2 hover:text-violet-600 dark:text-violet-400" href="/">
                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                        </svg>
                        Go back
                    </a>
                    {!story ?
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Story Title</label>

                            <input value={title} onChange={(e) => setTitle(e.target.value)}
                            type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title..." required />
                        </div>
                        <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Paragraph</label>

                        <textarea value={paragraph} onChange={(e) => setParagraph(e.target.value)}
                        rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Paragraph..."></textarea>
                        </div>
                        <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                            Save
                        </button>
                    </form> : 
                    <div className="container w-full">
                        <h2 className="text-2xl font-bold lg:text-3xl dark:text-white">
                            {story.title}
                        </h2>
                        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                        <p className="text-wrap text-lg text-gray-800 dark:text-neutral-200 truncate">
                            {story.first_para.text}
                        </p>
                        <div className="py-4 flex justify-center space-x-2">
                            {options[0].name != '' && options.map((option, index) => (

                                <button key={option.index} onClick={() => optionOnclick(option.name)}

                                type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    {option.para}
                                </button>
                            ))}
                            {addOptionBtn && 
                            <button onClick={() => addOnclick}
                             type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Add Option
                            </button>
                            }
                        </div>
                        {!addOptionBtn && currOption != null &&
                        <p className="text-wrap text-lg text-gray-800 dark:text-neutral-200 truncate">
                            {currOption.para}
                        </p>
                        }
                        {!addOptionBtn && 
                        <form onSubmit={addOption}>
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Story Title</label>

                                <input value={title} onChange={(e) => setTitle(e.target.value)}
                                type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title..." required />
                            </div>
                            <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Paragraph</label>

                            <textarea value={paragraph} onChange={(e) => setParagraph(e.target.value)}
                            rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Paragraph..."></textarea>
                            </div>
                            <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                                Save
                            </button>
                        </form>
                        }
                    </div>
                    }
            </div>
        </main>
    )
}

export default Write;