import { Notification, Groups, Event } from '../../index';
/**
 * @description This notification is used when a group has
 * been kicked from an event
 */
export declare class EventGroupKickNotification extends Notification {
  group: Groups;
  event: Event;
}
