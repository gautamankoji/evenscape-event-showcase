interface StatusMessagesProps {
  error  : string | null;
  success: string | null;
}

export const StatusMessages = ({ error, success }: StatusMessagesProps) => (
  <>
    {success && (
      <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 font-medium">{success}</p>
      </div>
    )}
    {error && (
      <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800 font-medium">{error}</p>
      </div>
    )}
  </>
);
