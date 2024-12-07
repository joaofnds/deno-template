export interface HealthIndicator {
  check(): Promise<"up" | "down">;
}
