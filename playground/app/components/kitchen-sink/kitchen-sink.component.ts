import { Component } from '@angular/core';
import { KitchenSinkConfigureComponent } from '../kitchen-sink-configure';
import { FsExampleComponent } from '@firestitch/example';
import { FsMessage } from '@firestitch/message';
import { of } from 'rxjs';

@Component({
  selector: 'kitchen-sink',
  templateUrl: 'kitchen-sink.component.html',
  styleUrls: ['kitchen-sink.component.scss']
})
export class KitchenSinkComponent {

  public config = {};
  public templateMessage = {"id":1,"content":' <div class = "body"><div class="content"> {$content} </div></div> ',"styles": ".body { padding: 20px } .content { background: #efefef; padding: 25px; border-radius: 10px; }", "name":"Default Template"};

  constructor(private exampleComponent: FsExampleComponent,
              private message: FsMessage) {
    exampleComponent.setConfigureComponent(KitchenSinkConfigureComponent, { config: this.config });
  }

  public loadMessageQueues = (query) => {
    return of({
      "paging": { "limit": 25, "records": 157, "offset": 0 },
      "data": [
        { "message": { "email_message": { "subject": "Access to {$scope}", "from_email": null, "from_name": null, "reply_email": null, "id": 3, "message_template_id": 1, "format": "H", "body": "Hi {$invite_name},\n\n{$inviter_name} has created a new user account for you, with access to {$scope}.\n\nActivate your account by clicking the link below:\n\n{$invite_url}\n\nIf you don't want to accept this invitation or you think you were mistaken for someone else, please disregard this email.", "to_recipients": null, "cc_recipients": null, "bcc_recipients": null }, "sms_message": { "message": "", "id": 3, "message_template_id": null, "from_number": null }, "default_email_subject": "Access to {$scope}", "default_email_body": "Hi {$invite_name},\n\n{$inviter_name} has created a new user account for you, with access to {$scope}.\n\nActivate your account by clicking the link below:\n\n{$invite_url}\n\nIf you don't want to accept this invitation or you think you were mistaken for someone else, please disregard this email.", "default_email_format": "T", "id": 3, "state": "A", "guid": "35b43a98d75338a5755c08f8505e8843", "name": "Account Activation Request", "description": "", "tag": "ACTIVATION_REQUEST" }, "email_message_queue": { "id": 157, "state": "S", "message_id": 3, "attempts": 0, "scheduled_date": "2020-02-01T12:08:28+00:00", "created_date": "2020-02-01T12:08:28+00:00", "sent_date": "", "type": "E", "data": {}, "body": "asdasdasdasdfsdsadfasdfasda", "format": "T", "subject": "Access to Workspace Access to Workspace Access to Workspace Access to Workspace Access to Workspace Access to Workspace Access to Workspace", "to_recipients": ["ray@firestitch.com"], "cc_recipients": ["cc@email.com", "cc1@email.com"], "bcc_recipients": ["bcc@email.com"], "from_email": "", "from_name": "", "reply_email": {} }, "sms_message_queue": null, "message_queue_attachment_count": 0, "id": 157, "state": "S", "message_id": 3, "attempts": 0, "scheduled_date": "2020-02-01T12:08:28+00:00", "created_date": "2020-02-01T12:08:28+00:00", "sent_date": "", "type": "E", "data": {} },

        { "message": { "email_message": { "subject": "Invoice: {$invoice_identifier}", "from_email": null, "from_name": null, "reply_email": null, "id": 14, "message_template_id": null, "format": "T", "body": "Please find attached invoice {$invoice_identifier}", "to_recipients": null, "cc_recipients": null, "bcc_recipients": null }, "sms_message": { "message": "", "id": 14, "message_template_id": null, "from_number": null }, "default_email_subject": "Invoice: {$invoice_identifier}", "default_email_body": "Please find attached invoice {$invoice_identifier}", "default_email_format": "T", "id": 14, "state": "A", "guid": "6bb5dabae5211e99a2089e40d3738d29", "name": "Send Invoice", "description": "", "tag": "INVOICE_SEND" }, "email_message_queue": { "id": 156, "state": "S", "message_id": 14, "attempts": 2, "scheduled_date": "2020-01-31T15:26:45+00:00", "created_date": "2020-01-31T15:26:45+00:00", "sent_date": "", "type": "E", "data": {}, "body": "Please find attached invoice ON-N88.76", "format": "T", "subject": "Invoice: ON-N88.76", "to_recipients": ["ray+222223@fisadasdasdasdasdfasdfasdfrestitch.com"], "cc_recipients": [], "bcc_recipients": [], "from_email": "", "from_name": "", "reply_email": {} }, "sms_message_queue": null, "message_queue_attachment_count": 1, "id": 156, "state": "S", "message_id": 14, "attempts": 2, "scheduled_date": "2020-01-31T15:26:45+00:00", "created_date": "2020-01-31T15:26:45+00:00", "sent_date": "", "type": "E", "data": {} },

        { "message": { "email_message": { "subject": "Invoice: {$invoice_identifier}", "from_email": null, "from_name": null, "reply_email": null, "id": 14, "message_template_id": null, "format": "T", "body": "Please find attached invoice {$invoice_identifier}", "to_recipients": null, "cc_recipients": null, "bcc_recipients": null }, "sms_message": { "message": "", "id": 14, "message_template_id": null, "from_number": null }, "default_email_subject": "Invoice: {$invoice_identifier}", "default_email_body": "Please find attached invoice {$invoice_identifier}", "default_email_format": "T", "id": 14, "state": "A", "guid": "6bb5dabae5211e99a2089e40d3738d29", "name": "Send Invoice", "description": "", "tag": "INVOICE_SEND" }, "email_message_queue": { "id": 155, "state": "S", "message_id": 14, "attempts": 1, "scheduled_date": "2020-01-31T15:14:29+00:00", "created_date": "2020-01-31T15:14:29+00:00", "sent_date": "", "type": "E", "data": {}, "body": "Please find attached invoice ON-N88.75!\nhttp://www.google.com", "format": "T", "subject": "Invoice: ON-N88.75", "to_recipients": ["dsasd@asdkugh3214isdhf9324.com"], "cc_recipients": [], "bcc_recipients": [], "from_email": "", "from_name": "", "reply_email": {} }, "sms_message_queue": null, "message_queue_attachment_count": 1, "id": 155, "state": "S", "message_id": 14, "attempts": 1, "scheduled_date": "2020-01-31T15:14:29+00:00", "created_date": "2020-01-31T15:14:29+00:00", "sent_date": "", "type": "E", "data": {} },]
    });
  }

