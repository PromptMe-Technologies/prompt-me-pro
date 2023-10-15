import React, { useEffect, useState } from "react";
import logo from "@assets/img/logo.svg";
import "@pages/newtab/Newtab.css";
import "@pages/newtab/Newtab.scss";
import useStorage from "@src/shared/hooks/useStorage";
import exampleThemeStorage from "@src/shared/storages/exampleThemeStorage";
import withSuspense from "@src/shared/hoc/withSuspense";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);

const Newtab = () => {
  const theme = useStorage(exampleThemeStorage);

  const [CompletedTyping, setCompletedTyping] = useState(false);
  const [displayPromptResponse, setdisplayPromptResponse] = useState("");
  const [loader, setloader] = useState(false);

  const [walletAddress, setwalletAddress] = useState("");

  const [totalCoins, settotalCoins] = useState(0);

  const [noOfPromptLeft, setnoOfPromptLeft] = useState(15);

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

  useEffect(() => {
    setCompletedTyping(false);

    let i = 0;
    const stringResponse = promptRes;

    const intervalId = setInterval(() => {
      setdisplayPromptResponse(stringResponse.slice(0, i));

      i++;

      if (i > stringResponse.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [promptRes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloader(true);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "prompt purpose is " + formData.promptPurpose,
        },
        { role: "user", content: "tone is " + formData.decideTone },
        { role: "user", content: "subject is " + formData.subject },
        {
          role: "user",
          content: "target audience is" + formData.targetAudience,
        },
        { role: "user", content: "writing style is" + formData.writingStyle },
        {
          role: "user",
          content:
            "the number of words must not be greater than " +
            formData.wordLimit,
        },
      ],
    });
    let x = response.data.choices[0].message.content;

    setpromptRes(x);
    setloader(false);
    chrome.storage.local.set({ totalCoins: totalCoins + 5 }, () => {});
    settotalCoins(totalCoins + 5);
  };

  useEffect(() => {
    chrome.storage.local.get(["totalCoins"], (result) => {
      console.log(result.totalCoins);
      settotalCoins(result.totalCoins != undefined ? result.totalCoins : 0);
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.get(["walletAddress"], (result) => {
      console.log(result.walletAddress);

      setwalletAddress(result.walletAddress ? result.walletAddress : "");
    });
  }, []);

  console.log(totalCoins);
  console.log(walletAddress);

  const handleWalletSubmit = (e) => {
    e.preventDefault();
    setwalletAddress(e.target.value);
    chrome.storage.local.set({ walletAddress: e.target.value }, () => {});
  };

  return (
    <div className="App flex">
      <div className="container flex flex-col justify-center align-middle gap-2">
        <div className="mb-3">
          <label
            htmlFor="text1"
            className=" mb-2 text-sm text-white font-medium text-gray-900 "
          >
            Enter Your Solana wallet address to airdrop you tokens
          </label>
          <div className="flex justify-evenly align-middle">
            <input
              type="text"
              id="text1"
              name="promptPurpose"
              value={walletAddress}
              onChange={handleWalletSubmit}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[3/4] focus:ring-blue-500 focus:border-blue-500 block  p-2.5    "
              placeholder="Sol wallet address"
              required
            ></input>
          </div>
        </div>
        {/* <span className="text-white text-md">Go crazy with unlimited prompts</span> */}
        <div className="inputDiv w-full">
          <div className="text-2xl font-bold p-1 text-white">
            Total promptMe{" "}
            <span className="w-full items-center text-2xl font-bold p-1 text-transparent bg-clip-text bg-gradient-to-br from-[#7EF29D] to-[#0F68A9]">
              {" "}
              {totalCoins}
            </span>
            💰 earned
          </div>
          <form className="grid-cols-2 grid gap-2">
            <div className="mb-3">
              <label
                htmlFor="text1"
                className=" mb-2 text-sm text-white font-medium text-gray-900 "
              >
                Prompt Purpose
              </label>
              <input
                type="text"
                id="text1"
                name="promptPurpose"
                value={formData.promptPurpose}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block  p-2.5    "
                placeholder="Enter your prompt purpose"
                required
              ></input>
            </div>
            <div className="mb-3">
              <label
                htmlFor="text2"
                className="mb-2 text-sm font-medium text-white "
              >
                Subject
              </label>
              <input
                type="text"
                id="text2"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5    "
                placeholder="What is this about ?"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="text3"
                className="block mb-2 text-white text-sm font-medium text-gray-900 "
              >
                Writing style
              </label>
              <select
                id="text3"
                name="writingStyle"
                value={formData.writingStyle}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              >
                <option value="">Writing Style</option>
                <option value="Academic">Academic</option>
                <option value="Business">Business</option>
                <option value="Casual">Casual</option>
                <option value="Creative">Creative</option>
                <option value="Descriptive">Descriptive</option>
                <option value="Emotional">Emotional</option>
                <option value="Expository">Expository</option>
                <option value="Formal">Formal</option>
                <option value="Informal">Informal</option>
                <option value="Legal">Legal</option>
                <option value="Medical">Medical</option>
                <option value="Narrative">Narrative</option>
                <option value="Poetic">Poetic</option>
                <option value="Technical">Technical</option>
              </select>
            </div>
            <div className="mb-3">
              <label
                htmlFor="text4"
                className="block mb-2 text-white text-sm font-medium text-gray-900 "
              >
                Decide Tone
              </label>
              <select
                id="text4"
                name="decideTone"
                value={formData.decideTone}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              >
                <option value="">Decide Tone</option>
                <option value="Angry">Angry</option>
                <option value="Assertive">Assertive</option>
                <option value="Confident">Confident</option>
                <option value="Cooperative">Cooperative</option>
                <option value="Curious">Curious</option>
                <option value="Empathetic">Empathetic</option>
                <option value="Encouraging">Encouraging</option>
                <option value="Enthusiastic">Enthusiastic</option>
                <option value="Excited">Excited</option>
                <option value="Friendly">Friendly</option>
                <option value="Funny">Funny</option>
                <option value="Joyful">Joyful</option>
                <option value="Sad">Sad</option>
                <option value="Serious">Serious</option>
                <option value="Surprised">Surprised</option>
              </select>
            </div>
            <div className="mb-3">
              <label
                htmlFor="text5"
                className="block mb-2 text-white text-sm font-medium text-gray-900 "
              >
                Target Audience
              </label>
              <select
                id="text5"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              >
                <option className="text-slate-500" value="">
                  Select Target Audience
                </option>
                <option value="Teenager">Teenager</option>
                <option value="Business Audience">Business Audience</option>
                <option value="Expert Audience">Expert Audience</option>
                <option value="Hostile Audience">Hostile Audience</option>
                <option value="Neutral Audience">Neutral Audience</option>
                <option value="My Boss">My Boss</option>
                <option value="My Teacher">My Teacher</option>
                <option value="My Parent">My Parent</option>
                <option value="My Colleague">My Colleague</option>
                <option value="My Partner">My Partner</option>
                <option value="My Girlfriend">My Girlfriend</option>
              </select>
            </div>
            <div className="mb-3">
              <label
                htmlFor="text5"
                className="block mb-2 text-white text-sm font-medium text-gray-900 "
              >
                Word Limit
              </label>
              <select
                id="text5"
                name="wordLimit"
                value={formData.wordLimit}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              >
                <option value="">Select Word Limit</option>
                <option value="10 words">10 words</option>
                <option value="50 words">50 words</option>
                <option value="100 words">100 words</option>
                <option value="500 words">500 words</option>
                <option value="1000 words">1000 words</option>
              </select>
            </div>
            <div className="flex items-start mb-3"></div>
          </form>
        </div>

        <button
          onClick={handleSubmit}
          className=" relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300"
        >
          <span className="w-full flex  items-center justify-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            {loader ? (
              <div className="w-5 h-5 border-t-2 border-b-3 items-center border-green-900 rounded-full animate-spin"></div>
            ) : (
              <span> Prompt Me </span>
            )}
          </span>
        </button>

        <div className="outputDiv w-full">
          <label
            htmlFor="message"
            className="block mb-2 text-white text-sm font-medium text-gray-900 "
          >
            Generated Magic Response 🪄
          </label>
          {/* <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Something great coming up 🌟"
            value={promptRes}
          ></textarea>
          <br/> */}

          <span className="block p-2.5 w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ">
            {displayPromptResponse}
            {/* In this tutorial we will create loading spinner, simple loading spinner, three dot loading spinner, animation loading spinner ,loading spinner with SVG Icon, examples with Tailwind CSS. */}
            {/* {!CompletedTyping && (
              <svg
                viewBox="8 4 8 16"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor"
              >
                <rect x="10" y="6" width="4" height="12" fill="#fff" />
              </svg>
            )} */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default withSuspense(Newtab);
