import { DivideCircleIcon, Fingerprint, Info, LayoutDashboard, List, Package, UserSquare2, UsersRoundIcon } from "lucide-react";

export const Links = [
  {
    icon: LayoutDashboard,
    pathname: "/dashboard",
    label: "Dashboard",
  },
] as const;


export const NavBarLink = [
    {
        label: "Enrollment",
        icon: UserSquare2,
        href: "/"
    },
    {
        label: "Verify",
        icon: Fingerprint,
        href: "/verify"
    },
]

export const gender = [
    {
      id: "non",
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
      id: "non",
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
            "Soil Science & Land Resources Management"
        ]
    },
    {
        faculty: "Allied Health Sciences",
        departments: [
            "Medical Laboratory Science",
            "Nursing Science",
            "Physiotherapy",
            "Radiography and Radiation Science",
            "Human Nutrition and Dietetics",
        ]
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
        ]
    },
    {
        faculty: "Basic Medical Sciences",
        departments: [
            "Human Anatomy",
            "Medical Physiology",
            "Medical Biochemistry",
        ]
    },
    {
        faculty: "Biological Sciences",
        departments: [
            "Botany and Ecological Studies",
            "Microbiology",
            "Biochemistry",
            "Animal and Environmental Biology",
        ]
    },
    {
        faculty: "Clinical Sciences",
        departments: [
            "Medicine and Surgery",
        ]
    },
    {
        faculty: "Communication Arts",
        departments: [
            "Communication Arts"
        ]
    },
    {
        faculty: "Communication and Media Studies",
        departments: [
            "Communication Arts",
        ]
    },
    {
        faculty: "Computing",
        departments: [
            "Computer Science",
        ]
    },
    {
        faculty: "Dentistry",
        departments: [
            "Dentistry"
        ]
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
        ]
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
            "Petroleum Engineering"
        ]
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
        ]
    },
    {
        faculty: "Law",
        departments: [
            "Public Law",
            "Private Law",
            "International Law",
        ]
    },
    {
        faculty: "Management Science",
        departments: [
            "Marketing",
            "Accounting",
            "Banking and Finance",
            "Insurance and Risk Management",
            "Business Management",
        ]
    },
    {
        faculty: "Physical Sciences",
        departments: [
            "Physics",
            "Mathematics",
            "Statistics",
            "Geoscience",
            "Chemistry", 
        ]
    },
    {
        faculty: "Pharmacy",
        departments: [
            "Clinical Pharmacy and Biopharmacy",
            "Pharmaceutical and Medicinal chemistry",
            "Pharmaceutical Microbiology and Biotechnology",
            "Pharmacognosy and Natural Medicine",
            "Pharmacology and Toxicology",
            "Pharmaceutics and Pharmaceutical Technology"
        ]
    },
    {
        faculty: "Social Sciences",
        departments: [
            "Economics",
            "Geography and Natural Resources Management",
            "Political Science and Public Administration",
            "Psychology",
            "Sociology and Anthropology"
        ]
    },
    {
        faculty: "Vocational Education, Library and Information Science",
        departments: [
            "Agricultural Education",
            "Business Education",
            "Home Economics Education",
            "Industrial Technology Education",
            "Library and Information Science",
        ]
    },
];
