interface StatusMessageProps {
  type: "loading" | "error" | "empty";
  message: string;
}

const StatusMessage = ({
  type,
  message,
}: StatusMessageProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">

      {type === "loading" && (
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      )}

      {type === "error" && (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl text-red-500">
          !
        </div>
      )}

      {type === "empty" && (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-400">
          🔍
        </div>
      )}

      <p
        className={`text-lg font-semibold ${
          type === "error"
            ? "text-red-600"
            : "text-gray-900"
        }`}
      >
        {message}
      </p>
    </div>
  );
};

export default StatusMessage;