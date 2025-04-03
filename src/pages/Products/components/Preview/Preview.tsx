import Text from '@/components/Text';
import style from './Preview.module.scss';

const Preview = () => {
  return (
    <section className={style.preview}>
      <div className={style.preview__wrapper}>
        <Text view="title">Products</Text>
        <Text color="secondary" view="p-20">
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </Text>
      </div>
    </section>
  );
};

export default Preview;