  public loadMessageQueue = (messageQueueId) => {
    let html: any = "<!DOCTYPE html PUBLIC \"-\/\/W3C\/\/DTD HTML 4.0 Transitional\/\/EN\" \"http:\/\/www.w3.org\/TR\/REC-html40\/loose.dtd\">\n<html>\n  <body>\n    <div class=\"body\" style=\"background: #0061AF; padding: 20px; font-family: Helvetica, Arial, Sans; border-radius: 3px; font-size: 14px; color: #333;\">\n  <img src=\"https:\/\/hhsi.s3.ca-central-1.amazonaws.com\/pub\/message\/logo.png\" class=\"logo\" style=\"width: 230px; margin: auto; margin-bottom: 20px; display: block;\"><\/img><div class=\"content\" style=\"background: #ffffff; border-radius: 3px; padding: 10px;\">\n    \t<h1>2 Pending Approvals For You<\/h1>\n\n\t\t\t<div>\n\t\t\t<span class=\"area\" style=\"font-weight: bold; color: #5a5a5a;\">\n\t\t\t\tON-200\t\t\t<\/span>\n\t\t\t\t\t\t\t\t\t\t<a href=\"https:\/\/app.hallmarkhousekeeping.com\/workorders\/137\" style=\"color: #0061AF; text-decoration: none;\">\n\t\t\t\t\t<span class=\"identifier\">R5-CB<\/span>:\n\t\t\t\t\tWork Order\n\t\t\t\t<\/a>\n\t\t\t\n\t\t<\/div>\n\t\t\t<div>\n\t\t\t<span class=\"area\" style=\"font-weight: bold; color: #5a5a5a;\">\n\t\t\t\tON-200\t\t\t<\/span>\n\t\t\t\t\t\t\t\t\t\t<a href=\"https:\/\/app.hallmarkhousekeeping.com\/workorders\/143\" style=\"color: #0061AF; text-decoration: none;\">\n\t\t\t\t\t<span class=\"identifier\">R6-CB<\/span>:\n\t\t\t\t\tWork Order\n\t\t\t\t<\/a>\n\t\t\t\n\t\t<\/div>\n\t<h1>2 Pending Approvals<\/h1>\n<div class=\"tiles\" style=\"display: flex; flex-direction: row;\">\n\t\t\t<div class=\"tile\" style=\"border-radius: 4px; padding: 8px; min-width: 100px; margin-right: 5px; background: #f4f4f4; margin: 0;\">\n\t\t\t<div class=\"label\" style=\"color: #9a9a9a; font-size: 12px;\">Ops Approval<\/div>\n\t\t\t<div class=\"content\" style=\"font-size: 20px; padding-top: 5px; background: none; border-radius: 3px; padding: 10px;\">2<\/div>\n\t\t<\/div>\n\t<\/div>\n\n\t<h2>\n\t\t2 Pending Ops Approval\t<\/h2>\n\n\t\t\t<div>\n\t\t\t<span class=\"area\" style=\"font-weight: bold; color: #5a5a5a;\">\n\t\t\t\tON-200\t\t\t<\/span>\n\t\t\t\t\t\t\t\t\t\t<a href=\"https:\/\/app.hallmarkhousekeeping.com\/workorders\/137\" style=\"color: #0061AF; text-decoration: none;\">\n\t\t\t\t\t<span class=\"identifier\">R5-CB<\/span>:\n\t\t\t\t\tWork Order\n\t\t\t\t<\/a>\n\t\t\t\n\t\t<\/div>\n\t\t\t<div>\n\t\t\t<span class=\"area\" style=\"font-weight: bold; color: #5a5a5a;\">\n\t\t\t\tON-200\t\t\t<\/span>\n\t\t\t\t\t\t\t\t\t\t<a href=\"https:\/\/app.hallmarkhousekeeping.com\/workorders\/143\" style=\"color: #0061AF; text-decoration: none;\">\n\t\t\t\t\t<span class=\"identifier\">R6-CB<\/span>:\n\t\t\t\t\tWork Order\n\t\t\t\t<\/a>\n\t\t\t\n\t\t<\/div>\n\t\n  <\/div>\n<\/div>\n  <\/body>\n<\/html>\n";

    return of({"message":{"email_message":{"subject":"Invoice: {$invoice_identifier}","reply_email":null,"id":14,"message_template_id":null,"format":"R","body":"Please find attached invoice {$invoice_identifier}","to_recipients":null,"cc_recipients":null,"bcc_recipients":null},"sms_message":{"message":"","id":14,"message_template_id":null,"from_number":null},"default_email_subject":"Invoice: {$invoice_identifier}","default_email_body":"Please find attached invoice {$invoice_identifier}","default_email_format":"T","id":14,"state":"A","guid":"6bb5dabae5211e99a2089e40d3738d29","name":"Send Invoice","description":"","tag":"INVOICE_SEND"},"email_message_queue":{"id":155,"state":"S","message_id":14,"attempts":1,"scheduled_date":"2020-01-31T15:14:29+00:00","created_date":"2020-01-31T15:14:29+00:00","sent_date":"","type":"E","data":{},"body": html,"format":"H","subject":"Invoice: ON-N88.75","to_recipients":["to@email.com"],"cc_recipients":["cc@email.com","cc2@email.com"],"bcc_recipients":["bcc@email.com"],"from_email":"bob@email.com","from_name":"Bob Smith","reply_email":['bob@reply.com']},"sms_message_queue":null,"id":155,"state":"S","message_id":14,"attempts":1,"scheduled_date":"2020-01-31T15:14:29+00:00","created_date":"2020-01-31T15:14:29+00:00","sent_date":"","type":"E","data":{}})
  }

