import Badge from "./Badge";

const IconBadge = ({
  Icon,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => {
  return (
    <Badge>
      <Icon className="size-6" />
    </Badge>
  );
};

export default IconBadge;
