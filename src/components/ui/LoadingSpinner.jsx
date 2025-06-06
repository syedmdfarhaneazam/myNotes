import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loader2
        size={32}
        style={{
          animation: "spin 1s linear infinite",
          color: "hsl(var(--primary))",
        }}
      />
    </div>
  );
}
