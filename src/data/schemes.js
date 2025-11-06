// Sample scheme data (in a real app, this would come from an API)
export const schemes = [
  {
    id: 1,
    name: {
      english: 'PM Kisan Samman Nidhi',
      hindi: 'पीएम किसान सम्मान निधि'
    },
    description: {
      english: 'Income support of ₹6,000 per year for farmer families',
      hindi: 'किसान परिवारों के लिए ₹6,000 प्रति वर्ष की आय सहायता'
    },
    eligibility: {
      occupation: ['farmer'],
      income: { max: 100000 }
    },
    link: 'https://pmkisan.gov.in/'
  },
  {
    id: 2,
    name: {
      english: 'PM-KISAN Credit Card',
      hindi: 'पीएम-किसान क्रेडिट कार्ड'
    },
    description: {
      english: 'Credit facility up to ₹3 lakh for farmers with minimal interest',
      hindi: 'किसानों के लिए न्यूनतम ब्याज के साथ ₹3 लाख तक की क्रेडिट सुविधा'
    },
    eligibility: {
      occupation: ['farmer'],
      age: { min: 18 }
    },
    link: 'https://pmkisan.gov.in/kcc.aspx'
  },
  {
    id: 3,
    name: {
      english: 'PM Ujjwala Yojana',
      hindi: 'पीएम उज्ज्वला योजना'
    },
    description: {
      english: 'Free LPG connections to women from BPL households',
      hindi: 'बीपीएल परिवारों की महिलाओं को मुफ्त एलपीजी कनेक्शन'
    },
    eligibility: {
      gender: ['female'],
      income: { max: 150000 }
    },
    link: 'https://pmuy.gov.in/'
  },
  {
    id: 4,
    name: {
      english: 'PM-JAY (Ayushman Bharat)',
      hindi: 'पीएम-जेएवाई (आयुष्मान भारत)'
    },
    description: {
      english: 'Health insurance coverage of ₹5 lakh per family per year',
      hindi: 'प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य बीमा कवरेज'
    },
    eligibility: {
      income: { max: 250000 }
    },
    link: 'https://pmjay.gov.in/'
  },
  {
    id: 5,
    name: {
      english: 'National Pension Scheme',
      hindi: 'राष्ट्रीय पेंशन योजना'
    },
    description: {
      english: 'Pension benefits for citizens after retirement',
      hindi: 'सेवानिवृत्ति के बाद नागरिकों के लिए पेंशन लाभ'
    },
    eligibility: {
      age: { min: 18, max: 60 }
    },
    link: 'https://www.npscra.nsdl.co.in/'
  },
  {
    id: 6,
    name: {
      english: 'Pradhan Mantri Awas Yojana (PMAY)',
      hindi: 'प्रधानमंत्री आवास योजना'
    },
    description: {
      english: 'Housing subsidy for affordable housing for the urban poor',
      hindi: 'शहरी गरीबों के लिए किफायती आवास हेतु आवास सब्सिडी'
    },
    eligibility: {
      income: { max: 300000 },
      caste: ['SC', 'ST', 'OBC']
    },
    link: 'https://pmaymis.gov.in/'
  },
  {
    id: 7,
    name: {
      english: 'Sukanya Samriddhi Yojana',
      hindi: 'सुकन्या समृद्धि योजना'
    },
    description: {
      english: 'Small savings scheme for girl child with high interest rate',
      hindi: 'बालिकाओं के लिए उच्च ब्याज दर वाली छोटी बचत योजना'
    },
    eligibility: {
      gender: ['female'],
      age: { max: 10 }
    },
    link: 'https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx'
  },
  {
    id: 8,
    name: {
      english: 'PM Mudra Yojana',
      hindi: 'पीएम मुद्रा योजना'
    },
    description: {
      english: 'Loans up to ₹10 lakh for non-corporate, non-farm small/micro enterprises',
      hindi: 'गैर-कॉर्पोरेट, गैर-कृषि छोटे/सूक्ष्म उद्यमों के लिए ₹10 लाख तक के ऋण'
    },
    eligibility: {
      occupation: ['business'],
      income: { max: 500000 }
    },
    link: 'https://www.mudra.org.in/'
  },
  {
    id: 9,
    name: {
      english: 'Atal Pension Yojana',
      hindi: 'अटल पेंशन योजना'
    },
    description: {
      english: 'Pension scheme for unorganized sector workers',
      hindi: 'असंगठित क्षेत्र के श्रमिकों के लिए पेंशन योजना'
    },
    eligibility: {
      age: { min: 18, max: 40 },
      occupation: ['private employee', 'unemployed', 'other']
    },
    link: 'https://www.npscra.nsdl.co.in/scheme-details.php'
  },
  {
    id: 10,
    name: {
      english: 'National Scholarship Portal',
      hindi: 'राष्ट्रीय छात्रवृत्ति पोर्टल'
    },
    description: {
      english: 'Various scholarships for students from minority communities and economically weaker sections',
      hindi: 'अल्पसंख्यक समुदायों और आर्थिक रूप से कमजोर वर्गों के छात्रों के लिए विभिन्न छात्रवृत्तियां'
    },
    eligibility: {
      occupation: ['student'],
      income: { max: 250000 }
    },
    link: 'https://scholarships.gov.in/'
  }
];

// Language translations
export const translations = {
  english: {
    title: 'Government Scheme Eligibility Assistant',
    subtitle: 'Find welfare schemes you are eligible for',
    age: 'Age',
    income: 'Annual Income (₹)',
    occupation: 'Occupation',
    caste: 'Caste Category',
    gender: 'Gender',
    state: 'State',
    district: 'District',
    checkEligibility: 'Check Eligibility',
    results: 'Eligible Schemes',
    noSchemes: 'No eligible schemes found',
    export: 'Export Results',
    bookmark: 'Bookmark',
    share: 'Share',
    back: 'Back to Form'
  },
  hindi: {
    title: 'सरकारी योजना पात्रता सहायक',
    subtitle: 'आप जिन कल्याणकारी योजनाओं के लिए पात्र हैं, उन्हें खोजें',
    age: 'आयु',
    income: 'वार्षिक आय (₹)',
    occupation: 'व्यवसाय',
    caste: 'जाति श्रेणी',
    gender: 'लिंग',
    state: 'राज्य',
    district: 'जिला',
    checkEligibility: 'पात्रता जांचें',
    results: 'पात्र योजनाएं',
    noSchemes: 'कोई पात्र योजना नहीं मिली',
    export: 'परिणाम निर्यात करें',
    bookmark: 'बुकमार्क',
    share: 'साझा करें',
    back: 'फॉर्म पर वापस जाएं'
  }
};