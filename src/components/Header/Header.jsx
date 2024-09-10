import medicalLogo from '../../../public/medical-logo.png'
import './Header.module.css'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header>
      <img
        src={medicalLogo}
        className={`${styles.logo} ${styles.react}`}
        alt="Medical Directory Logo"
      />
      <h1 className={`${styles.title}`}>Palestinian Medical Directory</h1>
    </header>
  );
}
