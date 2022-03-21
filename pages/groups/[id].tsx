import ContentLayout from '../../layout/content';
import Header from '../../components/Header';
import { IGroup } from '../../components/icons';
import { useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';
import { useAxios } from '../../context/AxiosContext';
import useSWR from 'swr';
import { Groups } from '../../types';
import { useRouter } from 'next/router';
import { DetailsAbout, DetailsSection } from '../../components/Details';
import Banner from '../../components/Banner';
import Card from '../../components/Card';
import TagSmall from '../../components/TagSmall';
import { useGetProfil } from '../../api';

export default function GroupDetails() {
  const { data: profil } = useGetProfil();
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const router = useRouter();
  const { id } = router.query;
  const { authAxios } = useAxios();
  const { data: groupData } = useSWR<Groups>(`/groups/${id}`, (url) =>
    authAxios.get(url).then((res) => res.data),
  );

  function isProfilGroupAdmin(): boolean {
    return !!(
      profil &&
      groupData &&
      JSON.stringify(
        groupData?.members.filter(
          (musician) => musician.membership === 'admin',
        ),
      ).includes(profil.id)
    );
  }

  return (
    <ContentLayout
      Header={
        <Header
          title="Groupe"
          icon={<IGroup />}
          hamburgerOnClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      }
    >
      <>
        {groupData && (
          <>
            <Banner
              boldTitle={groupData.name}
              subtitle={`${groupData.members.length} membres · ${groupData.location}`}
              imagePath="/images/music_concert.png"
            />
            <DetailsAbout
              profil={groupData}
              isGroup
              canBeModified={isProfilGroupAdmin()}
            />
            <DetailsSection title="Membres">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {groupData.members.map((member) => (
                  <Card
                    key={member.musician.id}
                    title={`${member.musician.givenName} ${member.musician.familyName}`}
                    subtitle={`${member.musician.location} · ${member.musician.promotion}`}
                    description="Nous sommes un groupe qui fait les singes. Nous ne cherchons pas de musiciens mais des personnes sachant imiter les singes. ouhouhou."
                    genres={member.instruments.map(
                      (instrument) => instrument.name,
                    )}
                    href={`/profile/${member.musician.id}`}
                    tagSmall={
                      member.musician.isLookingForGroups ? (
                        <TagSmall
                          label="RG"
                          description="Ce joueur recherche un groupe"
                        />
                      ) : (
                        <></>
                      )
                    }
                  />
                ))}
              </div>
            </DetailsSection>
          </>
        )}
      </>
    </ContentLayout>
  );
}
