import "../../../assets/js/modulepreload-polyfill.js";
import { r as react, j as jsxDEV, a as addHmrIntoView, c as createRoot } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
import { d as dist, w as withSuspense, u as useStorage, e as exampleThemeStorage } from "../../../assets/js/index.js";
import { a as attachTwindStyle } from "../../../assets/js/twind.js";
const Newtab$3 = "";
const Newtab$2 = "";
var _jsxFileName$1 = "C:\\Users\\ragha\\OneDrive\\Desktop\\prompt-me-pro\\src\\pages\\newtab\\Newtab.tsx";
const configuration = new dist.Configuration({
  apiKey: "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"
});
const openai = new dist.OpenAIApi(configuration);
const Newtab = () => {
  useStorage(exampleThemeStorage);
  const [CompletedTyping, setCompletedTyping] = react.exports.useState(false);
  const [displayPromptResponse, setdisplayPromptResponse] = react.exports.useState("");
  const [loader, setloader] = react.exports.useState(false);
  const [walletAddress, setwalletAddress] = react.exports.useState("");
  const [totalCoins, settotalCoins] = react.exports.useState(0);
  react.exports.useState(15);
  const [formData, setFormData] = react.exports.useState({
    promptPurpose: "",
    subject: "",
    writingStyle: "",
    decideTone: "",
    targetAudience: "",
    wordLimit: ""
  });
  const [promptRes, setpromptRes] = react.exports.useState("");
  const handleInputChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  react.exports.useEffect(() => {
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
      messages: [{
        role: "user",
        content: "prompt purpose is " + formData.promptPurpose
      }, {
        role: "user",
        content: "tone is " + formData.decideTone
      }, {
        role: "user",
        content: "subject is " + formData.subject
      }, {
        role: "user",
        content: "target audience is" + formData.targetAudience
      }, {
        role: "user",
        content: "writing style is" + formData.writingStyle
      }, {
        role: "user",
        content: "the number of words must not be greater than " + formData.wordLimit
      }]
    });
    let x = response.data.choices[0].message.content;
    setpromptRes(x);
    setloader(false);
    chrome.storage.local.set({
      totalCoins: totalCoins + 5
    }, () => {
    });
    settotalCoins(totalCoins + 5);
  };
  react.exports.useEffect(() => {
    chrome.storage.local.get(["totalCoins"], (result) => {
      console.log(result.totalCoins);
      settotalCoins(result.totalCoins != void 0 ? result.totalCoins : 0);
    });
  }, []);
  react.exports.useEffect(() => {
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
    chrome.storage.local.set({
      walletAddress: e.target.value
    }, () => {
    });
  };
  return /* @__PURE__ */ jsxDEV("div", {
    className: "App flex",
    children: /* @__PURE__ */ jsxDEV("div", {
      className: "container flex flex-col justify-center align-middle gap-2",
      children: [/* @__PURE__ */ jsxDEV("div", {
        className: "mb-3",
        children: [/* @__PURE__ */ jsxDEV("label", {
          htmlFor: "text1",
          className: " mb-2 text-sm text-white font-medium text-gray-900 ",
          children: "Enter Your Solana wallet address to airdrop you tokens"
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 129,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ jsxDEV("div", {
          className: "flex justify-evenly align-middle",
          children: /* @__PURE__ */ jsxDEV("input", {
            type: "text",
            id: "text1",
            name: "promptPurpose",
            value: walletAddress,
            onChange: handleWalletSubmit,
            className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[3/4] focus:ring-blue-500 focus:border-blue-500 block  p-2.5    ",
            placeholder: "Sol wallet address",
            required: true
          }, void 0, false, {
            fileName: _jsxFileName$1,
            lineNumber: 136,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 135,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$1,
        lineNumber: 128,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ jsxDEV("div", {
        className: "inputDiv w-full",
        children: [/* @__PURE__ */ jsxDEV("div", {
          className: "text-2xl font-bold p-1 text-white",
          children: ["Total promptMe", " ", /* @__PURE__ */ jsxDEV("span", {
            className: "w-full items-center text-2xl font-bold p-1 text-transparent bg-clip-text bg-gradient-to-br from-[#7EF29D] to-[#0F68A9]",
            children: [" ", totalCoins]
          }, void 0, true, {
            fileName: _jsxFileName$1,
            lineNumber: 152,
            columnNumber: 13
          }, void 0), "\u{1F4B0} earned"]
        }, void 0, true, {
          fileName: _jsxFileName$1,
          lineNumber: 150,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ jsxDEV("form", {
          className: "grid-cols-2 grid gap-2",
          children: [/* @__PURE__ */ jsxDEV("div", {
            className: "mb-3",
            children: [/* @__PURE__ */ jsxDEV("label", {
              htmlFor: "text1",
              className: " mb-2 text-sm text-white font-medium text-gray-900 ",
              children: "Prompt Purpose"
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 160,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ jsxDEV("input", {
              type: "text",
              id: "text1",
              name: "promptPurpose",
              value: formData.promptPurpose,
              onChange: handleInputChange,
              className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block  p-2.5    ",
              placeholder: "Enter your prompt purpose",
              required: true
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 166,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName$1,
            lineNumber: 159,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ jsxDEV("div", {
            className: "mb-3",
            children: [/* @__PURE__ */ jsxDEV("label", {
              htmlFor: "text2",
              className: "mb-2 text-sm font-medium text-white ",
              children: "Subject"
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 178,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ jsxDEV("input", {
              type: "text",
              id: "text2",
              name: "subject",
              value: formData.subject,
              onChange: handleInputChange,
              className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5    ",
              placeholder: "What is this about ?",
              required: true
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 184,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName$1,
            lineNumber: 177,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ jsxDEV("div", {
            className: "mb-3",
            children: [/* @__PURE__ */ jsxDEV("label", {
              htmlFor: "text3",
              className: "block mb-2 text-white text-sm font-medium text-gray-900 ",
              children: "Writing style"
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 196,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ jsxDEV("select", {
              id: "text3",
              name: "writingStyle",
              value: formData.writingStyle,
              onChange: handleInputChange,
              className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
              required: true,
              children: [/* @__PURE__ */ jsxDEV("option", {
                value: "",
                children: "Writing Style"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 210,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Academic",
                children: "Academic"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 211,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Business",
                children: "Business"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 212,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Casual",
                children: "Casual"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 213,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Creative",
                children: "Creative"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 214,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Descriptive",
                children: "Descriptive"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 215,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Emotional",
                children: "Emotional"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 216,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Expository",
                children: "Expository"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 217,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Formal",
                children: "Formal"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 218,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Informal",
                children: "Informal"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 219,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Legal",
                children: "Legal"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 220,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Medical",
                children: "Medical"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 221,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Narrative",
                children: "Narrative"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 222,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Poetic",
                children: "Poetic"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 223,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Technical",
                children: "Technical"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 224,
                columnNumber: 17
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName$1,
              lineNumber: 202,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName$1,
            lineNumber: 195,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ jsxDEV("div", {
            className: "mb-3",
            children: [/* @__PURE__ */ jsxDEV("label", {
              htmlFor: "text4",
              className: "block mb-2 text-white text-sm font-medium text-gray-900 ",
              children: "Decide Tone"
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 228,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ jsxDEV("select", {
              id: "text4",
              name: "decideTone",
              value: formData.decideTone,
              onChange: handleInputChange,
              className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
              required: true,
              children: [/* @__PURE__ */ jsxDEV("option", {
                value: "",
                children: "Decide Tone"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 242,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Angry",
                children: "Angry"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 243,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Assertive",
                children: "Assertive"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 244,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Confident",
                children: "Confident"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 245,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Cooperative",
                children: "Cooperative"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 246,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Curious",
                children: "Curious"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 247,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Empathetic",
                children: "Empathetic"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 248,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Encouraging",
                children: "Encouraging"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 249,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Enthusiastic",
                children: "Enthusiastic"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 250,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Excited",
                children: "Excited"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 251,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Friendly",
                children: "Friendly"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 252,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Funny",
                children: "Funny"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 253,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Joyful",
                children: "Joyful"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 254,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Sad",
                children: "Sad"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 255,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Serious",
                children: "Serious"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 256,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Surprised",
                children: "Surprised"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 257,
                columnNumber: 17
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName$1,
              lineNumber: 234,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName$1,
            lineNumber: 227,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ jsxDEV("div", {
            className: "mb-3",
            children: [/* @__PURE__ */ jsxDEV("label", {
              htmlFor: "text5",
              className: "block mb-2 text-white text-sm font-medium text-gray-900 ",
              children: "Target Audience"
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 261,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ jsxDEV("select", {
              id: "text5",
              name: "targetAudience",
              value: formData.targetAudience,
              onChange: handleInputChange,
              className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
              required: true,
              children: [/* @__PURE__ */ jsxDEV("option", {
                className: "text-slate-500",
                value: "",
                children: "Select Target Audience"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 275,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Teenager",
                children: "Teenager"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 278,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Business Audience",
                children: "Business Audience"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 279,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Expert Audience",
                children: "Expert Audience"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 280,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Hostile Audience",
                children: "Hostile Audience"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 281,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Neutral Audience",
                children: "Neutral Audience"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 282,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "My Boss",
                children: "My Boss"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 283,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "My Teacher",
                children: "My Teacher"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 284,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "My Parent",
                children: "My Parent"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 285,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "My Colleague",
                children: "My Colleague"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 286,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "My Partner",
                children: "My Partner"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 287,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "My Girlfriend",
                children: "My Girlfriend"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 288,
                columnNumber: 17
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName$1,
              lineNumber: 267,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName$1,
            lineNumber: 260,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ jsxDEV("div", {
            className: "mb-3",
            children: [/* @__PURE__ */ jsxDEV("label", {
              htmlFor: "text5",
              className: "block mb-2 text-white text-sm font-medium text-gray-900 ",
              children: "Word Limit"
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 292,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ jsxDEV("select", {
              id: "text5",
              name: "wordLimit",
              value: formData.wordLimit,
              onChange: handleInputChange,
              className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
              required: true,
              children: [/* @__PURE__ */ jsxDEV("option", {
                value: "",
                children: "Select Word Limit"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 306,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "10 words",
                children: "10 words"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 307,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "50 words",
                children: "50 words"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 308,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "100 words",
                children: "100 words"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 309,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "500 words",
                children: "500 words"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 310,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "1000 words",
                children: "1000 words"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 311,
                columnNumber: 17
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName$1,
              lineNumber: 298,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName$1,
            lineNumber: 291,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ jsxDEV("div", {
            className: "flex items-start mb-3"
          }, void 0, false, {
            fileName: _jsxFileName$1,
            lineNumber: 314,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName$1,
          lineNumber: 158,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$1,
        lineNumber: 149,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ jsxDEV("button", {
        onClick: handleSubmit,
        className: " relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300",
        children: /* @__PURE__ */ jsxDEV("span", {
          className: "w-full flex  items-center justify-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0",
          children: loader ? /* @__PURE__ */ jsxDEV("div", {
            className: "w-5 h-5 border-t-2 border-b-3 items-center border-green-900 rounded-full animate-spin"
          }, void 0, false, {
            fileName: _jsxFileName$1,
            lineNumber: 324,
            columnNumber: 15
          }, void 0) : /* @__PURE__ */ jsxDEV("span", {
            children: " Prompt Me "
          }, void 0, false, {
            fileName: _jsxFileName$1,
            lineNumber: 326,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 322,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 318,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ jsxDEV("div", {
        className: "outputDiv w-full",
        children: [/* @__PURE__ */ jsxDEV("label", {
          htmlFor: "message",
          className: "block mb-2 text-white text-sm font-medium text-gray-900 ",
          children: "Generated Magic Response \u{1FA84}"
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 332,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ jsxDEV("span", {
          className: "block p-2.5 w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ",
          children: displayPromptResponse
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 347,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$1,
        lineNumber: 331,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName$1,
      lineNumber: 127,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 126,
    columnNumber: 5
  }, void 0);
};
const Newtab$1 = withSuspense(Newtab);
const index = "";
var _jsxFileName = "C:\\Users\\ragha\\OneDrive\\Desktop\\prompt-me-pro\\src\\pages\\newtab\\index.tsx";
addHmrIntoView("pages/newtab");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  attachTwindStyle(appContainer, document);
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsxDEV(Newtab$1, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 18,
    columnNumber: 15
  }, this));
}
init();
