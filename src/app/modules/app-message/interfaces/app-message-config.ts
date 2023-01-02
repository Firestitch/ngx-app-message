import { FsListActionSelected } from "@firestitch/list";
import { Observable } from "rxjs";
import {
  DeleteMessageTemplate,
  DownloadMessageQueueAttachment, ForwardMessageQueue, LoadMessageQueueAttachments, LoadLogs, LoadMessage, 
  LoadMessageQueue, LoadMessageQueues, LoadMessages, LoadMessageTemplate, LoadMessageTemplates, 
  ResendMessageQueue, SaveMessage, 
  SaveMessageTemplate, TestMessage, DeleteWebhook, CreateWebhook, LoadWebhooks, LoadMessageQueueEvents, LoadMessageAttachments, SaveMessageAttachment, UploadMessageAttachment, DeleteMessageAttachment, DownloadMessageAttachment 
} from "../types";

export interface FsAppMessageConfig {
  loadMessages: LoadMessages;
  loadMessageQueues: LoadMessageQueues;
  loadMessageQueue: LoadMessageQueue;
  loadMessageQueueEvents: LoadMessageQueueEvents;
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
  bulkMessageQueues?: (action: string, messageQueues: any[]) => Observable<any>;
  getTestEmail: () => Observable<string>;
  deleteWebhook: DeleteWebhook;
  createWebhook: CreateWebhook;
  loadWebhooks: LoadWebhooks;
  loadMessageAttachments: LoadMessageAttachments;
  saveMessageAttachment: SaveMessageAttachment;
  uploadMessageAttachment: UploadMessageAttachment;
  deleteMessageAttachment: DeleteMessageAttachment;
  downloadMessageAttachment: DownloadMessageAttachment;
}
