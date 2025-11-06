import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { FaInfoCircle } from 'react-icons/fa';

function SchemeEligibilityForm({ userDetails, setUserDetails, onSubmit, isSubmitting }) {
  const { language, translations, locations } = useAppContext();
  const [districts, setDistricts] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const t = translations[language];

  const occupations = ['farmer', 'student', 'business', 'government employee', 'private employee', 'unemployed', 'other'];
  const casteCategories = ['General', 'OBC', 'SC', 'ST'];
  const genderOptions = ['male', 'female', 'other'];

  useEffect(() => {
    if (userDetails.state && locations) {
      const selectedState = locations.states.find(s => s.name === userDetails.state);
      if (selectedState) {
        setDistricts(selectedState.districts);
      } else {
        setDistricts([]);
      }
    } else {
      setDistricts([]);
    }
  }, [userDetails.state, locations]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Clear district if state changes
    if (name === 'state') {
      setUserDetails({
        ...userDetails,
        [name]: value,
        district: ''
      });
    } else {
      setUserDetails({
        ...userDetails,
        [name]: value
      });
    }

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

    if (!userDetails.age) errors.age = 'Age is required';
    if (!userDetails.income) errors.income = 'Income is required';
    if (!userDetails.occupation) errors.occupation = 'Occupation is required';
    if (!userDetails.caste) errors.caste = 'Caste category is required';
    if (!userDetails.gender) errors.gender = 'Gender is required';
    if (!userDetails.state) errors.state = 'State is required';
    if (!userDetails.district) errors.district = 'District is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  if (!translations || !locations) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <FaInfoCircle className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              {t.formInstructions || "Fill in your details to find government schemes you're eligible for."}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.age} <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="age"
            value={userDetails.age}
            onChange={handleInputChange}
            className={`mt-1 block w-full border ${
              formErrors.age ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
            min="0"
            max="120"
          />
          {formErrors.age && (
            <p className="mt-1 text-sm text-red-500">{formErrors.age}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.income} <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="income"
            value={userDetails.income}
            onChange={handleInputChange}
            className={`mt-1 block w-full border ${
              formErrors.income ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
            min="0"
          />
          {formErrors.income && (
            <p className="mt-1 text-sm text-red-500">{formErrors.income}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.occupation} <span className="text-red-500">*</span>
          </label>
          <select
            name="occupation"
            value={userDetails.occupation}
            onChange={handleInputChange}
            className={`mt-1 block w-full border ${
              formErrors.occupation ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">{t.select || 'Select'}</option>
            {occupations.map(occupation => (
              <option key={occupation} value={occupation}>
                {occupation.charAt(0).toUpperCase() + occupation.slice(1)}
              </option>
            ))}
          </select>
          {formErrors.occupation && (
            <p className="mt-1 text-sm text-red-500">{formErrors.occupation}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.caste} <span className="text-red-500">*</span>
          </label>
          <select
            name="caste"
            value={userDetails.caste}
            onChange={handleInputChange}
            className={`mt-1 block w-full border ${
              formErrors.caste ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">{t.select || 'Select'}</option>
            {casteCategories.map(caste => (
              <option key={caste} value={caste}>{caste}</option>
            ))}
          </select>
          {formErrors.caste && (
            <p className="mt-1 text-sm text-red-500">{formErrors.caste}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.gender} <span className="text-red-500">*</span>
          </label>
          <select
            name="gender"
            value={userDetails.gender}
            onChange={handleInputChange}
            className={`mt-1 block w-full border ${
              formErrors.gender ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">{t.select || 'Select'}</option>
            {genderOptions.map(gender => (
              <option key={gender} value={gender}>
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </option>
            ))}
          </select>
          {formErrors.gender && (
            <p className="mt-1 text-sm text-red-500">{formErrors.gender}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.state} <span className="text-red-500">*</span>
          </label>
          <select
            name="state"
            value={userDetails.state}
            onChange={handleInputChange}
            className={`mt-1 block w-full border ${
              formErrors.state ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">{t.select || 'Select'}</option>
            {locations.states.map(state => (
              <option key={state.name} value={state.name}>{state.name}</option>
            ))}
          </select>
          {formErrors.state && (
            <p className="mt-1 text-sm text-red-500">{formErrors.state}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.district} <span className="text-red-500">*</span>
          </label>
          <select
            name="district"
            value={userDetails.district}
            onChange={handleInputChange}
            className={`mt-1 block w-full border ${
              formErrors.district ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
            disabled={!userDetails.state}
          >
            <option value="">{t.select || 'Select'}</option>
            {districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
          {formErrors.district && (
            <p className="mt-1 text-sm text-red-500">{formErrors.district}</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#13518e] hover:bg-[#0e3b66] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (t.checking || 'Checking...') : (t.checkEligibility || 'Check Eligibility')}
        </button>
      </div>
    </form>
  );
}

export default SchemeEligibilityForm;