import { FsListActionSelected } from "@firestitch/list";
import { Observable } from "rxjs";
import {
  DeleteMessageTemplate,
  DownloadMessageQueueAttachment, ForwardMessageQueue, LoadMessageQueueAttachments, LoadLogs, LoadMessage, 
  LoadMessageQueue, LoadMessageQueues, LoadMessages, LoadMessageTemplate, LoadMessageTemplates, 
  ResendMessageQueue, SaveMessage, 
  SaveMessageTemplate, TestMessage 
} from "../types";

export interface FsAppMessageConfig {
  loadMessages: LoadMessages;
  loadMessageQueues: LoadMessageQueues;
  loadMessageQueue: LoadMessageQueue;
  loadLogs: LoadLogs;
  loadMessageQueueAttachments: LoadMessageQueueAttachments;
  downloadMessageQueueAttachment: DownloadMessageQueueAttachment;
  resendMessageQueue: ResendMessageQueue;
  forwardMessageQueue: ForwardMessageQueue;
  loadMessage: LoadMessage;
  saveMessage: SaveMessage;
  testMessage: TestMessage;
  loadMessageTemplates: LoadMessageTemplates;
  loadMessageTemplate: LoadMessageTemplate;
  saveMessageTemplate: SaveMessageTemplate;
  deleteMessageTemplate: DeleteMessageTemplate;
  cancelMessageQueues: (event: FsListActionSelected) => Observable<any>;
  getTestEmail: () => Observable<string>;
}
