import { Queue } from "bullmq";

export interface QueueGetter<DataType = unknown> {
  getQueue(): Queue<DataType>;
}