  public loadLogs = (messageQueue, query) => {
    return of({"paging":{"limit":25,"records":8,"offset":0},"data":[{"id":211,"created_date":"2020-01-31T15:56:45+00:00","message":"ray+2@firestitch.com","message_queue_id":154},{"id":214,"created_date":"2020-01-31T16:00:04+00:00","message":"ray+2@firestitch.com","message_queue_id":154},{"id":219,"created_date":"2020-01-31T16:00:19+00:00","message":"ray+2@firestitch.com","message_queue_id":154},{"id":224,"created_date":"2020-01-31T16:00:26+00:00","message":"ray+2@firestitch.com","message_queue_id":154},{"id":228,"created_date":"2020-01-31T16:18:54+00:00","message":"ray+2@firestitch.com","message_queue_id":154},{"id":232,"created_date":"2020-01-31T16:20:45+00:00","message":"ray+2@firestitch.com","message_queue_id":154},{"id":238,"created_date":"2020-01-31T16:24:10+00:00","message":"Sent to ray+2@firestitch.com","message_queue_id":154},{"id":244,"created_date":"2020-02-01T11:01:22+00:00","message":"Sent to ray+2@firestitch.com","message_queue_id":154}]});
  }

  public loadAttachments = (messageQueue, query) => {
    return of({"paging":{"limit":25,"records":1,"offset":0},"data":[{"id":89,"state":"A","filesize":67214,"filename":"ON-N88.74.pdf","guid":"e40478efad2ad820ecc17080ddb37036154","type":"A","message_queue_id":154}]});
  }

