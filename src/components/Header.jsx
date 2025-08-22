import { useIsFetching } from '@tanstack/react-query';
import Notify from './UI/Notify';
import logo from '../assets/logo.png'
export default function Header({ children }) {
  const isFetching=useIsFetching();
  console.log(isFetching)
  return (
    <>
      <div id="main-header-loading">
        {isFetching > 0 && <Notify/>}
      </div>
      <header id="main-header">
        <div id="header-title">
          <img src={logo} />
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
