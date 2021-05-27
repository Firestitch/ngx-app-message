import { Observable } from 'rxjs';

export type TestMessage = (message: any, recipient: string, type: 'sms' | 'email') => Observable<any>;
export type LoadMessage = (message: any) => Observable<any>;
export type LoadMessages = (query: any) => Observable<{ data: any[], paging: any }>;
export type SaveMessage = (message: any) => Observable<any>;
export type LoadTemplates = () => Observable<any[]>;
export type TestEmail = () => string;
export type LoadMessageQueues = (query: any) => Observable<{ data: any[], paging: any }>;
export type LoadMessageQueue = (messageQueue: any) => Observable<any>;
export type LoadLogs = (messageQueue: any, query: any) => Observable<{ data: any[], paging: any }>;
export type LoadAttachments = (messageQueue: any, query: any) => Observable<{ data: any[], paging: any }>;
export type DownloadAttachment = (messageQueueAttachment: any, messageQueue: any) => Observable<any>;
export type ResendMessageQueue = (messageQueue: any) => Observable<any>;
export type ForwardMessageQueue = (messageQueue: number, email: string) => Observable<any>;
export type LoadMessageTemplates = (query: any) => Observable<{ data: any[], paging: any }>;
export type LoadMessageTemplate = (messageTemplate) => Observable<any[]>;
export type SaveMessageTemplate = (messageTemplate) => Observable<any>;
export type DeleteMessageTemplate = (messageTemplate) => Observable<any>;