  public resendMessageQueue = (messageQueue) => {
    return of(messageQueue);
  }

  public forwardMessageQueue = (messageQueue, email) => {
    return of(messageQueue);
  }


  public cancelMessageQueues = (action) => {
    this.message.success(`Cancelled ${action.selected.length} messages`);
    return of(false);
  }

  public loadMessages = () => {
    return of({
      "paging": { "limit": 25, "records": 12, "offset": 0 }, "data": [
        { "email_message": { "subject": "Access to {$scope}", "from_email": null, "from_name": null, "reply_email": null, "id": 3, "message_template_id": 1, "format": "T", "body": "Hi {$invite_name},\n\n{$inviter_name} has created a new user account for you, with access to {$scope}.\n\nActivate your account by clicking the link below:\n\n{$invite_url}\n\nIf you don't want to accept this invitation or you think you were mistaken for someone else, please disregard this email.", "to_recipients": null, "cc_recipients": null, "bcc_recipients": null }, "sms_message": { "message": "", "id": 3, "message_template_id": null, "from_number": null }, "default_email_subject": "Access to {$scope}", "default_email_body": "Hi {$invite_name},\n\n{$inviter_name} has created a new user account for you, with access to {$scope}.\n\nActivate your account by clicking the link below:\n\n{$invite_url}\n\nIf you don't want to accept this invitation or you think you were mistaken for someone else, please disregard this email.", "default_email_format": "T", "id": 3, "state": "A", "guid": "35b43a98d75338a5755c08f8505e8843", "name": "Account Activation Request", "description": "", "tag": "ACTIVATION_REQUEST" },

        { "email_message": { "subject": "Hallmark Housekeeping {$work_order_identifier}: Sent to Accounting", "from_email": null, "from_name": null, "reply_email": null, "id": 9, "message_template_id": null, "format": "T", "body": "The work order {$work_order_identifier} has been sent to accounting.", "to_recipients": null, "cc_recipients": null, "bcc_recipients": null }, "sms_message": { "message": "", "id": 9, "message_template_id": null, "from_number": null }, "default_email_subject": "Hallmark Housekeeping {$work_order_identifier}: Sent to Accounting", "default_email_body": "The work order {$work_order_identifier} has been sent to accounting.", "default_email_format": "T", "id": 9, "state": "A", "guid": "af85c88d4053d105f1ba6a5f4f6bd481", "name": "Account Contact Sent To Accounting Notify", "description": "", "tag": "ACCOUNT_CONTACT_ACCOUNTING_NOTIFY" },

        { "email_message": { "subject": "Invitation to Join {$scope}", "from_email": null, "from_name": null, "reply_email": null, "id": 2, "message_template_id": null, "format": "T", "body": "Hi {$invite_name}\n\n{$inviter_name} has invited you to join {$scope}.\n\nAccept this invitation by clicking the link below:\n{$invite_url}\n\nIf you don't want to accept this invitation or you think you were mistaken for someone else, please disregard this email.", "to_recipients": null, "cc_recipients": null, "bcc_recipients": null }, "sms_message": { "message": "", "id": 2, "message_template_id": null, "from_number": null }, "default_email_subject": "Invitation to Join {$scope}", "default_email_body": "Hi {$invite_name}\n\n{$inviter_name} has invited you to join {$scope}.\n\nAccept this invitation by clicking the link below:\n{$invite_url}\n\nIf you don't want to accept this invitation or you think you were mistaken for someone else, please disregard this email.", "default_email_format": "T", "id": 2, "state": "A", "guid": "14b658cdfd94897dfcc666e077efe421", "name": "Account Invite Request", "description": "", "tag": "INVITE_REQUEST" },
        ]
    });
  }

