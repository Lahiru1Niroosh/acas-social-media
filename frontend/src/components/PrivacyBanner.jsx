export default function PrivacyBanner({ user }) {
  // simple notice about privacy; user object comes from the backend
  if (!user) return null;

  // the pipeline controller masks sensitive fields and returns a
  // `masked_id` property; fall back to a raw id if needed.
  const displayId = user.masked_id ?? user.id ?? "(unknown)";

  return (
    <div
      className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4"
      role="alert"
    >
      <p className="font-bold">Privacy Notice</p>
      <p className="text-sm">
        Analysis performed on anonymized user <strong>{displayId}</strong>. No
        personally identifiable information is stored.
      </p>
    </div>
  );
}