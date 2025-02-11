import { useEffect, useState, useRef } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Sparkles } from "lucide-react";

export function ChatWindow() {
  const [user] = useAuthState(auth);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  interface Message {
    id: string;
    role: string;
    content: string;
    timestamp: {
      seconds: number;
    };
  }

  const [messages, setMessages] = useState<Array<Message>>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "conversations"),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          role: data.role,
          content: data.content.replace(/^\[Spark\]:\s*/g, ""), // Remove [SPARK]: prefix
          timestamp: data.timestamp,
        };
      });
      setMessages(messages);

      // Set typing status based on the last message
      const lastMessage = messages[messages.length - 1];
      setIsTyping(lastMessage?.role === "user");
    });

    return () => unsubscribe();
  }, [user]);

  const formatMessageContent = (content: string) => {
    // Remove excess asterisks and format the text properly
    const cleanedContent = content
      .replace(/\*+\s*\*+/g, "") // Remove multiple asterisks
      .replace(/\*+\s*([^*]+)\s*\*+/g, "$1") // Remove asterisks around text
      .split("\n")
      .filter((line) => line.trim() !== "") // Remove empty lines
      .join("\n");

    // Split by newlines and format each section
    const sections = cleanedContent.split("\n");

    return sections.map((section, index) => {
      // Check if it's a header (ends with ':')
      if (section.trim().endsWith(":")) {
        return (
          <h3 key={index} className="font-semibold text-lg mt-4 mb-2">
            {section}
          </h3>
        );
      }

      // Regular paragraph
      return (
        <p key={index} className="mb-3 leading-relaxed">
          {section}
        </p>
      );
    });
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 px-4 py-3">
      <div className="flex space-x-2">
        <div
          className="w-2 h-2 bg-green-500 rounded-full animate-bounce "
        ></div>
        <div
          className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]"
        ></div>
        <div
          className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.4s]"
        ></div>
      </div>
      <span className="text-sm text-green-500">Spark is typing...</span>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          } items-start space-x-4 animate-fadeIn ${
            message.role === "assistant" ? "mb-6" : "mb-4"
          }`}
        >
          {message.role === "assistant" && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          )}
          <div
            className={`flex-1 max-w-2xl ${
              message.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block rounded-2xl p-4 border ${
                message.role === "user"
                  ? "bg-gray-900 border-green-500/20 ml-auto"
                  : "bg-gray-900 border-green-500/20"
              }`}
            >
              <div className="text-white space-y-2">
                {formatMessageContent(message.content)}
              </div>
              
            </div>
          </div>
          
        </div>
      ))}
      {isTyping && (
        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 max-w-2xl">
            <div className="inline-block rounded-2xl bg-gray-900 border border-green-500/20">
              <TypingIndicator />
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
