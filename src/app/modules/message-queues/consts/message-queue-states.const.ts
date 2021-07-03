import { MessageQueueState } from '../enums/message-queue-state.enum';


export const MessageQueueStates = [
  { name: 'Sent', value: MessageQueueState.Sent },
  { name: 'Partially Sent', value: MessageQueueState.PartiallySent },
  { name: 'Sending', value: MessageQueueState.Sending },
  { name: 'Queued', value: MessageQueueState.Queued },
  { name: 'Canceled', value: MessageQueueState.Canceled },
  { name: 'Invalid Recipients', value: MessageQueueState.InvalidRecipients },
  { name: 'Failed', value: MessageQueueState.Failed }
];
