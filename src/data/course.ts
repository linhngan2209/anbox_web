import { Course } from "@/types/course";
import { format } from "path";

export const courses: Course[] = [
  {
    id: 1,
    title: 'Vietnamese for Beginners',
    type: 'online',
    category: '1',
    duration: '35 hours',
    price: 150,
    rating: 4.7,
    instructor: 'Edvance Team',
    description: 'Basic vocabulary, pronunciation, and simple sentences',
    students: 128,
    imageUrl: 'https://clc.tdtu.edu.vn/sites/clc/files/clc/teachers/2018/Training/training1.jpg',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Vietnamese for Finance Professionals',
    type: 'onsite',
    category: '1',
    duration: '35 hours',
    price: 180,
    rating: 4.6,
    instructor: 'Le Thi Hong',
    description: 'Banking, accounting and financial terminology in Vietnamese',
    students: 95,
    imageUrl: 'https://www.vic.gov.au/sites/default/files/2023-12/23-065-TTF_Resize-images_496x818_1.png?width=1536',
    createdAt: '2024-02-10'
  },
  {
    id: 3,
    title: 'Survival Vietnamese for Travelers',
    type: 'offline',
    category: '2',
    duration: '15 hours',
    price: 75,
    rating: 4.5,
    instructor: 'Tran Thi Kim Tuyen',
    description: 'Essential phrases for transportation, directions and shopping',
    students: 215,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJkRONW5a_dWS5O-Cp3ubb-wMYNaEK1PzlQg&s',
    createdAt: '2024-03-05'
  },
  {
    id: 4,
    title: 'Vietnamese for Hotel Staff',
    type: 'online',
    category: '2',
    duration: '25 hours',
    price: 120,
    rating: 4.4,
    instructor: 'Vo Minh Duc',
    description: 'Hospitality language for receptionists and service staff',
    students: 87,
    imageUrl: 'https://www.ucfarnborough.ac.uk/wp-content/uploads/2019/09/Early-Years-Resized-1-of-9-1024x683.jpg',
    createdAt: '2024-03-12'
  },
  {
    id: 5,
    title: 'Tech Vietnamese for Developers',
    type: 'hybrid',
    category: '3',
    duration: '40 hours',
    price: 200,
    rating: 4.8,
    instructor: 'Cristina Nguyen',
    description: 'Programming terminology and IT workplace communication',
    students: 112,
    imageUrl: 'https://www.itac.edu.au/assets/verCI441/images/course/es3.jpg',
    createdAt: '2024-04-01'
  },
  {
    id: 6,
    title: 'Vietnamese for Tech Support',
    type: 'online',
    category: '3',
    duration: '30 hours',
    price: 160,
    rating: 4.5,
    instructor: 'Tran Quang Minh',
    description: 'Customer support language for technical products and services',
    students: 78,
    imageUrl: 'https://dmc.ac/wp-content/uploads/2021/06/Level-2-Teaching-assistant-certificate-course-hub.jpg',
    createdAt: '2024-04-15'
  },
  {
    id: 7,
    title: 'Medical Vietnamese',
    type: 'online',
    category: '6',
    duration: '35 hours',
    price: 180,
    rating: 4.6,
    instructor: 'Phan Thi Hoa',
    description: 'Healthcare terminology for doctors and nurses',
    students: 92,
    imageUrl: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    createdAt: '2024-05-01'
  },
  {
    id: 8,
    title: 'Vietnamese Through Traditional Arts',
    type: 'offline',
    category: '7',
    duration: '20 hours',
    price: 100,
    rating: 4.7,
    instructor: 'Oscar Le',
    description: 'Learn language while exploring music, theater and folk arts',
    students: 64,
    imageUrl: 'https://www.teachingenglish.org.uk/sites/teacheng/files/images/website-Young-Learners_00536.jpg',
    createdAt: '2024-05-10'
  },
  {
    id: 9,
    title: 'Vietnamese for Museum Guides',
    type: 'hybrid',
    category: '7',
    duration: '25 hours',
    price: 130,
    rating: 4.8,
    instructor: 'Le Thi Van',
    description: 'Art and history terminology for cultural professionals',
    students: 53,
    imageUrl: 'https://wpvip.edutopia.org/wp-content/uploads/2022/10/istockphoto-926172568-crop.jpg?w=2880&quality=85',
    createdAt: '2024-05-16'
  },
  {
    id: 10,
    title: 'Vietnamese Cooking Language',
    type: 'offline',
    category: '10',
    duration: '18 hours',
    price: 90,
    rating: 4.9,
    instructor: 'Nguyen Thi Mai',
    description: 'Food vocabulary and cooking techniques in Vietnamese',
    students: 136,
    imageUrl: 'https://wpvip.edutopia.org/wp-content/uploads/2022/10/istockphoto-926172568-crop.jpg?w=2880&quality=85',
    createdAt: '2024-05-20'
  }
];


export const instructorData = [{
  id: 101,
  name: "Linh Nguyen",
  avatar: "/teacher.png",
  description: "Linh Nguyen is a passionate Vietnamese language teacher with over 7 years of experience teaching Vietnamese to foreigners. With a deep understanding of language learning challenges, she uses an interactive and practical approach to make learning Vietnamese fun and effective.",
  background: "Holding a background in Linguistics and Vietnamese Studies, Linh has helped hundreds of students master essential Vietnamese skills, from pronunciation to everyday conversations. Whether you're a complete beginner or looking to improve your communication, she will guide you step by step with engaging lessons, real-life examples, and cultural insights.",
  expertise: "Join the course and start your journey to speaking Vietnamese with confidence!"
}];

export const coursesDetails = [
  {
    id: 1,
    instructorId: 101,
    title: "Vietnamese for Beginners",
    thumbnail: "https://img.youtube.com/vi/0BCIaaWWWow/maxresdefault.jpg",
    video: "https://firebasestorage.googleapis.com/v0/b/furnite-2cf5f.appspot.com/o/images%2Fbegin.mp4?alt=media&token=da16e427-6ea1-400b-87d7-9553680289ec",
    purpose: "This course is designed for beginners to help them get familiar with the Vietnamese alphabet, pronunciation, basic vocabulary, and simple conversational phrases. By the end of the course, learners will be able to introduce themselves, greet others, ask basic questions, and understand common conversations.",
    content: [
      "Introduction to Vietnamese",
      "Greetings & Self-Introduction",
      "Numbers, Dates, and Time",
      "Basic Vocabulary by Topic",
      "Basic Sentence Structures",
      "Real-Life Conversations",
      "Practice & Exercises"
    ],
    outcomes: [
      "Correctly pronounce the Vietnamese alphabet and tones",
      "Communicate basic phrases in everyday life",
      "Understand and use essential vocabulary by topic",
      "Write simple sentences and understand common structures",
    ],
    duration: "4-6 weeks",
    level: "Beginner",
    format: "online",
    lessons: 25,
    exercises: 12,
    hasFinalProject: true,
    DownloadableResources: 16,
    reviews: [
      {
        author: "Linh",
        avatar: "/avatar.jpg",
        time: "2 hours ago",
        content: "The lesson is very helpful and easy to understand. Thank you, teacher!"
      }
    ]
  },

];