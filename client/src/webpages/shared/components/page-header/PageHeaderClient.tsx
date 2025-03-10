import styles from './PageHeaderClient.module.css';

interface IPageHeaderClientProps {
  title: string;
  hasDivider: boolean;
}

export default function PageHeaderClient(props: IPageHeaderClientProps) {
  const { title, hasDivider } = props;
  return (
    <div className={styles['root-container']}>
      <h1>{title}</h1>
      {hasDivider && <hr />}
    </div>
  );
}
