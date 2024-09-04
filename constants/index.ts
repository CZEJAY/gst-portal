import {
  ActivitySquare,
  BookCopy,
  DivideCircleIcon,
  FileQuestion,
  Fingerprint,
  Info,
  LayoutDashboard,
  List,
  Monitor,
  Package,
  UserSquare2,
  UsersRoundIcon,
} from "lucide-react";

export const Links = [
  {
    icon: LayoutDashboard,
    pathname: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: ActivitySquare,
    pathname: "/dashboard/assessments",
    label: "Assessments",
  },
  {
    icon: Monitor,
    pathname: "/dashboard/monitor",
    label: "Monitor",
  },
  {
    icon: BookCopy,
    pathname: "/dashboard/courses",
    label: "Courses",
  },
  {
    icon: FileQuestion,
    pathname: "/dashboard/questions",
    label: "Questions",
  },
] as const;

export const NavBarLink = [
  {
    label: "Enrollment",
    icon: UserSquare2,
    href: "/",
  },
  {
    label: "Verify",
    icon: Fingerprint,
    href: "/verify",
  },
];

export const gender = [
  {
    id: null,
    title: "Gender",
  },
  {
    id: "male",
    title: "Male",
  },
  {
    id: "female",
    title: "Female",
  },
];

export const course = [
  {
    id: "GST 122",
    title: "GST 122",
  },
  {
    id: "GST 221",
    title: "GST 221",
  },
];

export const YOS = [
  {
    id: null,
    title: "Select Level",
  },
  {
    id: "100 Level",
    title: "100 Level",
  },
  {
    id: "200 Level",
    title: "200 Level",
  },
  {
    id: "300 Level",
    title: "300 Level",
  },
  {
    id: "400 Level",
    title: "400 Level",
  },
  {
    id: "500 Level",
    title: "500 Level",
  },
];

export const facultiesAndDepartment = [
  {
    faculty: "Agriculture",
    departments: [
      "Agricultural & Economics & Extension",
      "Animal Science",
      "Crop Science",
      "Environmental Management",
      "Fishries & Aqua culture",
      "Forest & Wildlife",
      "Food Science & Technology",
      "Home Economics",
      "Soil Science & Land Resources Management",
    ],
  },
  {
    faculty: "Allied Health Sciences",
    departments: [
      "Medical Laboratory Science",
      "Nursing Science",
      "Physiotherapy",
      "Radiography and Radiation Science",
      "Human Nutrition and Dietetics",
    ],
  },
  {
    faculty: "Arts",
    departments: [
      "English",
      "History and International Relation",
      "Philosophy",
      "Linguistics and Nigerian Languages",
      "Foreign Languages",
      "Music",
      "Regious and Cultural Studies",
      "Theatre Arts",
    ],
  },
  {
    faculty: "Basic Medical Sciences",
    departments: [
      "Human Anatomy",
      "Medical Physiology",
      "Medical Biochemistry",
    ],
  },
  {
    faculty: "Biological Sciences",
    departments: [
      "Botany and Ecological Studies",
      "Microbiology",
      "Biochemistry",
      "Animal and Environmental Biology",
    ],
  },
  {
    faculty: "Clinical Sciences",
    departments: ["Medicine and Surgery"],
  },
  {
    faculty: "Communication Arts",
    departments: ["Communication Arts"],
  },
  {
    faculty: "Communication and Media Studies",
    departments: ["Communication Arts"],
  },
  {
    faculty: "Computing",
    departments: ["Computer Science"],
  },
  {
    faculty: "Dentistry",
    departments: ["Dentistry"],
  },
  {
    faculty: "Education",
    departments: [
      "Curriculum Studies",
      "Education Management and Planning",
      "Educational Technology",
      "Psychological Foundation of Education",
      "Sociological Foundation of Education",
      "Science Education",
      "Early childhood and Special Education",
      "Social Studies & Citizenship Education",
      "Guidance and counselling",
      "Human Kinetics and Health Education",
      "History",
    ],
  },
  {
    faculty: "Engineering",
    departments: [
      "Agricultural and Food Engineering",
      "Chemical Engineering",
      "Computer Engineering",
      "Civil Engineering",
      "Electrical and Electronics Engineering",
      "Mechanical and Aerospace Engineering",
      "Petroleum Engineering",
    ],
  },
  {
    faculty: "Environmental Studies",
    departments: [
      "Estate Management",
      "Geo-Informatics & Surveying",
      "Building",
      "Architecture",
      "Fine and industrial Arts",
      "Urban & Regional Planning",
      "Quantity Surveying",
    ],
  },
  {
    faculty: "Law",
    departments: ["Public Law", "Private Law", "International Law"],
  },
  {
    faculty: "Management Science",
    departments: [
      "Marketing",
      "Accounting",
      "Banking and Finance",
      "Insurance and Risk Management",
      "Business Management",
    ],
  },
  {
    faculty: "Physical Sciences",
    departments: [
      "Physics",
      "Mathematics",
      "Statistics",
      "Geoscience",
      "Chemistry",
    ],
  },
  {
    faculty: "Pharmacy",
    departments: [
      "Clinical Pharmacy and Biopharmacy",
      "Pharmaceutical and Medicinal chemistry",
      "Pharmaceutical Microbiology and Biotechnology",
      "Pharmacognosy and Natural Medicine",
      "Pharmacology and Toxicology",
      "Pharmaceutics and Pharmaceutical Technology",
    ],
  },
  {
    faculty: "Social Sciences",
    departments: [
      "Economics",
      "Geography and Natural Resources Management",
      "Political Science and Public Administration",
      "Psychology",
      "Sociology and Anthropology",
    ],
  },
  {
    faculty: "Vocational Education, Library and Information Science",
    departments: [
      "Agricultural Education",
      "Business Education",
      "Home Economics Education",
      "Industrial Technology Education",
      "Library and Information Science",
    ],
  },
];

export const tree = [
  {
    name: "App",
    children: [
      {
        name: "Faculty",
      },
    ],
  },
  {
    name: "Api",
    children: [{ name: "Routes", children: [{ name: "Faculty" }] }],
  },
];

export const defaultExamInstructions = `
Read all questions carefully before selecting your answers. Manage your time wisely by monitoring the countdown timer and allocating time to each section accordingly. Answer all questions to the best of your ability, as there is no penalty for incorrect answers unless specified. Review each answer before moving to the next question, and use the "Review" or "Flag" option for questions you want to revisit. Do not leave the exam platform without submitting your answers; ensure you click "Submit" before the time expires. Keep your workspace clear, using only approved materials, as any unauthorized devices or materials may lead to disqualification. Ensure your answers are properly saved, and verify that your selections are recorded before moving to the next question. Follow all on-screen instructions and any additional guidelines provided by the exam supervisor. Remain seated and focused until you have completed and submitted your exam. If you experience technical issues, notify the exam supervisor immediately.`;

export const defaultExamDescription = `
This computer-based exam is designed to assess your understanding and knowledge of the subject matter covered in this course. It includes a variety of question types, such as multiple-choice, short answer, and essay questions, to evaluate different levels of comprehension and critical thinking.

You are expected to demonstrate your grasp of key concepts, apply theoretical knowledge to practical scenarios, and showcase your ability to analyze and synthesize information. The exam will cover topics discussed during lectures, readings, and any additional materials provided throughout the course.

Before starting, please ensure that you have thoroughly reviewed all relevant content. Good luck!
`;
