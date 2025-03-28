import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import ContactMap from "../components/contact/ContactMap";

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Contact Us</h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Have questions, feedback, or need assistance? We're here to help! Fill
          out the form below or use our contact information to get in touch with
          our team.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <ContactForm />
        </div>

        <div>
          <ContactInfo />
        </div>
      </div>

      <ContactMap />
    </div>
  );
};

export default ContactPage;
