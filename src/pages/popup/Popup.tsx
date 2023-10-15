/* eslint-disable prettier/prettier */

import React, { useState } from "react";
import logo from "@assets/img/logo.svg";
import "@pages/popup/Popup.css";
import useStorage from "@src/shared/hooks/useStorage";
import exampleThemeStorage from "@src/shared/storages/exampleThemeStorage";
import withSuspense from "@src/shared/hoc/withSuspense";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

// @ts-ignore
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);

  const [formData, setFormData] = useState({
    promptPurpose: "",
    subject: "",
    writingStyle: "",
    decideTone: "",
    targetAudience: "",
    wordLimit: "",
  });

  const [promptRes, setpromptRes] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const resd=axios.post("https://api.openai.com/v1/chat/completions",{
    //   "model": "gpt-3.5-turbo",
    //  "messages": [formData],
    //  "temperature": 0.7
    // },{
    //   headers:headers
    // })

    // setpromptRes(resd)

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "user", "content": "prompt purpose is " + formData.promptPurpose},
        {"role": "user", "content": "tone is " + formData.decideTone},
        {"role": "user", "content": "subject is " + formData.subject},
        {"role": "user", "content": "target audience is" + formData.targetAudience},
        {"role": "user", "content": "writing style is" + formData.writingStyle},
        {"role": "user", "content": "the number of words must not be greater than " + formData.wordLimit}
        ],
    });
    let x = response.data.choices[0].message.content
    
    setpromptRes(x);
  };

  return (
    <div className="App flex">
      <div className="container flex justify-center align-middle gap-2">
        <div className="inputDiv w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="text1"
                className=" mb-2 text-sm font-medium text-gray-900 "
              >
                Prompt Purpose
              </label>
              <input
                type="text"
                id="text1"
                name="promptPurpose"
                value={formData.promptPurpose}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                placeholder="Enter your prompt purpose"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="text2"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Subject
              </label>
              <input
                type="text"
                id="text2"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="text3"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Writing style
              </label>
              <input
                type="text"
                id="text3"
                name="writingStyle"
                value={formData.writingStyle}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="text4"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Decide Tone
              </label>
              <input
                type="text"
                id="text4"
                name="decideTone"
                value={formData.decideTone}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="text5"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Target Audience
              </label>
              <input
                type="text"
                id="text5"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="text5"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Word Limit
              </label>
              <input
                type="text"
                id="text5"
                name="wordLimit"
                value={formData.wordLimit}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                required
              />
            </div>
            <div className="flex items-start mb-3"></div>
            <button className=" relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300">
              <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                Prompt Me
              </span>
            </button>
          </form>
        </div>
        <div className="outputDiv w-full">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Generated Magic Response 🪄
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Something great coming up 🌟"
            value={promptRes}
          ></textarea>
          <div className="outputDiv w-full">
            {/* Display the form data in the output section */}
            <pre>{JSON.stringify(formData, null, 2)}</pre>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default withSuspense(Popup);
