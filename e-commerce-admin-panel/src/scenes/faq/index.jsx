import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I add new products to my store?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To add new products to your store, log in to your admin panel and
            navigate to the "Products" section. From there, you can click on the
            "Add Product" button and fill in the required details such as
            product name, description, price, and images. Once you've filled in
            all the necessary information, click on the "Save" button to add the
            product to your store.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I manage my orders?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Managing orders is easy with our admin panel. Simply go to the
            "Orders" section and you'll see a list of all the orders placed by
            your customers. From there, you can view order details, update order
            status, and even generate invoices. You can also search for specific
            orders using the search functionality provided.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Can I customize the look and feel of my store?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Absolutely! With our admin panel, you have full control over the
            design and layout of your store. You can customize the theme, upload
            your logo, change colors, and even modify the layout of individual
            pages. We provide a range of customization options to help you
            create a unique and professional-looking online store that reflects
            your brand identity.{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Is it possible to integrate third-party payment gateways?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, our e-commerce admin panel supports integration with various
            third-party payment gateways, including PayPal, Stripe, and
            Authorize.Net, among others. You can easily connect your preferred
            payment gateway to start accepting payments from customers securely.
            We provide detailed documentation and step-by-step guides to help
            you set up payment gateway integration quickly and easily.{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I get support if I encounter any issues?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We're here to help! If you encounter any issues or have any
            questions about using our admin panel, you can reach out to our
            dedicated support team. You can contact us via email, phone, or live
            chat, and our friendly support staff will be happy to assist you. We
            also provide comprehensive documentation and tutorials to help you
            troubleshoot common issues and make the most of our e-commerce
            platform.{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
