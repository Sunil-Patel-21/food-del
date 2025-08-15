import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "./ContactUs.css";

function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "c35fd544-5569-47ce-9338-7aee7f704ffe", // Your Web3Forms key
      subject: "New Message from Website Contact Form", // Helps avoid spam detection
      from_name: data.username, // Who sent the message
      reply_to: data.email, // Reply email
      message: data.message
    };

    try {
      const res = await axios.post("https://api.web3forms.com/submit", userInfo);

      if (res.data.success) {
        toast.success("Message sent successfully ✅");
        reset();
      } else {
        toast.error(res.data.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error("error in contact page: ", error);
      toast.error("Failed to send message ❌");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2 className="contact-header">Contact Us</h2>
        <div className="contact-flex">
          <div className="contact-form-section">
            <h3 className="contact-title">Send us a message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="contact-input"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="contact-error">This field is required</span>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="contact-input"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="contact-error">This field is required</span>
                )}
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  className="contact-textarea"
                  {...register("message", { required: true, minLength: 10 })}
                />
                {errors.message && (
                  <span className="contact-error">
                    Please write at least 10 characters
                  </span>
                )}
              </div>
              <div>
                <button type="submit" className="contact-button">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="contact-info-section">
            <h3 className="contact-title">Contact Information</h3>
            <ul className="contact-info-list">
              <li className="contact-info-item">
                <FaPhone className="icon" />
                <span>+91 1234567890</span>
              </li>
              <li className="contact-info-item">
                <FaEnvelope className="icon" />
                <span>sunil@gmail.com</span>
              </li>
              <li className="contact-info-item">
                <FaMapMarkerAlt className="icon" />
                <span>Surat, Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
