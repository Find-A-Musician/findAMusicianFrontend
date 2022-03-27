import { Notification, Groups } from '../../index';
import { Membership } from '../../MusicianGroup';
/**
 * @description This notification is used when a member of a group
 * has a new membership
 */
export declare class MembershipNotification extends Notification {
  group: Groups;
  membership: Membership;
}
