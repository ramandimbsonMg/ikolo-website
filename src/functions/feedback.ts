export function sendFeedback(
  message: string,
  type: "success" | "error" | "info" = "info"
) {
  console.log(`[${type.toUpperCase()}] ${message}`);
}
