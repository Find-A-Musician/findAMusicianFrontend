import { Genre, Notification } from '../../index';
/**
 * @description This notification is used when an event
 * has been deleted
 */
export declare class EventDeletedNotification extends Notification {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  adress: string;
  genres: Genre[];
}
