import { useAppContext } from '../../context/AppContext';
import { FaUsers, FaLightbulb, FaBullseye, FaHandshake, FaChartLine, FaUniversalAccess } from 'react-icons/fa';

const About = () => {
  const { language, translations } = useAppContext();

  if (!translations) return null;

  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {t.aboutUs || (language === 'english' ? 'About Us' : 'हमारे बारे में')}
        </h1>
        <p className="text-gray-600">
          {t.aboutDescription || (language === 'english'
            ? 'The Government Scheme Eligibility Assistant is an initiative by the Government of India to help citizens discover welfare schemes they are eligible for.'
            : 'सरकारी योजना पात्रता सहायक भारत सरकार की एक पहल है जो नागरिकों को उन कल्याणकारी योजनाओं की खोज में मदद करती है जिनके लिए वे पात्र हैं।')}
        </p>
      </div>

      {/* Mission and Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="bg-[#13518e] p-3 rounded-full text-white mr-4">
              <FaLightbulb size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {t.aboutMission || (language === 'english' ? 'Our Mission' : 'हमारा मिशन')}
            </h2>
          </div>
          <p className="text-gray-600">
            {t.aboutMissionText || (language === 'english'
              ? 'To simplify access to government welfare schemes and ensure that every eligible citizen can benefit from them.'
              : 'सरकारी कल्याणकारी योजनाओं तक पहुंच को सरल बनाना और यह सुनिश्चित करना कि हर पात्र नागरिक उनसे लाभ उठा सके।')}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="bg-[#13518e] p-3 rounded-full text-white mr-4">
              <FaChartLine size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {t.aboutVision || (language === 'english' ? 'Our Vision' : 'हमारा विजन')}
            </h2>
          </div>
          <p className="text-gray-600">
            {t.aboutVisionText || (language === 'english'
              ? 'A future where every Indian citizen is aware of and can easily access the welfare schemes designed for their benefit.'
              : 'एक ऐसा भविष्य जहां हर भारतीय नागरिक अपने लाभ के लिए डिज़ाइन की गई कल्याणकारी योजनाओं के बारे में जागरूक हो और उन तक आसानी से पहुंच सके।')}
          </p>
        </div>
      </div>

      {/* Objectives */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {t.aboutObjectives || (language === 'english' ? 'Our Objectives' : 'हमारे उद्देश्य')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start">
              <div className="bg-[#13518e] p-2 rounded-full text-white mr-3">
                <FaUsers size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">
                  {language === 'english' ? 'Increase Awareness' : 'जागरूकता बढ़ाना'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'english' 
                    ? 'Educate citizens about the various welfare schemes available to them.' 
                    : 'नागरिकों को उनके लिए उपलब्ध विभिन्न कल्याणकारी योजनाओं के बारे में शिक्षित करना।'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start">
              <div className="bg-[#13518e] p-2 rounded-full text-white mr-3">
                <FaUniversalAccess size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">
                  {language === 'english' ? 'Improve Accessibility' : 'पहुंच में सुधार करना'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'english' 
                    ? 'Make information about schemes accessible to all citizens regardless of location or language.' 
                    : 'स्थान या भाषा की परवाह किए बिना सभी नागरिकों के लिए योजनाओं के बारे में जानकारी सुलभ बनाना।'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start">
              <div className="bg-[#13518e] p-2 rounded-full text-white mr-3">
                <FaHandshake size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">
                  {language === 'english' ? 'Facilitate Enrollment' : 'नामांकन की सुविधा'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'english' 
                    ? 'Guide citizens through the application process for schemes they are eligible for.' 
                    : 'नागरिकों को उन योजनाओं के लिए आवेदन प्रक्रिया के माध्यम से मार्गदर्शन करना जिनके लिए वे पात्र हैं।'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start">
              <div className="bg-[#13518e] p-2 rounded-full text-white mr-3">
                <FaBullseye size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">
                  {language === 'english' ? 'Ensure Transparency' : 'पारदर्शिता सुनिश्चित करना'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'english' 
                    ? 'Provide clear and accurate information about eligibility criteria and benefits.' 
                    : 'पात्रता मानदंड और लाभों के बारे में स्पष्ट और सटीक जानकारी प्रदान करना।'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Government Initiatives */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {language === 'english' ? 'Government Initiatives' : 'सरकारी पहल'}
        </h2>
        <p className="text-gray-600 mb-4">
          {language === 'english' 
            ? 'This platform is part of the Digital India initiative, aimed at empowering citizens through technology and making governance more accessible.' 
            : 'यह प्लेटफॉर्म डिजिटल इंडिया पहल का हिस्सा है, जिसका उद्देश्य प्रौद्योगिकी के माध्यम से नागरिकों को सशक्त बनाना और शासन को अधिक सुलभ बनाना है।'}
        </p>
        <p className="text-gray-600">
          {language === 'english' 
            ? 'We are committed to continuously improving this platform based on user feedback and evolving needs of the citizens.' 
            : 'हम उपयोगकर्ता प्रतिक्रिया और नागरिकों की विकसित होती जरूरतों के आधार पर इस प्लेटफॉर्म को निरंतर सुधारने के लिए प्रतिबद्ध हैं।'}
        </p>
      </div>
    </div>
  );
};

export default About;