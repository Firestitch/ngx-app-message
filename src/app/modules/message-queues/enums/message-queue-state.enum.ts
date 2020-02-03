export enum MessageQueueState {
  Sent = 'S',
  PartiallySent = 'P',
  Sending = 'E',
  Queued = 'Q',
  Canceled = 'C',
  InvalidRecipients = 'I',
  Failed = 'F'
}