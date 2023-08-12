function SelectFilter() {
  return (
    <div>
      <details className=" overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
          <span className="text-sm font-medium"> Juan este es: </span>

          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>

        <div className="border-t border-gray-200 bg-white relative">
          <ul className="space-y-1 border-t border-gray-200 p-4">
            <li>
              <label
                htmlFor="FilterRed"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id="FilterRed"
                  className="h-5 w-5 rounded border-gray-300"
                />

                <span className="text-sm font-medium text-gray-700">Red</span>
              </label>
            </li>

            <li>
              <label
                htmlFor="FilterBlue"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id="FilterBlue"
                  className="h-5 w-5 rounded border-gray-300"
                />

                <span className="text-sm font-medium text-gray-700">Blue</span>
              </label>
            </li>

            <li>
              <label
                htmlFor="FilterGreen"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id="FilterGreen"
                  className="h-5 w-5 rounded border-gray-300"
                />

                <span className="text-sm font-medium text-gray-700">Green</span>
              </label>
            </li>

            <li>
              <label
                htmlFor="FilterOrange"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id="FilterOrange"
                  className="h-5 w-5 rounded border-gray-300"
                />

                <span className="text-sm font-medium text-gray-700">
                  Orange
                </span>
              </label>
            </li>

            <li>
              <label
                htmlFor="FilterPurple"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id="FilterPurple"
                  className="h-5 w-5 rounded border-gray-300"
                />

                <span className="text-sm font-medium text-gray-700">
                  Purple
                </span>
              </label>
            </li>

            <li>
              <label
                htmlFor="FilterTeal"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id="FilterTeal"
                  className="h-5 w-5 rounded border-gray-300"
                />

                <span className="text-sm font-medium text-gray-700">Teal</span>
              </label>
            </li>
          </ul>
          <header className="flex items-center justify-between p-4">
            <span className="text-sm text-gray-700"> 0 Selected </span>

            <button
              type="button"
              className="text-sm text-gray-900 underline underline-offset-4"
            >
              Reset
            </button>
          </header>
        </div>
      </details>
    </div>
  );
}

export default SelectFilter;
