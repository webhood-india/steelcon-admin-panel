import React from "react";

// Announcement.jsx
// Tailwind CSS-based component matching the provided screenshot.
// Props: announcements (array) optional. If not provided, component uses sample data.

const sampleData = new Array(7).fill(0).map((_, i) => ({
  id: i + 1,
  text: "This is going be the placeholder for the announcement",
  sendTo: "Manager",
  category: "Design",
}));

export default function Announcement({ announcements = sampleData }) {
  return (
    <div className="p-6">
      <div className="bg-white border rounded-xl shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Announcements</h2>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Announcement
          </button>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs text-gray-500 border-b">
          <div className="col-span-7">Announcement</div>
          <div className="col-span-2">Send to</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-1" />
        </div>

        {/* Rows */}
        <div>
          {announcements.map((a) => (
            <div
              key={a.id}
              className="grid grid-cols-12 gap-4 items-center px-6 py-5 border-b last:border-b-0"
            >
              <div className="col-span-7 text-sm text-gray-700">{a.text}</div>
              <div className="col-span-2 text-sm text-gray-500">{a.sendTo}</div>
              <div className="col-span-2 text-sm text-gray-500">
                {a.category}
              </div>
              <div className="col-span-1 text-right">
                <button
                  aria-label="view"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer spacing */}
        <div className="h-4" />
      </div>
    </div>
  );
}
