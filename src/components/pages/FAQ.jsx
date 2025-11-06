import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

const FAQ = () => {
  const { language, translations } = useAppContext();
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!translations) return null;

  const t = translations[language];

  // FAQ data
  const faqs = [
    {
      question: {
        english: 'What is the Government Scheme Eligibility Assistant?',
        hindi: 'सरकारी योजना पात्रता सहायक क्या है?'
      },
      answer: {
        english: 'The Government Scheme Eligibility Assistant is a digital platform that helps citizens discover welfare schemes they are eligible for based on their personal details such as age, income, occupation, caste, gender, and location.',
        hindi: 'सरकारी योजना पात्रता सहायक एक डिजिटल प्लेटफॉर्म है जो नागरिकों को उनके व्यक्तिगत विवरण जैसे आयु, आय, व्यवसाय, जाति, लिंग और स्थान के आधार पर उन कल्याणकारी योजनाओं की खोज में मदद करता है जिनके लिए वे पात्र हैं।'
      }
    },
    {
      question: {
        english: 'How does the eligibility check work?',
        hindi: 'पात्रता जांच कैसे काम करती है?'
      },
      answer: {
        english: 'The system compares your provided information with the eligibility criteria of various government schemes. It then displays a list of schemes for which you are likely eligible based on the information you provided.',
        hindi: 'सिस्टम आपके द्वारा प्रदान की गई जानकारी की तुलना विभिन्न सरकारी योजनाओं के पात्रता मानदंडों से करता है। फिर यह आपके द्वारा प्रदान की गई जानकारी के आधार पर उन योजनाओं की एक सूची प्रदर्शित करता है जिनके लिए आप संभावित रूप से पात्र हैं।'
      }
    },
    {
      question: {
        english: 'Is my data secure when I use this platform?',
        hindi: 'क्या इस प्लेटफॉर्म का उपयोग करते समय मेरा डेटा सुरक्षित है?'
      },
      answer: {
        english: 'Yes, we take data privacy very seriously. Your personal information is only used to check eligibility and is not stored on our servers. We do not share your data with any third parties without your explicit consent.',
        hindi: 'हां, हम डेटा गोपनीयता को बहुत गंभीरता से लेते हैं। आपकी व्यक्तिगत जानकारी का उपयोग केवल पात्रता की जांच के लिए किया जाता है और इसे हमारे सर्वर पर संग्रहीत नहीं किया जाता है। हम आपकी स्पष्ट सहमति के बिना आपका डेटा किसी भी तीसरे पक्ष के साथ साझा नहीं करते हैं।'
      }
    },
    {
      question: {
        english: 'How accurate are the eligibility results?',
        hindi: 'पात्रता परिणाम कितने सटीक हैं?'
      },
      answer: {
        english: 'While we strive to provide accurate results, the final eligibility determination is made by the respective government departments. We recommend visiting the official website of each scheme or contacting the relevant department for the most up-to-date and accurate information.',
        hindi: 'हालांकि हम सटीक परिणाम प्रदान करने का प्रयास करते हैं, अंतिम पात्रता निर्धारण संबंधित सरकारी विभागों द्वारा किया जाता है। हम सबसे अद्यतित और सटीक जानकारी के लिए प्रत्येक योजना की आधिकारिक वेबसाइट पर जाने या संबंधित विभाग से संपर्क करने की सलाह देते हैं।'
      }
    },
    {
      question: {
        english: 'What should I do after finding schemes I am eligible for?',
        hindi: 'मैं जिन योजनाओं के लिए पात्र हूं, उन्हें खोजने के बाद मुझे क्या करना चाहिए?'
      },
      answer: {
        english: 'Once you identify schemes you are eligible for, you can click on "Learn More" to visit the official website of the scheme. There, you can find detailed information about the application process, required documents, and submission guidelines.',
        hindi: 'एक बार जब आप उन योजनाओं की पहचान कर लेते हैं जिनके लिए आप पात्र हैं, तो आप योजना की आधिकारिक वेबसाइट पर जाने के लिए "अधिक जानें" पर क्लिक कर सकते हैं। वहां, आप आवेदन प्रक्रिया, आवश्यक दस्तावेजों और प्रस्तुत करने के दिशानिर्देशों के बारे में विस्तृत जानकारी पा सकते हैं।'
      }
    },
    {
      question: {
        english: 'Can I save or share my eligibility results?',
        hindi: 'क्या मैं अपने पात्रता परिणामों को सहेज या साझा कर सकता हूं?'
      },
      answer: {
        english: 'Yes, you can export your results as a text file, bookmark them for future reference, or share them with others using the share button. This makes it easier to keep track of schemes you are eligible for and share the information with family members who might also benefit.',
        hindi: 'हां, आप अपने परिणामों को टेक्स्ट फ़ाइल के रूप में निर्यात कर सकते हैं, भविष्य के संदर्भ के लिए उन्हें बुकमार्क कर सकते हैं, या शेयर बटन का उपयोग करके उन्हें दूसरों के साथ साझा कर सकते हैं। इससे उन योजनाओं पर नज़र रखना आसान हो जाता है जिनके लिए आप पात्र हैं और जानकारी को परिवार के सदस्यों के साथ साझा करना आसान हो जाता है जो इससे लाभान्वित हो सकते हैं।'
      }
    },
    {
      question: {
        english: 'Is this platform available in languages other than English and Hindi?',
        hindi: 'क्या यह प्लेटफॉर्म अंग्रेजी और हिंदी के अलावा अन्य भाषाओं में उपलब्ध है?'
      },
      answer: {
        english: 'Currently, the platform is available in English and Hindi only. We are working on adding support for more Indian languages to make the platform accessible to a wider audience.',
        hindi: 'वर्तमान में, प्लेटफॉर्म केवल अंग्रेजी और हिंदी में उपलब्ध है। हम प्लेटफॉर्म को व्यापक दर्शकों के लिए सुलभ बनाने के लिए अधिक भारतीय भाषाओं के लिए समर्थन जोड़ने पर काम कर रहे हैं।'
      }
    },
    {
      question: {
        english: 'How often is the scheme information updated?',
        hindi: 'योजना की जानकारी कितनी बार अपडेट की जाती है?'
      },
      answer: {
        english: 'We regularly update our database to include new schemes and changes to existing ones. However, government schemes and their eligibility criteria may change without notice. Always refer to the official sources for the most current information.',
        hindi: 'हम नई योजनाओं और मौजूदा योजनाओं में परिवर्तनों को शामिल करने के लिए नियमित रूप से अपने डेटाबेस को अपडेट करते हैं। हालांकि, सरकारी योजनाएं और उनके पात्रता मानदंड बिना किसी सूचना के बदल सकते हैं। सबसे वर्तमान जानकारी के लिए हमेशा आधिकारिक स्रोतों का संदर्भ लें।'
      }
    },
    {
      question: {
        english: 'What if I don\'t find any schemes I\'m eligible for?',
        hindi: 'अगर मुझे कोई ऐसी योजना नहीं मिलती जिसके लिए मैं पात्र हूं तो क्या होगा?'
      },
      answer: {
        english: 'If no schemes appear in your results, try adjusting some of your details or check back later as new schemes are added regularly. You can also contact your local government office for information about regional schemes that might not be included in our database yet.',
        hindi: 'यदि आपके परिणामों में कोई योजना नहीं दिखाई देती है, तो अपने कुछ विवरणों को समायोजित करने का प्रयास करें या बाद में फिर से जांचें क्योंकि नई योजनाएं नियमित रूप से जोड़ी जाती हैं। आप क्षेत्रीय योजनाओं के बारे में जानकारी के लिए अपने स्थानीय सरकारी कार्यालय से भी संपर्क कर सकते हैं जो अभी तक हमारे डेटाबेस में शामिल नहीं हो सकती हैं।'
      }
    },
    {
      question: {
        english: 'How can I provide feedback about this platform?',
        hindi: 'मैं इस प्लेटफॉर्म के बारे में प्रतिक्रिया कैसे प्रदान कर सकता हूं?'
      },
      answer: {
        english: 'We welcome your feedback! You can use the Contact Us page to send us your suggestions, report issues, or ask questions. Your input helps us improve the platform for everyone.',
        hindi: 'हम आपकी प्रतिक्रिया का स्वागत करते हैं! आप हमें अपने सुझाव भेजने, समस्याओं की रिपोर्ट करने या प्रश्न पूछने के लिए संपर्क करें पेज का उपयोग कर सकते हैं। आपका इनपुट हमें सभी के लिए प्लेटफॉर्म को बेहतर बनाने में मदद करता है।'
      }
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter(faq => 
    faq.question[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer[language].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {t.faqTitle}
        </h1>
        <p className="text-gray-600">
          {t.faqDescription}
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={language === 'english' ? 'Search FAQs...' : 'प्रश्न खोजें...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full text-left p-4 focus:outline-none bg-white flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-800">{faq.question[language]}</span>
                {activeIndex === index ? (
                  <FaChevronUp className="text-[#13518e]" />
                ) : (
                  <FaChevronDown className="text-[#13518e]" />
                )}
              </button>
              {activeIndex === index && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600">{faq.answer[language]}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {language === 'english' 
                ? 'No FAQs match your search. Try different keywords.' 
                : 'आपकी खोज से मेल खाने वाले कोई प्रश्न नहीं हैं। अलग-अलग कीवर्ड आज़माएं।'}
            </p>
          </div>
        )}
      </div>

      {/* Additional Help */}
      <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              {language === 'english' ? 'Need more help?' : 'और सहायता चाहिए?'}
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                {language === 'english' 
                  ? 'If you couldn\'t find the answer to your question, please contact our support team.' 
                  : 'यदि आपको अपने प्रश्न का उत्तर नहीं मिला है, तो कृपया हमारी सहायता टीम से संपर्क करें।'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;