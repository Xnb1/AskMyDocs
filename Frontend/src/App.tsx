// import { useState } from 'react';

// // import './App.css'

// type Msg = { role: "user" | "assistant"; content: string };   //TS type alias

// export default function App () {
  
//   const [messages, setMessages] = useState<Msg[]>([]);   //list(arr) of whole conversation which is initially empty
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);   //It’s used to stop you from sending a second question while the first is still streaming

//   async function send() {
//     if (!input.trim() || loading)  //A guard. input.trim() removes spaces from the ends, so !input.trim() means “the box is empty or only spaces.”
//       return ;
    
//     const next: Msg[] = [...messages, { role: "user", content: input}];//adds new input to old msgs(...messages)
//     setMessages([...next, { role: "assistant", content: ""}]);
//     setInput("");   //Clears the text box and marks the AI as busy
//     setLoading(true);  //Clears the text box and marks the AI as busy
    
//     const res = await fetch("http://localhost:3000/api/chat", {
//       method: "POST",
//       headers: { "Content-type": "application/json"},
//       body: JSON.stringify({ messages: next }), //next (not messages) is used because it includes your newest question
//     });

//     const reader = res.body!.getReader();//getReader() gives you a tool to read it piece by piece like chatgpt
//     const decoder = new TextDecoder();//Data arrives as raw bytes (numbers). The decoder converts bytes into readable text.
//     let answer = "";  //A bucket that collects the full answer as pieces arrive

//     while (true) {
//       const { done, value } = await reader.read(); //Waits for the next piece. It returns two things: done (true when the server has finished) and value (the piece of bytes
//       if (done)
//         break;
//       answer += decoder.decode(value, { stream: true });
//       setMessages([...next, {role: "assistant", content: answer}]);
//     }
//     setLoading(false);
//   }

//   return (
//     <div style={{ maxWidth: 700, margin: "2rem auto", fontFamily: "sans-serif"}}>
//       <h1>Ask My Docs</h1>

//       {messages.map((m,i) => (
//         <p key={i}>
//           <b> {m.role === "user" ? "You" : "AI"}:</b> {m.content}
//         </p>
//       ))}

//       <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && send()} //onKeyDown calls send() when the key pressed is Enter
//           placeholder="Ask Something..."
//           style={{ width: "80%", padding: 8}}
//       />
//       <button onClick={send} disabled={loading}> Send</button>
//     </div>
//   )

// }


import UploadPdf from "./components/UploadPdf";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Ask My Docs</h1>
      <UploadPdf />
      <ChatWindow />
    </div>
  );
}
