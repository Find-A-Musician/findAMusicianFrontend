import { Genre, Notification } from '../../index';
import { Location } from '../../Musician';
/**
 * @description This notification is used when a group
 * has been deleted
 */
export declare class GroupDeletedNotification extends Notification {
  name: string;
  description: string;
  location: Location;
  genres: Genre[];
}
