import { Groups } from './Groups';
import { Instrument } from './Instrument';
import { Musician } from './Musician';
/**
 * - **lite_admin** : Can modify the group and kick members
 * - **admin** : lite_admin rights && can delete the group
 */
export declare type Membership =
  | 'pending'
  | 'member'
  | 'admin'
  | 'lite_admin'
  | 'declined';
export declare class MusicianGroup {
  musician: Musician;
  group: Groups;
  membership: Membership;
  instruments: Instrument[];
}
