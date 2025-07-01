"use client";

import { useSendMail } from "@/app/home/inbox/useSendMail";
import { 
  X, 
  Minus, 
  Maximize, 
  Paperclip, 
  Link, 
  ImageIcon, 
  Smile, 
  MoreVertical,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  ListOrdered,
  Palette
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ComposeMailForm({ onClose, onMinimize, onMaximize }) {
  const { form, loading, handleChange, handleSend } = useSendMail();
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [showFormatting, setShowFormatting] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [form.body]);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (onMinimize) onMinimize();
  };

  const getInputBorderClass = (fieldName) =>
    activeField === fieldName
      ? "border-b-2 border-blue-500"
      : "border-b border-gray-200 hover:border-gray-300";

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 w-64 bg-white rounded-lg shadow-lg z-50 border border-gray-300">
        <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg cursor-pointer" onClick={handleMinimize}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700 truncate">New Message</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={(e) => { e.stopPropagation(); onMaximize?.(); }} className="text-gray-500 hover:text-gray-700 p-1">
              <Maximize className="h-3 w-3" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onClose?.(); }} className="text-gray-500 hover:text-gray-700 p-1">
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-[540px] bg-white rounded-lg shadow-2xl z-50 border border-gray-300 overflow-hidden flex flex-col max-h-[680px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <span className="text-sm font-medium text-gray-900">New Message</span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleMinimize}
            className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
            title="Minimize"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            onClick={onMaximize}
            className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
            title="Pop-out"
          >
            <Maximize className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:bg-gray-100 hover:text-red-600 p-1.5 rounded-full transition-colors"
            title="Discard draft"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Email Fields */}
      <div className="flex-none bg-white">
        {/* To Field */}
        <div className={`flex items-center px-4 py-2 ${getInputBorderClass("to")}`}>
          <label className="w-8 text-sm text-gray-600 font-medium">To</label>
          <div className="flex-1 flex items-center">
            <input
              type="email"
              name="to_email"
              value={form.to_email}
              onChange={handleChange}
              onFocus={() => setActiveField("to")}
              onBlur={() => setActiveField(null)}
              placeholder="Recipients"
              className="flex-1 outline-none text-sm py-1 text-gray-900 placeholder-gray-400"
            />
            {!showCcBcc && (
              <div className="flex items-center gap-2 ml-2">
                <button
                  onClick={() => setShowCcBcc(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Cc
                </button>
                <button
                  onClick={() => setShowCcBcc(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Bcc
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cc Field */}
        {showCcBcc && (
          <div className={`flex items-center px-4 py-2 ${getInputBorderClass("cc")}`}>
            <label className="w-8 text-sm text-gray-600 font-medium">Cc</label>
            <input
              type="email"
              name="cc_email"
              value={form.cc_email || ""}
              onChange={handleChange}
              onFocus={() => setActiveField("cc")}
              onBlur={() => setActiveField(null)}
              className="flex-1 outline-none text-sm py-1 text-gray-900 placeholder-gray-400"
              placeholder="Recipients"
            />
          </div>
        )}

        {/* Bcc Field */}
        {showCcBcc && (
          <div className={`flex items-center px-4 py-2 ${getInputBorderClass("bcc")}`}>
            <label className="w-8 text-sm text-gray-600 font-medium">Bcc</label>
            <input
              type="email"
              name="bcc_email"
              value={form.bcc_email || ""}
              onChange={handleChange}
              onFocus={() => setActiveField("bcc")}
              onBlur={() => setActiveField(null)}
              className="flex-1 outline-none text-sm py-1 text-gray-900 placeholder-gray-400"
              placeholder="Recipients"
            />
          </div>
        )}

        {/* Subject Field */}
        <div className={`flex items-center px-4 py-2 border-b border-gray-200`}>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            onFocus={() => setActiveField("subject")}
            onBlur={() => setActiveField(null)}
            placeholder="Subject"
            className="w-full outline-none text-sm py-1 text-gray-900 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setShowFormatting(!showFormatting)}
            className="text-gray-600 hover:bg-gray-200 p-1.5 rounded transition-colors"
            title="Formatting options"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button className="text-gray-600 hover:bg-gray-200 p-1.5 rounded transition-colors" title="Attach files">
            <Paperclip className="h-4 w-4" />
          </button>
          <button className="text-gray-600 hover:bg-gray-200 p-1.5 rounded transition-colors" title="Insert link">
            <Link className="h-4 w-4" />
          </button>
          <button className="text-gray-600 hover:bg-gray-200 p-1.5 rounded transition-colors" title="Insert emoji">
            <Smile className="h-4 w-4" />
          </button>
          <button className="text-gray-600 hover:bg-gray-200 p-1.5 rounded transition-colors" title="Insert photo">
            <ImageIcon className="h-4 w-4" />
          </button>
        </div>
        <button className="text-gray-600 hover:bg-gray-200 p-1.5 rounded transition-colors" title="More options">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      {/* Extended Formatting Toolbar */}
      {showFormatting && (
        <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50">
          <select className="text-sm border border-gray-300 rounded px-2 py-1 text-gray-700">
            <option>Sans Serif</option>
            <option>Serif</option>
            <option>Monospace</option>
          </select>
          <select className="text-sm border border-gray-300 rounded px-2 py-1 text-gray-700 ml-2">
            <option>Normal</option>
            <option>Small</option>
            <option>Large</option>
          </select>
          <div className="border-l border-gray-300 mx-2 h-6"></div>
          <button className="text-gray-600 hover:bg-gray-200 p-1 rounded" title="Bold">
            <Bold className="h-4 w-4" />
          </button>
          <button className="text-gray-600 hover:bg-gray-200 p-1 rounded" title="Italic">
            <Italic className="h-4 w-4" />
          </button>
          <button className="text-gray-600 hover:bg-gray-200 p-1 rounded" title="Underline">
            <Underline className="h-4 w-4" />
          </button>
          <button className="text-gray-600 hover:bg-gray-200 p-1 rounded" title="Text color">
            <Palette className="h-4 w-4" />
          </button>
          <div className="border-l border-gray-300 mx-2 h-6"></div>
          <button className="text-gray-600 hover:bg-gray-200 p-1 rounded" title="Align left">
            <AlignLeft className="h-4 w-4" />
          </button>
          <button className="text-gray-600 hover:bg-gray-200 p-1 rounded" title="Numbered list">
            <ListOrdered className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Message Body */}
      <div className="flex-1 px-4 py-3 overflow-y-auto min-h-[200px]">
        <textarea
          ref={textareaRef}
          name="body"
          value={form.body}
          onChange={handleChange}
          onFocus={() => setActiveField("body")}
          onBlur={() => setActiveField(null)}
          className="w-full h-full min-h-[200px] outline-none resize-none text-sm text-gray-900 placeholder-gray-400 leading-relaxed"
          placeholder="Compose email"
          style={{ fontFamily: 'inherit' }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={handleSend}
            disabled={loading || !form.to_email?.trim()}
            className={`${
              loading || !form.to_email?.trim() 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white text-sm font-medium px-6 py-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
          <button 
            className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
            title="Attach files"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <button 
            className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
            title="Insert link"
          >
            <Link className="h-4 w-4" />
          </button>
          <button 
            className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
            title="Insert emoji"
          >
            <Smile className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="text-gray-600 hover:bg-gray-100 p-1.5 rounded transition-colors" title="More options">
            <MoreVertical className="h-4 w-4" />
          </button>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:bg-gray-100 p-1.5 rounded transition-colors"
            title="Discard draft"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}