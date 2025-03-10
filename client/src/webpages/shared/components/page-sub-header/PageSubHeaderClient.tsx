import styles from './PageSubHeaderClient.module.css';

interface IPageHeaderClientProps {
  title: string;
}

export default function PageSubHeaderClient(props: IPageHeaderClientProps) {
  const { title } = props;
  return (
    <div className={styles['root-container']}>
      <h2>{title}</h2>
    </div>
  );
}
