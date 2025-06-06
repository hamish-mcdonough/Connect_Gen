import { useState } from "react";

// Sample activity types with their icons
const ACTIVITY_TYPES = [
  { type: "Odd One Out", icon: "🧩" },
  { type: "Mystery Visual", icon: "🔍" },
  { type: "Weird Fact or Lie", icon: "⁉️" },
  { type: "What If...", icon: "💭" },
  { type: "Connection Challenge", icon: "🔗" },
];

// Sample subject areas for demonstration
const SUBJECT_AREAS = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Art",
  "Physical Education",
  "Music",
];

export default function ConnectActivityGenerator() {
  const [formData, setFormData] = useState({
    yearLevel: "",
    subjectArea: "",
    unitTopic: "",
  });

  const [activity, setActivity] = useState<{
    type: string;
    icon: string;
    title: string;
    prompt: string;
    questions: string[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateActivity = () => {
    setIsLoading(true);
    setError("");

    if (!formData.yearLevel || !formData.subjectArea || !formData.unitTopic) {
      setError("Please fill out all fields before generating an activity.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      try {
        const randomActivityType =
          ACTIVITY_TYPES[Math.floor(Math.random() * ACTIVITY_TYPES.length)];

        const generatedActivity = {
          type: randomActivityType.type,
          icon: randomActivityType.icon,
          title: `${randomActivityType.icon} ${randomActivityType.type} - Which of these doesn't belong?`,
          prompt: generatePrompt(formData),
          questions: generateQuestions(formData, randomActivityType.type),
        };

        setActivity(generatedActivity);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to generate activity. Please try again.");
        setIsLoading(false);
      }
    }, 1500);
  };

  const generatePrompt = (data: { yearLevel: string; subjectArea: string; unitTopic: string }) => {
    const { yearLevel, subjectArea, unitTopic } = data;

    if (subjectArea === "Mathematics") {
      return `Look at these four mathematical concepts related to ${unitTopic}. Three of them share a common property, but one doesn't fit with the others. Can you identify which one is different and explain why?`;
    } else if (subjectArea === "Science") {
      return `Examine these scientific elements related to ${unitTopic}. Which one is the odd one out based on its properties or characteristics?`;
    } else {
      return `Consider these four items related to ${unitTopic} in ${subjectArea}. One of them doesn't belong with the others. Identify which one and explain your reasoning.`;
    }
  };

  const generateQuestions = (data: { subjectArea: string; unitTopic: string }, activityType: string) => {
    const { subjectArea, unitTopic } = data;

    if (activityType === "Odd One Out") {
      return [
        `Which item do you think is the odd one out and why?`,
        `Could any of the other items be considered the odd one out for different reasons?`,
        `What connections can you find between all four items despite their differences?`,
        `How do these items relate to our current unit on ${unitTopic}?`,
      ];
    } else if (activityType === "Mystery Visual") {
      return [
        `What do you observe in this visual?`,
        `How does this connect to our study of ${unitTopic}?`,
        `What questions does this visual raise for you?`,
        `How might this visual represent a key concept in ${subjectArea}?`,
      ];
    } else {
      return [
        `What's your initial reaction to this ${activityType.toLowerCase()}?`,
        `How does this connect to what we've been learning about ${unitTopic}?`,
        `What new perspective does this give you on the topic?`,
        `How might you apply this thinking to solve problems in ${subjectArea}?`,
      ];
    }
  };

  const resetForm = () => {
    setActivity(null);
    setFormData({
      yearLevel: "",
      subjectArea: "",
      unitTopic: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-50 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-700">
          Connect Activity Generator
        </h1>
        <p className="text-gray-600 mt-2">
          Create engaging classroom starter activities in seconds
        </p>
      </header>

      {!activity ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year Level
              </label>
              <input
                type="text"
                name="yearLevel"
                value={formData.yearLevel}
                onChange={handleChange}
                placeholder="e.g. Year 8, Grade 10, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject Area
              </label>
              <select
                name="subjectArea"
                value={formData.subjectArea}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a subject area</option>
                {SUBJECT_AREAS.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit/Topic
              </label>
              <input
                type="text"
                name="unitTopic"
                value={formData.unitTopic}
                onChange={handleChange}
                placeholder="e.g. Fractions, Photosynthesis, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          <button
            onClick={generateActivity}
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium transition duration-150 disabled:bg-indigo-300"
          >
            {isLoading ? "Generating..." : "Generate Connect Activity"}
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500 activity-display">
          <div className="activity-header mb-8">
            <h2 className="text-2xl font-bold text-indigo-700">{activity.title}</h2>
            <div className="mt-2 p-4 bg-indigo-50 rounded-md border border-indigo-100">
              <p className="text-lg">{activity.prompt}</p>
            </div>
          </div>
          
          <div className="activity-questions mb-8">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Discussion Questions:</h3>
            <ul className="space-y-3">
              {activity.questions.map((question, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={resetForm}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md font-medium transition duration-150"
            >
              Create New Activity
            </button>
            
            <button
              onClick={() => window.print()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium transition duration-150"
            >
              Print / Save
            </button>
          </div>
        </div>
      )}
      
      <footer className="mt-8 text-center text-gray-600 text-sm">
        <p>Connect Activity Generator • For Classroom Use</p>
      </footer>
    </div>
  );
}