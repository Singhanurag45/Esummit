import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const { language, translations } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!translations) return null;

  const t = translations[language];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = language === 'english' ? 'Name is required' : 'नाम आवश्यक है';
    }

    if (!formData.email.trim()) {
      errors.email = language === 'english' ? 'Email is required' : 'ईमेल आवश्यक है';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = language === 'english' ? 'Invalid email address' : 'अमान्य ईमेल पता';
    }

    if (!formData.subject.trim()) {
      errors.subject = language === 'english' ? 'Subject is required' : 'विषय आवश्यक है';
    }

    if (!formData.message.trim()) {
      errors.message = language === 'english' ? 'Message is required' : 'संदेश आवश्यक है';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {t.contactTitle || (language === 'english' ? 'Contact Us' : 'संपर्क करें')}
        </h1>
        <p className="text-gray-600">
          {t.contactDescription || (language === 'english' ? 'Have questions or feedback? Reach out to us through any of the channels below.' : 'प्रश्न या प्रतिक्रिया है? नीचे दिए गए किसी भी माध्यम से हमसे संपर्क करें।')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {language === 'english' ? 'Contact Information' : 'संपर्क जानकारी'}
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-[#13518e] p-2 rounded-full text-white">
                    <FaMapMarkerAlt />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-800">{t.address || (language === 'english' ? 'Address' : 'पता')}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {language === 'english' ? (
                      <>
                        Ministry of Electronics & IT<br />
                        Electronics Niketan, 6, CGO Complex<br />
                        New Delhi - 110003
                      </>
                    ) : (
                      <>
                        इलेक्ट्रॉनिक्स और आईटी मंत्रालय<br />
                        इलेक्ट्रॉनिक्स निकेतन, 6, सीजीओ कॉम्प्लेक्स<br />
                        नई दिल्ली - 110003
                      </>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-[#13518e] p-2 rounded-full text-white">
                    <FaPhone />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-800">{t.phoneNumber || (language === 'english' ? 'Phone Number' : 'फोन नंबर')}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {language === 'english' ? (
                      <>
                        Toll-Free: 1800-11-1111<br />
                        Helpdesk: +91-11-2436-3101
                      </>
                    ) : (
                      <>
                        टोल-फ्री: 1800-11-1111<br />
                        हेल्पडेस्क: +91-11-2436-3101
                      </>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-[#13518e] p-2 rounded-full text-white">
                    <FaEnvelope />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-800">{t.emailAddress || (language === 'english' ? 'Email Address' : 'ईमेल पता')}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    help@schemes.gov.in<br />
                    support@digitalindia.gov.in
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 font-medium">
                {language === 'english'
                  ? 'Office Hours: Monday to Friday, 9:00 AM to 5:30 PM'
                  : 'कार्यालय समय: सोमवार से शुक्रवार, सुबह 9:00 बजे से शाम 5:30 बजे तक'}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {t.sendMessage || (language === 'english' ? 'Send Message' : 'संदेश भेजें')}
            </h2>
            
            {submitSuccess && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      {language === 'english' 
                        ? 'Your message has been sent successfully. We will get back to you soon.' 
                        : 'आपका संदेश सफलतापूर्वक भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।'}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t.yourName || (language === 'english' ? 'Your Name' : 'आपका नाम')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t.yourEmail || (language === 'english' ? 'Your Email' : 'आपका ईमेल')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  {t.subject || (language === 'english' ? 'Subject' : 'विषय')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`mt-1 block w-full border ${
                    formErrors.subject ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {formErrors.subject && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.subject}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {t.message || (language === 'english' ? 'Message' : 'संदेश')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`mt-1 block w-full border ${
                    formErrors.message ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                ></textarea>
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                )}
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#13518e] hover:bg-[#0e3b66] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>{language === 'english' ? 'Sending...' : 'भेज रहा है...'}</span>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      <span>{t.submit || (language === 'english' ? 'Submit' : 'सबमिट करें')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map */}
      {/* <div className="mt-12">
        <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
          <p className="text-gray-500">
            <span className="font-medium">
              {language === 'english'
                ? 'Google Maps integration will be available here'
                : 'गूगल मैप्स एकीकरण यहां उपलब्ध होगा'}
            </span>
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Contact;