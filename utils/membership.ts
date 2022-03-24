import { Groups, Musician } from '../types';
import { Membership } from '../types/MusicianGroup';

export function getMembership(
  musician?: Musician,
  group?: Groups,
): Membership | '' | undefined {
  if (!musician || !group) return '';
  //If musician is not in the group return empty string
  if (!JSON.stringify(group.members).includes(musician.id)) return '';
  return group.members.find((member) => member.musician.id === musician.id)
    ?.membership;
}

export default getMembership;
