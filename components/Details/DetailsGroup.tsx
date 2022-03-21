import DetailsSection from './DetailsSection';

type Props = {
  children: JSX.Element;
};

export function DetailsGroup({ children }: Props) {
  return (
    <DetailsSection title="Mes Groupes">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{children}</div>
    </DetailsSection>
  );
}

export default DetailsGroup;
