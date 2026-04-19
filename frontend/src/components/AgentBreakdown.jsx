export default function AgentBreakdown({ result }) {
  if (!result) {
    return null; // nothing to show yet
  }

  const agents = [
    {
      name: "Text Agent",
      data: result.text_analysis,
    },
    {
      name: "Image Agent",
      data: result.image_analysis,
    },
    {
      name: "Similarity Agent",
      data: result.similarity_analysis,
    },
  ];

  return (
    <div className="space-y-4">
      {agents.map((a, i) => {
        // similarity item doesn't have a `label` field; use the relation
        // value instead (MATCH / MISMATCH) and display score as reason.
        let label = a.data?.label;
        if (!label && a.name === "Similarity Agent") {
          label = a.data?.relation ?? "N/A";
        }

        const isReal = label === "REAL" || label === "MATCH";

        let reasons = "(none)";
        if (a.name === "Similarity Agent" && a.data) {
          reasons = `score: ${a.data.score ?? "?"}`;
        } else {
          reasons = a.data?.reason || a.data?.reasons?.join(", ") || "(none)";
        }

        return (
          <div key={i} className="border p-4 rounded-xl">
            <h3 className="font-bold">{a.name}</h3>
            <p className={isReal ? "text-green-600" : "text-red-600"}>
              {label}
            </p>
            <p className="text-gray-600 text-sm">{reasons}</p>
          </div>
        );
      })}
    </div>
  );
}
