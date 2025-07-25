"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
          <div className="max-w-md w-full mx-auto p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                심각한 문제가 발생했습니다!
              </h1>
              <p className="text-gray-600 mb-8">{error.message}</p>
              <button
                onClick={() => reset()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                다시 시도
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
