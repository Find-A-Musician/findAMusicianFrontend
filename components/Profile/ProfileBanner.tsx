import { useAuth } from '../../context/AuthContext';

type Props = {
  firstname: string;
  lastname: string;
  groups?: string[];
};

export default function ProfileBanner({ firstname, lastname, groups }: Props) {
  const { getProfil } = useAuth();
  const profil = getProfil();
  return (
    <div>
      <div
        className="w-full rounded-xl bg-gray-100 h-44"
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: '60% 40%',
          backgroundImage: `url("/images/tailor.png")`,
        }}
      ></div>
      <div className="flex items-center">
        <div className="w-52 h-52 border-2 border-white ml-10 -mt-20 rounded-full bg-red-100"></div>
        <div className="ml-6 -mt-10">
          <h2 className="text-2xl font-bold">
            {firstname} {lastname}
          </h2>
          {/* replace Les singes and columbine with /author/authorid/groups */}
          <span className="text-lg text-gray-500">Les singes, Columbine</span>
        </div>
      </div>
    </div>
  );
}
