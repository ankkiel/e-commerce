import Icon, { IconProps } from '../Icon/';

const CheckIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M4 11.6129L9.87755 18L20 7" stroke={props.color} strokeWidth="2" fill="none" />
    </Icon>
  );
};

export default CheckIcon;
