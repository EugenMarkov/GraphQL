import Typography from "@mui/material/Typography";

/**
 * @desc function for create private content container
 * @returns {JSX.Element}
 */
const PrivateContent = () => {
  return (
    <section>
      <Typography variant="h3">Private content</Typography>
      <div>Content with pagination</div>
    </section>
  );
};

export default PrivateContent;
