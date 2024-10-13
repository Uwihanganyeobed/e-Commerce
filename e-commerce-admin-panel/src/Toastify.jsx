import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function Toastify(prop) {
  const notify = () => {
    // toast("Default Notification !");

    toast.success("Success Notification !", {
      position: "top-right"
    });

    // toast.error("Error Notification !", {
    //   position: "top-left"
    // });

    // toast.warn("Warning Notification !", {
    //   position: "bottom-left"
    // });

    // toast.info("Info Notification !", {
    //   position: "bottom-center"
    // });

    // toast("Custom Style Notification with css class!", {
    //   position: "bottom-right",
    //   className: 'foo-bar'
    // });
  };

   return (
      <>
        <button onClick={notify}>Notify</button>;
        <ToastContainer />
      </>
    );
}
export default Toastify;