import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import Spinner from '@/services/Spinner';
import { industries, prospect, countries, companiesSize } from './data.js';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCreateWorkflowMutation } from '@/store/api/workflowApi.jsx';

const MultiStepModal = () => {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  

  const [createWorkflow,{isLoading,isSuccess,isError,error}] = useCreateWorkflowMutation()



  const [data, setData] = useState({
    id: Date.now(),
    description: '',
    companySize: {
      lower_limit: '',
      upper_limit: ''
    },
    locations: [],
    industries: [],
    prospects: [],
  });
  const [input, setInput] = useState({
    location: '',
    industry: '',
    prospect: '',
  });

  const renderIndustries = industries.filter((ele) => ele.toLocaleLowerCase().includes(input.industry.toLowerCase()));
  const renderLocations = countries.filter((ele) => ele.toLocaleLowerCase().includes(input.location.toLocaleLowerCase()));
  const renderProspects = prospect.filter((ele) =>
    ele.toLowerCase().includes(input.prospect.toLowerCase())
  );


  useEffect(() =>{
    if(isSuccess){
      handleCloseModal()
    }
    if(isError){
      console.log(error)

      toast({
        title : "Error",
        description : error.data.message || 'Something went wrong!'
      })
    }
  },[isSuccess,isError])

  const validateStep = () => {
    switch (step) {
      case 1:
        return data.description.trim() !== '';
      case 2:
        return data.companySize.lower_limit !== '' && data.companySize.upper_limit !== '';
      case 3:
        return data.locations.length > 0;
      case 4:
        return data.industries.length > 0;
      case 5:
        return data.prospects.length > 0;
      default:
        return true;
    }
  };

  function handleSelection(e) {
    if (e !== '10000+') {
      let data = e.split('-');
      setData((prev) => ({
        ...prev,
        companySize: {
          lower_limit: data[0],
          upper_limit: data[1]
        }
      }));
    } else {
      setData((prev) => ({
        ...prev,
        companySize: {
          lower_limit: '0',
          upper_limit: '1000000'
        }
      }));
    }

    console.log(data);
  }

  const handleNextStep = async () => {
    if (!validateStep()) {
      toast({
        title: 'Please complete the required fields before proceeding.',
        variant: 'destructive',
      });
      return;
    }

    if (step < 5) {
      setStep(step + 1);
    } else {
      const requestData = {
        company_details: data.description,
        location: data.locations.join(' OR '),
        industry: data.industries.join(' OR '),
        lower_limit: data.companySize.lower_limit,
        upper_limit: data.companySize.upper_limit,
        companies_count: '1',
        prospect_details: data.prospects.join(' OR ')
      };
      console.log(requestData);

      await createWorkflow(requestData)
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLocation = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && input.location.trim() !== '') {
      e.preventDefault();
      setData((prevData) => ({
        ...prevData,
        locations: [...prevData.locations, input.location.trim()],
      }));
      setInput((prevInput) => ({ ...prevInput, location: '' }));
    }
  };

  const handleAddProspectFromSuggestion = (prospect) => {
    if (prospect && !data.prospects.includes(prospect)) {
      setData((prevData) => ({
        ...prevData,
        prospects: [...prevData.prospects, prospect],
      }));
      setInput((prevInput) => ({ ...prevInput, prospect: '' }));
    }
  };

  const handleRemoveLocation = (locationToRemove) => {
    setData((prevData) => ({
      ...prevData,
      locations: prevData.locations.filter((loc) => loc !== locationToRemove),
    }));
  };

  const handleAddIndustryFromSuggestion = (industry) => {
    if (industry && !data.industries.includes(industry)) {
      setData((prevData) => ({
        ...prevData,
        industries: [...prevData.industries, industry],
      }));
      setInput((prevInput) => ({ ...prevInput, industry: '' }));
    }
  };

  const handleAddLocationFromSuggestion = (location) => {
    if (location && !data.locations.includes(location)) {
      setData((prevData) => ({
        ...prevData,
        locations: [...prevData.locations, location],
      }));
      setInput((prevInput) => ({ ...prevInput, location: '' }));
    }
  };

  const handleRemoveIndustry = (industryToRemove) => {
    setData((prevData) => ({
      ...prevData,
      industries: prevData.industries.filter((ind) => ind !== industryToRemove),
    }));
  };

  const handleRemoveProspect = (prospectToRemove) => {
    setData((prevData) => ({
      ...prevData,
      prospects: prevData.prospects.filter((prospect) => prospect !== prospectToRemove),
    }));
  };

  const handleCloseModal = () => {
    setStep(1); // Reset the step to 1
    setOpen(false); // Close the dialog
    setData({
      id: Date.now(),
      description: '',
      companySize: {
        lower_limit: '',
        upper_limit: ''
      },
      locations: [],
      industries: [],
      prospects: [],
    });
  };

  const progressBarWidth = `${(step / 5) * 100}%`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-800 hover:bg-blue-950 text-lg" size="lg">
          Create Workflow
        </Button>
      </DialogTrigger>

        <DialogContent className="max-w-lg p-8 bg-white shadow-lg rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-blue-600">Create Workflow</DialogTitle>
          </DialogHeader>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-4 mb-6 relative">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: progressBarWidth }}
            ></div>
          </div>

          {step === 1 && (
            <div className="transition-opacity duration-500">
              <label className="text-gray-700 font-medium">Enter Company Description</label>
              <Textarea
                className="mt-2 h-36 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company description"
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
              />
            </div>
          )}

          {step === 2 && (
            <div className="transition-opacity duration-500">
              <label className="text-gray-700 font-medium">Select Company Size</label>
              <Select onValueChange={handleSelection} defaultValue="10000+">
                <SelectTrigger className="w-full mt-2 border border-gray-300 rounded-lg">
                  <SelectValue placeholder="Select Company Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Company Size</SelectLabel>
                    {companiesSize.map((size, index) => (
                      <SelectItem key={index} value={size}>{size}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}

          {step === 3 && (
            <div className="transition-opacity duration-500">
              <label className="text-gray-700 font-medium">Add Locations</label>
              <div className="mt-2 mb-4 flex flex-col">
                <Input
                  name="location"
                  placeholder="Type location and press Enter or ,"
                  value={input.location}
                  onChange={handleInputChange}
                  onKeyDown={handleAddLocation}
                  className="p-4 border border-gray-300 rounded-lg mb-2"
                />
                <div className="flex flex-wrap gap-2 mb-4">
                  {data.locations.map((location, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm py-1 px-3 rounded-full flex items-center cursor-pointer hover:bg-blue-200"
                      onClick={() => handleRemoveLocation(location)}
                    >
                      {location}
                      <span className="ml-2 text-lg">&times;</span>
                    </span>
                  ))}
                </div>
                <div
                  className="h-40 overflow-auto border border-gray-300 rounded-lg"
                  style={{ maxHeight: '200px' }}
                >
                  <ul>
                    {renderLocations.map((loc, index) => (
                      <li
                        key={index}
                        onClick={() => handleAddLocationFromSuggestion(loc)}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {loc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="transition-opacity duration-500">
              <label className="text-gray-700 font-medium">Add Industries</label>
              <div className="mt-2 mb-4 flex flex-col">
                <Input
                  name="industry"
                  placeholder="Type industry and press Enter or ,"
                  value={input.industry}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault();
                      if (input.industry.trim() !== '') {
                        handleAddIndustryFromSuggestion(input.industry.trim());
                      }
                    }
                  }}
                  className="p-4 border border-gray-300 rounded-lg mb-2"
                />
                <div className="flex flex-wrap gap-2 mb-4">
                  {data.industries.map((industry, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 text-sm py-1 px-3 rounded-full flex items-center cursor-pointer hover:bg-green-200"
                      onClick={() => handleRemoveIndustry(industry)}
                    >
                      {industry}
                      <span className="ml-2 text-lg">&times;</span>
                    </span>
                  ))}
                </div>
                <div className="h-40 overflow-auto border border-gray-300 rounded-lg">
                  <ul>
                    {renderIndustries.map((ind, index) => (
                      <li
                        key={index}
                        onClick={() => handleAddIndustryFromSuggestion(ind)}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {ind}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="transition-opacity duration-500">
              <label className="text-gray-700 font-medium">Add Prospects</label>
              <div className="mt-2 mb-4 flex flex-col">
                <Input
                  name="prospect"
                  placeholder="Type prospect and press Enter or ,"
                  value={input.prospect}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault();
                      if (input.prospect.trim() !== '') {
                        handleAddProspectFromSuggestion(input.prospect.trim());
                      }
                    }
                  }}
                  className="p-4 border border-gray-300 rounded-lg mb-2"
                />
                <div className="flex flex-wrap gap-2 mb-4">
                  {data.prospects.map((prospect, index) => (
                    <span
                      key={index}
                      className="bg-yellow-100 text-yellow-800 text-sm py-1 px-3 rounded-full flex items-center cursor-pointer hover:bg-yellow-200"
                      onClick={() => handleRemoveProspect(prospect)}
                    >
                      {prospect}
                      <span className="ml-2 text-lg">&times;</span>
                    </span>
                  ))}
                </div>
                <div className="h-40 overflow-auto border border-gray-300 rounded-lg">
                  <ul>
                    {renderProspects.map((prospect, index) => (
                      <li
                        key={index}
                        onClick={() => handleAddProspectFromSuggestion(prospect)}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {prospect}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button
                type="button"
                onClick={handlePreviousStep}
                className="bg-gray-500 text-white hover:bg-gray-600"
              >
                Previous
              </Button>
            )}
            <Button
              type="button"
              onClick={handleNextStep}
              className="bg-blue-800 hover:bg-blue-900 text-white"
            >
              {step === 5 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </DialogContent>
      
    </Dialog>
  );
};

export default MultiStepModal;
