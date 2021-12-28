import { useEffect } from "react";

/**
 * @desc function for create scroll to top
 * @returns {JSX.Element}
 */
const ScrollToTop = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return null;
};

export default ScrollToTop;
