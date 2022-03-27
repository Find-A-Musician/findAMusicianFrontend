import { Notification, Groups, Event } from '../../index';
/**
 * @description This notification is used when a group
 * has joined an event
 */
export declare class EventGroupJoin extends Notification {
  group: Groups;
  event: Event;
}
