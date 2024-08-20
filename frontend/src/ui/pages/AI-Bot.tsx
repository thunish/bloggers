import { useRef, useState } from "react";
import { Bot } from "../components/Bot";
import { Your } from "../components/Your";
import axios from "axios";

type Conversation = {
  type: string;
  text: string;
};

const AiBot = () => {
  const [query, setQuery] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const inputRef = useRef<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (inputRef.current) inputRef.current.value = "";
      const res = await axios.post(`http://127.0.0.1:8787/api/v1/bot/chat`, {
        query: query,
      });
      console.log(res);
      const { response } = res.data;
      setConversations((prev) => [...prev, { type: "your", text: query }]);
      setQuery("");
      setConversations((prev) => [...prev, { type: "bot", text: response }]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col fixed right-0 mr-4 bg-white p-6 rounded-lg  border-[#e5e7eb] w-4/12 h-[112px] justify-between">
        <div className="flex flex-col space-y-1.5 pb-6">
          <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
          <p className="text-sm text-[#6b7280] leading-3">Powered by Blogger's Spot</p>
        </div>

        <div
          style={{
            boxShadow: "0 0 rgba(0, 0, 0, 0), 0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          }}
          className="overflow-y-auto flex-grow pr-4 min-h-[474px]"
        >
          <Bot answer="How Can I help you today?" />
          {conversations.map((each, index) => {
            if (each.type === "your") {
              return <Your key={index} prompt={each.text} />;
            } else {
              return <Bot key={index} answer={each.text} />;
            }
          })}
        </div>

        <div className="flex items-center pt-4">
          <form className="flex items-center justify-center w-full space-x-2">
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] text-[#030712] focus-visible:ring-offset-2"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="Type your message"
              ref={inputRef}
            />
            <button
              onClick={handleSubmit}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AiBot;
