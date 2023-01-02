import { FsFile } from '@firestitch/file';
import { FsAppMessageConfig } from '@firestitch/package';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';


export function appMessageConfig(): FsAppMessageConfig {
  const templateMessage = {"id":1,"content":' <div class = "body"><div class="content"> {$content} </div></div> ',"styles": ".body { padding: 20px } .content { background: #efefef; padding: 25px; border-radius: 10px; }", "name":"Default Template"};

  const messageAttachment = {
    id: 34,
    state: 'active',
    filename: 'document.pdf',
    size: 234556,
  };

  const getMessageQueue = () => {
    const html: any = "<!DOCTYPE html \"-\/\/W3C\/\/DTD HTML 4.0 Transitional\/\/EN\" \"http:\/\/www.w3.org\/TR\/REC-html40\/loose.dtd\">\n<html>\n  <body>\n    <div class=\"body\" style=\"background: #0061AF; padding: 20px; font-family: Helvetica, Arial, Sans; border-radius: 3px; font-size: 14px; color: #333;\">\n  <img src=\"https:\/\/hhsi.s3.ca-central-1.amazonaws.com\/pub\/message\/logo.png\" class=\"logo\" style=\"width: 230px; margin: auto; margin-bottom: 20px; display: block;\"><\/img><div class=\"content\" style=\"background: #ffffff; border-radius: 3px; padding: 10px;\">\n    \t<h1>2 Pending Approvals For You<\/h1>\n\n\t\t\t<div>\n\t\t\t<span class=\"area\" style=\"font-weight: bold; color: #5a5a5a;\">\n\t\t\t\tON-200\t\t\t<\/span>\n\t\t\t\t\t\t\t\t\t\t<a href=\"https:\/\/app.hallmarkhousekeeping.com\/workorders\/137\" style=\"color: #0061AF; text-decoration: none;\">\n\t\t\t\t\t<span class=\"identifier\">R5-CB<\/span>:\n\t\t\t\t\tWork Order\n\t\t\t\t<\/a>\n\t\t\t\n\t\t<\/div>\n\t\t\t<div>\n\t\t\t<span class=\"area\" style=\"font-weight: bold; color: #5a5a5a;\">\n\t\t\t\tON-200\t\t\t<\/span>\n\t\t\t\t\t\t\t\t\t\t<a href=\"https:\/\/app.hallmarkhousekeeping.com\/workorders\/143\" style=\"color: #0061AF; text-decoration: none;\">\n\t\t\t\t\t<span class=\"identifier\">R6-CB<\/span>:\n\t\t\t\t\tWork Order\n\t\t\t\t<\/a>\n\t\t\t\n\t\t<\/div>\n\t<h1>2 Pending Approvals<\/h1>\n<div class=\"tiles\" style=\"display: flex; flex-direction: row;\">\n\t\t\t<div class=\"tile\" style=\"border-radius: 4px; padding: 8px; min-width: 100px; margin-right: 5px; background: #f4f4f4; margin: 0;\">\n\t\t\t<div class=\"label\" style=\"color: #9a9a9a; font-size: 12px;\">Ops Approval<\/div>\n\t\t\t<div class=\"content\" style=\"font-size: 20px; padding-top: 5px; background: none; border-radius: 3px; padding: 10px;\">2<\/div>\n\t\t<\/div>\n\t<\/div>\n\n\t<h2>\n\t\t2 Pending Ops Approval\t<\/h2>\n\n\t\t\t<div>\n\t\t\t<span class=\"area\" style=\"font-weight: bold; color: #5a5a5a;\">\n\t\t\t\tON-200\t\t\t<\/span>\n\t\t\t\t\t\t\t\t\t\t<a href=\"https:\/\/app.hallmarkhousekeeping.com\/workorders\/137\" style=\"color: #0061AF; text-decoration: none;\">\n\t\t\t\t\t<span class=\"identifier\">R5-CB<\/span>:\n\t\t\t\t\tWork Order\n\t\t\t\t<\/a>\n\t\t\t\n\t\t<\/div>\n\t\t\t<div>\n\t\t\t<span class=\"area\" style=\"font-weight: bold; color: #5a5a5a;\">\n\t\t\t\tON-200\t\t\t<\/span>\n\t\t\t\t\t\t\t\t\t\t<a href=\"https:\/\/app.hallmarkhousekeeping.com\/workorders\/143\" style=\"color: #0061AF; text-decoration: none;\">\n\t\t\t\t\t<span class=\"identifier\">R6-CB<\/span>:\n\t\t\t\t\tWork Order\n\t\t\t\t<\/a>\n\t\t\t\n\t\t<\/div>\n\t\n  <\/div>\n<\/div>\n  <\/body>\n<\/html>\n";
    
    return {
      "id": 2115,
      "state": "S",
      "messageId": 7,
      "attempts": 1,
      "scheduledDate": "2021-09-08T16:45:04+00:00",
      "createdDate": "2021-09-08T16:45:04+00:00",
      "sentDate": "",
      "type": "E",
      "data": [],
      "emailMessageQueue": {
          "id": 2115,
          "messageId": 7,
          "attempts": 1,
          "scheduledDate": "2021-09-08T16:45:04+00:00",
          "createdDate": "2021-09-08T16:45:04+00:00",
          "sentDate": "",
          "type": "E",
          "data": [],
          "body": html,
          "format": "H",
          "subject": "Invitation to Join Driver Training Dev",
          "toRecipients": [
              "fs.projecttest.2021+multipleinvites@gmail.com"
          ],
          "ccRecipients": [],
          "bccRecipients": [],
          "replyEmail": [],
          "fromEmail": "",
          "fromName": ""
      },
      "smsMessageQueue": null,
      "messageQueueAttachmentCount": 0,
      "messageQueueRecipients": [
          {
              "id": 1970,
              "messageQueueId": 2115,
              "recipient": "fs.projecttest.2021+multipleinvites@gmail.com",
              "state": "S",
              "message": null,
              "reference": "ba2606a4939d47929156ed30975aefa3",
              "createDate": "",
              "method": "send",
              "sentDate": ""
          }
      ]
    };
  };

  const config: FsAppMessageConfig = {
    loadMessageQueues: (query) => {
      return of({
        "paging": { "limit": 25, "records": 157, "offset": 0 },
        "data": [getMessageQueue()]
      });
    },    
    loadMessageQueue: (messageQueue) => {
      return of(getMessageQueue());
    },
    loadLogs: (messageQueue, query) => {
      return of({
        "paging": {
          "limit": 25,
          "records": 1,
          "offset": 0
        },
        "data": [
          {
            "id": 2303,
            "createdDate": "2021-09-08T16:45:04+00:00",
            "message": "Sent to fs.projecttest.2021+multipleinvites@gmail.com",
            "messageQueueId": 2115
          }
        ]
      });
    },
    loadMessageQueueAttachments: (messageQueue, query) => {
      return of({"paging":{"limit":25,"records":1,"offset":0},"data":[{"id":89,"state":"A","filesize":67214,"filename":"ON-N88.74.pdf","guid":"e40478efad2ad820ecc17080ddb37036154","type":"A","messageQueueId":154}]});
    },
    loadMessageQueueEvents: (messageQueue, query) => {
      return of({
        "paging":{"limit":25,"records":1,"offset":0},
        "data":[
          {
            "id":89,
            "type":"open",
            "createDate": "2021-09-08T16:45:04+00:00", 
            "meta": {},
            "messageQueueRecipient": {"id":4904,"messageQueueId":4914,"recipient":"email@email.com","state":"S","message":null,"reference":null,"createDate":"2022-03-16T11:39:30+00:00","method":"send","sentDate":"2022-03-16T11:39:30+00:00"}
          },
          {
            "id":89,
            "type":"click",
            "createDate": "2021-09-08T16:45:04+00:00", 
            "meta": {"url": "https://specify.dev.firestitch.com/signin"},
            "messageQueueRecipient": {"id":4904,"messageQueueId":4914,"recipient":"email@email.com","state":"S","message":null,"reference":null,"createDate":"2022-03-16T11:39:30+00:00","method":"send","sentDate":"2022-03-16T11:39:30+00:00"}
          }
        ]
      });
    },
    resendMessageQueue: (messageQueue) => {
      return of(messageQueue);
    },
    forwardMessageQueue: (messageQueue, email) => {
      return of(messageQueue);
    },
    loadMessages: () => {
      return of({
        "paging": { "limit": 25, "records": 12, "offset": 0 },
        "data": [
          {
            "id": 26,
            "state": "A",
            "guid": "38ede7efce8eba0d80e52a7532906475",
            "name": "Student Schdeule Reminder",
            "description": "",
            "tag": "\\_MESSAGE_STUDENT_SCHEDULE_REMINDER",
            "emailMessage": {
                "id": 26,
                "messageTemplateId": 1,
                "format": "H",
                "subject": "Reminder of {$eventCount} {\"Event\"|plural:$eventCount}",
                "body": "{if $contentTop}<div class=\"content-top\">{$contentTop}</div>{/if}\r\n<h1>Reminder of {$eventCount} {\"Event\"|plural:$eventCount}</h1>\n\n<p>Here are your upcoming {$organization[\"name\"]} {$office[\"name\"]} events:</p>\n\n{foreach from=$events item=event}\n<div>{$event[\"date\"]}</div>\n<small>\n  {if isset($event[\"activities\"])}\n    {foreach $event[\"activities\"] as $activity}\n      <div>{$activity[\"activityGroup\"][\"name\"]}: {$activity[\"topic\"][\"name\"]}</div>\n    {/foreach}\n  {/if}\n  {if isset($event[\"location\"])}\n    {if $event[\"location\"][\"address\"] && $event[\"location\"][\"address\"][\"singleLine\"]}\n      <div><a href=\"{$event[\"location\"][\"address\"][\"googleMapUrl\"]}\" target=\"_blank\">{$event[\"location\"][\"name\"]}</a></div>\n    {elseif $event[\"location\"][\"url\"]}\n      <div><a href=\"{$event[\"location\"][\"url\"]}\" target=\"_blank\">{$event[\"location\"][\"name\"]}</a></div>\n    {else}\n      <div>{$event[\"location\"][\"name\"]}</div>\n    {/if}\n\n    {if isset($event[\"location\"][\"address\"]) && $event[\"location\"][\"address\"][\"singleLine\"]}\n      <div><a href=\"{$event[\"location\"][\"address\"][\"googleMapUrl\"]}\" target=\"_blank\">{$event[\"location\"][\"address\"][\"singleLine\"]}</a></div>\n    {/if}\n    {if $event[\"location\"][\"url\"]}\n      <div><a href=\"{$event[\"location\"][\"url\"]}\" target=\"_blank\">{$event[\"location\"][\"url\"]}</a></div>\n    {/if}\n  {/if}\n</small>\n<br>\n{/foreach}\n\n<a class=\"button\" href=\"{$scheduleUrl}\">Review Events</a>\r\n{if $contentBottom}<div class=\"content-bottom\">{$contentBottom}</div>{/if}",
                "fromEmail": null,
                "fromName": null,
                "toRecipients": [],
                "ccRecipients": [],
                "bccRecipients": [],
                "replyEmail": null,
                "styles": null,
                "customize": true
            },
            "smsMessage": {
                "id": 26,
                "messageTemplateId": null,
                "message": "Reminder of your {$organization[\"name\"]} {$office[\"name\"]} upcoming events:\n{$scheduleUrl}",
                "fromNumber": null,
                "customize": false
            },
            "defaultEmailSubject": "Reminder of {$eventCount} {\"Event\"|plural:$eventCount}",
            "defaultEmailBody": "{if $contentTop}<div class=\"content-top\">{$contentTop}</div>{/if}\r\n<h1>Reminder of {$eventCount} {\"Event\"|plural:$eventCount}</h1>\n\n<p>Here are your upcoming {$organization[\"name\"]} {$office[\"name\"]} events:</p>\n\n{foreach from=$events item=event}\n<div>{$event[\"date\"]}</div>\n<small>\n  {if isset($event[\"activities\"])}\n    {foreach $event[\"activities\"] as $activity}\n      <div>{$activity[\"activityGroup\"][\"name\"]}: {$activity[\"topic\"][\"name\"]}</div>\n    {/foreach}\n  {/if}\n  {if isset($event[\"location\"])}\n    {if $event[\"location\"][\"address\"] && $event[\"location\"][\"address\"][\"singleLine\"]}\n      <div><a href=\"{$event[\"location\"][\"address\"][\"googleMapUrl\"]}\" target=\"_blank\">{$event[\"location\"][\"name\"]}</a></div>\n    {elseif $event[\"location\"][\"url\"]}\n      <div><a href=\"{$event[\"location\"][\"url\"]}\" target=\"_blank\">{$event[\"location\"][\"name\"]}</a></div>\n    {else}\n      <div>{$event[\"location\"][\"name\"]}</div>\n    {/if}\n\n    {if isset($event[\"location\"][\"address\"]) && $event[\"location\"][\"address\"][\"singleLine\"]}\n      <div><a href=\"{$event[\"location\"][\"address\"][\"googleMapUrl\"]}\" target=\"_blank\">{$event[\"location\"][\"address\"][\"singleLine\"]}</a></div>\n    {/if}\n    {if $event[\"location\"][\"url\"]}\n      <div><a href=\"{$event[\"location\"][\"url\"]}\" target=\"_blank\">{$event[\"location\"][\"url\"]}</a></div>\n    {/if}\n  {/if}\n</small>\n<br>\n{/foreach}\n\n<a class=\"button\" href=\"{$scheduleUrl}\">Review Events</a>\r\n{if $contentBottom}<div class=\"content-bottom\">{$contentBottom}</div>{/if}",
            "defaultEmailFormat": "H",
            "defaultSmsMessage": "Reminder of your {$organization[\"name\"]} {$office[\"name\"]} upcoming events:\n{$scheduleUrl}"
          }
          ]
      });
    },
    loadMessage: (message) => {
      return config.loadMessages({})
        .pipe(
          map((data: any) => {
            return data.data.find((item) => {
              return item.id === message.id;
            });
          }),
        );
    },
    testMessage: (message, email, type) => {
      return of({})
    },
    saveMessage: (message) => {
      return of(message)
    },
    loadMessageTemplates: (query) => {
      return of({"paging":{"limit":25,"records":1,"offset":0},"data": [templateMessage] });
    },
    loadMessageTemplate: (messageTemplate) => {
      return of(messageTemplate);
    },
    saveMessageTemplate: (messageTemplate) => {
      return of(messageTemplate);
    },
    deleteMessageTemplate: (messageTemplate) => {
      return of(messageTemplate);
    },
    loadMessageAttachments: (message, query) => {
      return of({"paging":{"limit":25,"records":1,"offset":0},"data": [messageAttachment] });
    },
    saveMessageAttachment: (messageAttachment) => {
      return of(messageAttachment);
    },
    deleteMessageAttachment: (messageAttachment) => {
      return of(messageAttachment);
    },
    downloadMessageAttachment: (messageAttachment) => {
     
    },
    uploadMessageAttachment: (fsFile: FsFile) => {
      return of({ filename: fsFile.name, size: 321234 });
    },
    getTestEmail: () => {
      return of('email@email.com');
    },
    downloadMessageQueueAttachment: (messageQueueAttachment: any, messageQueue: any) => {
      return of(true);
    },
    deleteWebhook: (webhook) => {
      return of(webhook);
    },
    createWebhook: () => {
      return of(true);
    },
    loadWebhooks: () => {
      return of([
        { url: 'https://www.com/webhook', createDate: '2021-10-14T10:39:24+00:00' },
      ]);
    },
    bulkMessageQueues: (action: string, messageQueues: any[]) => {
      console.log('bulkMessageQueues', action, messageQueues);
      return of(true);
    }
  };

  return config;
}
