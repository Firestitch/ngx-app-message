import { FsFile } from '@firestitch/file';
import { Observable } from 'rxjs';

export type TestMessage = (message: any, recipient: string, type: 'sms' | 'email') => Observable<any>;
export type LoadMessage = (message: any) => Observable<any>;
export type LoadMessages = (query: any) => Observable<{ data: any[], paging: any }>;
export type SaveMessage = (message: any) => Observable<any>;
export type LoadTemplates = () => Observable<any[]>;
export type TestEmail = () => string;
export type LoadMessageQueues = (query: any) => Observable<{ data: any[], paging: any }>;
export type LoadMessageQueueEvents = (messageQueue: any, query: any) => Observable<{ data: any[], paging: any }>;
export type LoadMessageQueue = (messageQueue: any) => Observable<any>;
export type LoadLogs = (messageQueue: any, query: any) => Observable<{ data: any[], paging: any }>;
export type LoadMessageQueueAttachments = (messageQueue: any, query: any) => Observable<{ data: any[], paging: any }>;
export type DownloadMessageQueueAttachment = (messageQueueAttachment: any, messageQueue: any) => Observable<any>;
export type ResendMessageQueue = (messageQueue: any) => Observable<any>;
export type ForwardMessageQueue = (messageQueue: number, email: string) => Observable<any>;
export type LoadMessageTemplates = (query?: any) => Observable<{ data: any[], paging: any }>;
export type LoadMessageTemplate = (messageTemplate: any) => Observable<any[]>;
export type DeleteMessageTemplate = (messageTemplate: any) => Observable<any>;
export type SaveMessageTemplate = (messageTemplate: any) => Observable<any>;

export type SaveMessageAttachment = (messageAttachment: any) => Observable<any>;
export type DeleteMessageAttachment = (messageAttachment: any) => Observable<any>;
export type UploadMessageAttachment = (message, fsFile: FsFile) => Observable<any>;
export type DownloadMessageAttachment = (messageAttachment) => void;
export type LoadMessageAttachments = (message, query?: any) => Observable<{ data: any[], paging: any }>;

export type DeleteWebhook = (webhook: any) => Observable<any>;
export type CreateWebhook = () => Observable<any>;
export type LoadWebhooks = () => Observable<any>;
