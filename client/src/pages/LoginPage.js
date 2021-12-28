import LoginForm from "../components/forms/LoginForm";
import ScrollToTop from "../components/common/ScrollToTop";

/**
 * @desc Auth sign in UI
 * @return {JSX.Element}
 */
const LoginPage = () => (
  <>
    <ScrollToTop />
    <LoginForm />
  </>
);

export default LoginPage;
