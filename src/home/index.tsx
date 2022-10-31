import { Logo, LogoType } from "../components/logo";

import "./styles.module.css";

export const Home = () => {
  return (
    <main>
      <Logo variant={LogoType.Icon} />
    </main>
  );
}