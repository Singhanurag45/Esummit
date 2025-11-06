import { useAppContext } from '../../context/AppContext';
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const { language, translations } = useAppContext();

  if (!translations) return null;

  const t = translations[language];

  return (
    <footer className="bg-[#13518e] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.contactUs || (language === 'english' ? 'Contact Us' : 'संपर्क करें')}</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <FaPhone className="mr-2" />
                <span>{language === 'english' ? 'Toll-Free: 1800-11-1111' : 'टोल-फ्री: 1800-11-1111'}</span>
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span>help@schemes.gov.in</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.quickLinks || (language === 'english' ? 'Quick Links' : 'त्वरित लिंक')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-yellow-300">
                  {t.termsOfUse || (language === 'english' ? 'Terms of Use' : 'उपयोग की शर्तें')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  {t.privacyPolicy || (language === 'english' ? 'Privacy Policy' : 'गोपनीयता नीति')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  {t.disclaimer || (language === 'english' ? 'Disclaimer' : 'अस्वीकरण')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  {t.sitemap || (language === 'english' ? 'Sitemap' : 'साइटमैप')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.followUs || (language === 'english' ? 'Follow Us' : 'हमें फॉलो करें')}</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-300" aria-label={language === 'english' ? 'Facebook' : 'फेसबुक'}>
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-yellow-300" aria-label={language === 'english' ? 'Twitter' : 'ट्विटर'}>
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-yellow-300" aria-label={language === 'english' ? 'YouTube' : 'यूट्यूब'}>
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-blue-700 text-center">
          <p>
            © {new Date().getFullYear()} {t.copyright || (language === 'english' ? 'Government of India. All Rights Reserved.' : 'भारत सरकार। सर्वाधिकार सुरक्षित।')}
          </p>
          <p className="text-sm mt-2">
            {t.lastUpdated || (language === 'english' ? 'Last Updated' : 'अंतिम अपडेट')}: {new Date().toLocaleDateString(language === 'english' ? 'en-IN' : 'hi-IN')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;