  public loadMessage = (message) => {
    return of({"email_message":{"subject":"Access to {$scope}","from_email":null,"from_name":null,"reply_email":null,"id":3,"message_template_id":1,"format":"T","body":"Hi {$invite_name},\n\n{$inviter_name} has created a new user account for you, with access to {$scope}.\n\nActivate your account by clicking the link below:\n\n{$invite_url}\n\nIf you don't want to accept this invitation or you think you were mistaken for someone else, please disregard this email.","to_recipients":null,"cc_recipients":null,"bcc_recipients":null},"sms_message":{"message":"","id":3,"message_template_id":null,"from_number":null},"default_email_subject":"Access to {$scope}","default_email_body":"Hi {$invite_name},\n\n{$inviter_name} has created a new user account for you, with access to {$scope}.\n\nActivate your account by clicking the link below:\n\n{$invite_url}\n\nIf you don't want to accept this invitation or you think you were mistaken for someone else, please disregard this email.","default_email_format":"T","id":3,"state":"A","guid":"35b43a98d75338a5755c08f8505e8843","name":"Account Activation Request","description":"","tag":"ACTIVATION_REQUEST"});
  }

  public testMessage = (message, email, type) => {
    return of({})
  }

  public saveMessage = (message) => {
    return of(message)
  }

  public loadTemplateSelect = () => {
    return of([this.templateMessage]);
  }

  public loadTemplates = () => {
    return of({"paging":{"limit":0,"records":1,"page":1,"pages":0},"data":[{"id":1,"content":'<div class="body">{$content}</div>',"styles": ".body { padding: 40px }", "name":"Default Template"}]});
  }

  public loadMessageTemplates = (query) => {
    return of({"paging":{"limit":25,"records":1,"offset":0},"data":[this.templateMessage]});
  }

  public loadMessageTemplate = (messageTemplate) => {
    return of(messageTemplate);
  }

  public saveMessageTemplate = (messageTemplate) => {
    return of(messageTemplate);
  }

  public deleteMessageTemplate = (messageTemplate) => {
    return of(messageTemplate);
  }

  public testEmail = () => {
    return 'email@email.com';
  }

  public downloadAttachment(messageQueueAttachment, messageQueue) {
    debugger;
  }
}
