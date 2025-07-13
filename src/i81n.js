// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
    en: {
        translation: {
  "language": {
    "title": "Language",
    "arabic": "Arabic",
    "english": "English"
  },

  "dashboard": {
    "title": "Dashboard",
    "signout": "Sign out",

    "post": {
      "name": "Post"
    },

    "users": {
      "name": "Users",
      "total": "Total Users",
      "recent": "Recent Users",

      "image": "User Image",
      "username": "Username",
      "email": "Email",
      "admin": "Admin",
      "doctor": "Doctor",
      "approve": "Approve",
      "unapprove": "Unapprove",
      "date": "Date Created",
      "delete": "Delete",
      "more": "Show More",
      "no_users": "You Have No Users Yet !",
      "delete?": "Are you sure you want to delete this user ?",
      "sure_to": "Are you sure you want to ",
      "this": "this user?",
      "sure_delete": "Yes, I’m sure",
      "no_cancel": "No, cancel",

      "error": "Error fetching users:",
      "error_more": "Error fetching more users:",
      "single_error": "Error :",

      "unkown": "Unkown"
    },

    "comments": {
      "date": "Date Updated",
      "content": "Comment Content",
      "no_of_likes": "Number of likes",
      "post_id": "Post Id",
      "user_id": "User Id",
      "delete": "Delete",
      "save": "Save",
      "cancel": "Cancel",
      "edit": "Edit",

      "anonymous": "Anonymous User",

      "no_comment": "You have no comments yet!",
      "likes": "Likes",
      "name": "Comments",
      "total": "Total comments",
      "recent": "Recent comments",
      "error": "Error fetching comments:",
      "error_more": "Error fetching more comments:",
      "error_delete": "Error deleting comment:",
      "more": "Show More",
      "empty": "You have no comments yet!",
      "delete?": "Are you sure you want to delete this comment ?",
      "sure_delete": "Yes, I’m sure",
      "no_cancel": "No, cancel",

      "unkown": "Unkown"
    },

    "posts": {
      "name": "Posts",
      "date": "Date Updated",
      "image": "Post  Image",
      "title": "Post Title",
      "category": "Category",
      "delete": "Delete",
      "edit": "Edit",

      "total": "Total posts",
      "recent": "Recent posts",

      "error": "Error fetching posts:",
      "error_more": "Error fetching more posts:",
      "unkown": "Unkown",
      "delete_error": "Error deleting post:",
      "more": "Show More",
      "no_posts": "You Have No Posts Yet !",
      "delete?": "Are you sure you want to delete this post?",
      "sure_delete": "Yes, I’m sure",
      "no_cancel": "No, cancel"
    },

    "profile": {
      "name": "Profile",
      "updating": "Updating...",
      "update": "Update",
      "failed_update": "Update failed.",
      "delete": "Delete Account",
      "signout": "Sign out",
      "admin": "Admin",
      "user": "User"
    },

    "table": {
      "all": "See all",
      "error": "Error fetching dashboard data:"
    },

    "card": {
      "last": "Last Month",
      "all": "See all",
      "error": "Error fetching dashboard data:",
      "unkown": "Unkown"
    }
  },

  "general": {
    "loading": "Loading...",
    "error": "Error: "
  },

  "verify": {
    "fill_all": "Please fill in all required fields.",
    "failed": "Verification failed.",
    "coclinic": "CoClinic",
    "email_confirmation_code": "Please enter the email and confirmation code you received to verify your account.",
    "email": "Email",
    "email_placeholder": "you@example.com",
    "confirmation_code": "Confirmation Code",
    "confirmation_code_placeholder": "Enter the code sent to your email",
    "verify_email": "Verify Email",
    "success": "Your email has been verified. You can now log in."
  },

  "header": {
    "create_book": "Create Book",
    "find": "Find Doctors, Services ...",
    "home": "Home",
    "ai_chat": "AI",
    "live_chat": "Live Chat",
    "appointments": "Appointments",
    "resources": "Resource",
    "about": "About",
    "co": "Co",
    "clinic": "Clinic",
    "slogan": "Compassionate Care, Anytime",
    "my_profile": "My Profile",
    "settings": "Settings",
    "account_settings": "Account Settings",
    "sign_out": "Sign Out",
    "sign_up": "Sign Up",
    "sign_in": "Sign In",
    "dashboard": "Dashboard"
  },

  "home": {
    "patient_served": "500k+ Patients Served",
    "join_growing": "Join our growing community",

    "headline": "Your Trusted Partner in",
    "digital": "Digital Healthcare",
    "description": "Experience compassionate care through our integrated platform offering direct doctor communication, AI-powered consultations, and seamless healthcare management.",
    "get_started": "Get Started",
    "learn_more": "Learn More",
    "hipaa": "HIPAA Compliant",
    "rated": "5-Star Rated Service"
  },

  "featured": {
    "title": "Comprehensive Support for Your",
    "r_journey": " Recovery Journey",
    "description": "Empower your recovery with our integrated suite of support tools and resources, designed by healthcare professionals.",
    "ai_assistant": {
      "title": "AI Assistant",
      "description": "Get 24/7 support with our AI Assistant and experience seamless conversational interaction.",
      "benefits": "Enhance your user experience with instant responses and personalized assistance.",
      "cta": "Chat With AI"
    },
    "get_doctor": {
      "title": "Get a Doctor",
      "description": "Search, book, and rate therapists to find the right support for your recovery journey.",
      "benefits": "Access personalized therapy options and foster a meaningful therapeutic relationship.",
      "cta": "Find A doctor"
    },
    "resources": {
      "title": "Educational Resources",
      "description": "Access a comprehensive library of articles, videos, and materials on addiction recovery.",
      "benefits": "Expand your knowledge and gain insights to support your recovery journey."
    },
    "recovery": {
      "title": "Personalized Recovery",
      "description": "Customize your recovery journey based on individual assessments and needs.",
      "benefits": "Receive personalized recovery plans and support to achieve long-term wellness.",
      "cta": "View Recovery Plan"
    },
    "tracker": {
      "title": "Habit Tracker",
      "description": "Monitor habits, identify triggers, and track progress to maintain positive behaviors.",
      "benefits": "Set goals and see improvement in daily habits to support your recovery goals.",
      "cta": "View Habit Tracker"
    },
    "quotes": {
      "title": "Inspirational Quotes",
      "description": "\"The journey of a thousand miles begins with a single step.\"",
      "cta": "Explore More Quotes",
      "benefits": "Find motivation and encouragement to stay strong on your journey to recovery."
    },
    "coming_soon": {
      "title": "Coming Soon: Enhanced Support Features",
      "description": "We're constantly evolving to better serve your recovery needs",
      "dashboard": {
        "title": "Dashboard",
        "description": "Track your progress, set goals, and visualize data for continuous improvement.",
        "benefits": "Monitor trends and celebrate achievements along your journey to recovery.",
        "cta": "View Dashboard",
        "soon": "Coming Soon"
      },
      "community": {
        "title": "Community Support",
        "description": "Connect with others on a similar journey, share experiences, and find encouragement.",
        "benefits": "Build a supportive network and access resources that inspire growth and recovery.",
        "cta": "Join The Community"
      },
      "crisis": {
        "title": "Crisis Support",
        "description": "Access emergency contact options and immediate chat support with licensed counselors.",
        "benefits": "Receive compassionate assistance and guidance during critical times.",
        "cta": "Contact Crisis Support"
      }
    }
  },

  "appointment": {

    "empty": {
    "patient_title": "No Appointments Yet",
    "patient_description": "You haven’t booked any consultations yet. When you do, they’ll show up here.",
    "doctor_title": "No Consultations Scheduled",
    "doctor_description": "No patients have scheduled appointments with you yet. Stay tuned!",
  },

    "confirmation": {
      "status_updated": "Status updated successfully",
      "status_failed": "Status update failed",
      "app_cancelled": "Appointment cancelled",
      "app_failed": "Appointment failed",
      "loading": "Loading appointments...",
      "upcoming": "Upcoming Appointments",
      "no_appointments": "No appointments found",
      "time": "30 minutes",
      "my": "My Appointments",
      "your": "Your Appointments",
      "cancel": "Cancel",
      "confirm": "Confirm",
      "decline": "Decline",

      "success": "Appointment loaded successfully",
      "not_found": "Appointment not found",
      "failed": "Failed to fetch appointment",
      "title": "Appointment Confirmed!",
      "with": "Your appointment with",
      "date": "Date & Time",
      "duration": "Duration",
      "notes": "Notes",
      "status": "Status",
      "view_appointments": "View All Appointments"
    },

    "form": {
      "success": "Appointment booked successfully!",
      "failed": "Booking failed",
      "sucess_update": "Status updated successfully",
      "cancelled": "cancelled",
      "loading": "Loading appointments...",
      "new": "Book New Appointment",
      "doctor": "Doctor",
      "date&time": "Date & Time",
      "notes": "Notes",
      "confirm": "Confirm Booking",
      "upcoming": "Upcoming Appointments",
      "no_appointments": "No appointments found",
      "cancel": "Cancel",
      "single_confirm": "Confirm",
      "decline": "Decline",
      "hide": "Hide Booking Form",
      "book": "Book New Appointment"
    },

    "general": {
      "date": "Date :",
      "from": "From :",
      "note": "Note :",
      "to": "To :",
      "mine": "My Appointments"
    },

    "status": {
      "completed": "completed",
      "confirmed": "confirmed",
      "cancelled": "cancelled",
      "pending": "pending"
    },

    "patient": {
      "cancel_consultaion": "Cancell Consultation",
      "consultation": "Patient Consultation"
    },

    "book": {
      "form": "Book New Appointment",
      "hide_form": "Hide Booking Form",
      "appointment_1": "Book an Appointment",
      "select_doctor": "Select Doctor",
      "loading": "Loading doctors...",
      "please_select": "Please select a doctor",
      "date_time": "Date and Time",
      "notes": "Notes",
      "appointment_2": "Book Appointment",
      "processing": "Booking Appointments ..."
    }
  },

  "book": {
    "loading": "Loading...",
    "wrong": "Something went wrong!",
    "copied": "Link copied!",
    "off": "OFF",
    "description": "Description",

    "title": "Title",
    "author": "Author",
    "offer": "Offer",
    "edit": "Edit Book",
    "regular_price": "Regular price",
    "discounted_price": "Discounted price",
    "current_images": "Current Images",
    "image_urls": "Image Urls",
    "image_placeholder": "Image Links",
    "add_image": "Add Image",
    "saving": "Saving...",
    "save_changes": "Save Changes",
    "book_images": "Book Images"
  },

  "books": {
    "post_book": "Post Book",
    "add_image": "Add Image",
    "discount_price": "Discount Price",

    "allowed_only": "Only JPEG, JPG, PNG, or GIF files up to 5MB are allowed",
    "number_of_allowed": "You can only upload up to 5 images per listing",
    "at_least": "You must upload at least one image",
    "lower_or_equal": "Discount price must be lower than regular price",
    "created": "Book created successfully",
    "failed_to_create": "Failed to create book. Please try again.",

    "create": "Post a Book",
    "title": "Title",
    "description": "Description",

    "author": "Author",

    "offer": "Offer",
    "regular_price": "Regular price",
    "discounted_price": "Discounted price",

    "images": "Images:",
    "first_image": "The first image will be the cover",
    "uploaded_images": "Uploaded Images:",

    "delete": "Delete",
    "select_images": "Selected Images:",
    "remove": "Remove",
    "creating": "Creating...",

    "explore": "Explore Our Book Collection",
    "discover": "Discover hand-picked titles at unbeatable deals. Whether you're seeking inspiration or adventure, find your next favorite book here.",
    "browse": "Start Browsing",
    "today_offer": "Today’s Special Offers",
    "loading": "Loading offers...",
    "featured": "Featured Books",
    "more": "View More",
    "join_community": "Join Our Reading Community",
    "subscribe_benefits": "Subscribe for updates on new arrivals, author talks, and exclusive discounts.",
    "subscribe_now": "Subscribe Now",
    "failed": "Failed to post comment.",
    "error": "An error occurred while posting the comment.",

    "comment": {
      "failed": "Failed to fetch comments:",
      "error": "Error fetching comments:",
      "length": "Comment chars must be between 1 and 200 characters.",
      "name": "Comments",
      "as": "Signed in as:",
      "must": "You must be signed in to comment.",
      "sign": "Sign In",
      "no_comments": "No comments yet!",
      "sure": "Are you sure you want to delete this comment?",
      "yes": "Yes, I’m sure",
      "no": "No, cancel",
      "error_like": "Error liking comment:",
      "error_delete": "Error deleting comment:",
      "submit": "Submit",
      "submitting": "Submitting",
      "unkown": "Unkown",
      "chars_remaining": "characters remaining"
    }
  },

  "live_chat": {
    "live": "Live Chat",
    "explore": "Explore users to start a conversation with.",
    "image": "Image",
    "video": "Video",
    "add": "Add Friend",
    "chat": "Chat",
    "loading": "Loading...",
    "online": "Online",
    "offline": "Offline",
    "no_user": "No user found!",
    "search": "Search user by name, email....",
    "type_here": "Type message here..."
  },

  "profile": {
    "profile": "Profile",
    "username": "username",
    "email": "email",
    "password": "password",
    "update": "Update",
    "delete": "Delete Account",
    "signout": "Sign out",
    "please_select": "Please select a valid image file.",
    "update_fialed": "Update failed.",
    "loading": "Loading..."
  },

  "about": {
  "co": "About CoClinic",
  "description1": "CoClinic is an innovative telehealth platform designed to provide seamless healthcare services through live consultations and interactive AI support. We focus on enhancing the patient experience by offering multiple avenues for interaction, including direct communication with doctors and AI-based chatbots for preliminary consultations.",
  "description2": "Our mission is to bridge the gap between patients and healthcare professionals, making healthcare accessible and convenient for everyone. Whether you need a quick consultation or in-depth medical advice, CoClinic is here to support you at every step.",
  
  "our_mission": "Our Mission",
  "our_mission_content": "To make quality healthcare accessible to everyone, everywhere through innovative technology and compassionate care.",
  "accessibility": "Accessibility",
  "accessibility_desc": "Breaking down barriers to ensure healthcare is available to all, regardless of location or circumstance",
  "quality": "Quality Care",
  "quality_desc": "Providing the highest standard of medical expertise with personalized attention",
  
  "our_values": "Our Values",
  "our_values_desc": "The principles that guide every decision we make",
  "patient_first": "Patient First",
  "innovation": "Continuous Innovation",
  "accessibility": "Universal Accessibility",
  "transparency": "Radical Transparency",
  
  "our_services": "Our Comprehensive Services",
  "our_services_desc": "Experience healthcare that comes to you, wherever you are",
  "live_consultations": "Live Doctor Consultations",
  "live_consultations_desc": "Connect with board-certified physicians in real-time for diagnosis and treatment",
  "ai_assistant": "AI Health Assistant",
  "ai_assistant_desc": "24/7 access to our intelligent chatbot for symptom checking and health information",
  "mobile_app": "Mobile Healthcare",
  "mobile_app_desc": "Complete healthcare management through our intuitive mobile application",
  "secure_messaging": "Secure Messaging",
  "secure_messaging_desc": "Private communication with your healthcare providers between visits",
  "global_access": "Global Access",
  "global_access_desc": "Connect with specialists worldwide without geographical constraints",
  "mental_health": "Mental Health Support",
  "mental_health_desc": "Confidential counseling and therapy sessions with licensed professionals",
  
  "patient_satisfaction": "Patient Satisfaction",
  "availability": "Service Availability",
  "patients_served": "Patients Served",
  "medical_professionals": "Medical Professionals",
  
  "our_team": "Meet Our Leadership Team",
  "our_team_desc": "Experts in medicine, technology, and patient experience",
  "dr_sarah": "Dr. Sarah Johnson",
  "medical_director": "Medical Director",
  "dr_ahmed": "Dr. Ahmed Hassan",
  "tech_lead": "Chief Technology Officer",
  "dr_emma": "Dr. Emma Rodriguez",
  "patient_experience": "Director of Patient Experience",
  "dr_mohammed": "Dr. Mohammed Ali",
  "ai_research": "Head of AI Research",
  
  "join_us_today": "Join the Healthcare Revolution",
  "cta_description": "Experience the future of healthcare today. Sign up for free and take control of your health journey.",
  "sign_up_free": "Sign Up Free",
  "learn_more": "Learn More"
},

  "signin": {
    "fields_error": "All fields are required!",
    "email_error": "Please enter a valid email address!",
    "password_length": "Password must be at least 8 characters!",
    "login_falied": "Login failed.",
    "singin_sucess": "Signed in successfully!",
    "something_wrong": "Something went wrong.",

    "coclinic": "CoClinic",
    "headline": "Welcome back! Please sign in to access your account.",
    "email": "Email",
    "email_placeholder": "name@example.com",
    "password": "Password",
    "password_placeholder": "Enter Your Password",
    "button": "Sign In",

    "loading": "Signing In ...",
    "no_account": "Don't have an account?",
    "here": "Sign up here"
  },

  "signup": {
    "fill_all1": "Please fill in all the fields before submitting.",
    "fill_all2": "Please fill in all required fields.",
    "loading": "Signing Up ...",
    "registering_error": "Registration failed.",
    "registering_sucess": "Registration successful! Please verify your email.",
    "specialization": "Specialization",
    "specialization_description": "Enter your medical specialization.",

    "admin_code": "Admin Code",
    "admin_code_description": "Enter the admin verification code.",
    "name_description": "What is your full name ?",
    "password_description": "Enter a strong password to secure your account.",
    "birthdate_description": "Select your birthdate.",
    "gender_description": "What is your gender?",
    "gender": "Gender",
    "select": "Select",
    "go_login": "Go To Login",

    "gender_options": {
      "male": "Male",
      "female": "Female"
    },

    "coclinic": "CoClinic",
    "headline": "Embark on a transformative journey with our AI-powered personalized recovery plans and habit-building strategies.",
    "select_role": "Select Role",
    "role": {
      "patient": "Patient",
      "doctor": "Doctor",
      "admin": "Admin"
    },
    "username": "Username",
    "username_description": "Please enter a unique username for your account.",
    "email": "Email",
    "email_description": "Please enter a valid email address, e.g., name@domain.com.",
    "name": "Name",
    "password": "Password",
    "birthdate": "Birthdate",
    "select_b_date": "Select Birthdate",
    "button": "Sign Up"
  },

  "search": {
    "options": "search options",
    "title": "Search",
    "term": "Search Term:",
    "placeholder": "Search...",
    "type": "Type:",
    "sale": "Sale",
    "offer": "Offer",
    "sort": "Sort:",
    "price_high_low": "Price high to low",
    "price_low_high": "Price low to high",
    "latest": "Latest",
    "oldest": "Oldest",
    "listing_results": "Listing results:",
    "no_listing": "No listing found!",
    "loading": "Loading...",
    "show_more": "Show more"
  },

  "chat": {
    "medical": "Medical Assistant",
    "expected": "Expected data.data to be an array:",
    "error_history": "Error loading chat history:Error loading chat history:",
    "error_parsing": "Error parsing chunk:",
    "chat_error": "Chat error:",

    "how_to_help": "Hello! How can I help you today?",
    "here_to_answer": "I'm here to answer your medical questions with care and expertise",
    "educational_puroses": "Information provided for educational purposes only, not medical advice",
    "assistant": "Medical Assistant",
    "new": "New Chat",
    "powerd_by": "Powered by Gemini - Trusted Medical Answers",
    "type_here": "Type your message here..."
  },

  "footer": {
    "brand": "CoClinic Care",
    "description": "Committed to providing compassionate, personalized healthcare that puts you first. Your wellness journey is our priority, every step of the way.",
    "services": "Services",
    "your_email": "Your email",
    "appointments": "Appointments",
    "ai_consultation": "AI Consultation",
    "emergency_chat": "Emergency Chat",
    "recovery_plans": "Recovery Plans",
    "contact_us": "Contact Us",
    "address": "123 Health Lane, Care City, CA 98765",
    "phone": "(555) 123-4567",
    "email": "care@coclinic.com",
    "health_tips": "Health Tips",
    "subscribe_prompt": "Subscribe to our newsletter for wellness advice and updates",
    "subscribe": "Subscribe",
    "copyright": "© 2024 CoClinic - Compassionate Care for All",
    "privacy_policy": "Privacy Policy",
    "terms_of_service": "Terms of Service",
    "cookies_policy": "Cookies Policy"
  }
}

    },
    ar: {
        translation: {
  "language": {
    "title": "اللغة",
    "arabic": "العربية",
    "english": "الإنجليزية"
  },
  
  "dashboard": {
    "title": "لوحة التحكم",
    "signout": "تسجيل الخروج",
    
    "post": {
      "name": "منشور"
    },
    
    "users": {
      "name": "المستخدمين",
      "total": "إجمالي المستخدمين",
      "recent": "أحدث المستخدمين",
      
      "image": "صورة المستخدم",
      "username": "اسم المستخدم",
      "email": "البريد الإلكتروني",
      "admin": "مدير",
      "doctor": "طبيب",
      "approve": "اعتماد",
      "unapprove": "الغاء الاعتماد",
      "date": "تاريخ الإنشاء",
      "delete": "حذف",
      "more": "عرض المزيد",
      "no_users": "لا يوجد مستخدمين حتى الآن!",
      "delete?": "هل أنت متأكد أنك تريد حذف هذا المستخدم؟",
      "sure_to": "هل أنت متأكد أنك تريد",
      "this": "هذا المستخدم؟",
      "sure_delete": "نعم، أنا متأكد",
      "no_cancel": "لا، إلغاء",
      
      "error": "خطأ في جلب المستخدمين:",
      "error_more": "خطأ في جلب المزيد من المستخدمين:",
      "single_error": "خطأ:",
      
      "unkown": "غير معروف"
    },
    
    "comments": {
      "date": "تاريخ التحديث",
      "content": "محتوى التعليق",
      "no_of_likes": "عدد الإعجابات",
      "post_id": "معرّف المنشور",
      "user_id": "معرّف المستخدم",
      "delete": "حذف",
      "save": "حفظ",
      "cancel": "إلغاء",
      "edit": "تعديل",
      
      "anonymous": "مستخدم مجهول",
      
      "no_comment": "لا يوجد تعليقات حتى الآن!",
      "likes": "إعجابات",
      "name": "التعليقات",
      "total": "إجمالي التعليقات",
      "recent": "أحدث التعليقات",
      "error": "خطأ في جلب التعليقات:",
      "error_more": "خطأ في جلب المزيد من التعليقات:",
      "error_delete": "خطأ في حذف التعليق:",
      "more": "عرض المزيد",
      "empty": "لا يوجد تعليقات حتى الآن!",
      "delete?": "هل أنت متأكد أنك تريد حذف هذا التعليق؟",
      "sure_delete": "نعم، أنا متأكد",
      "no_cancel": "لا، إلغاء",
      
      "unkown": "غير معروف"
    },
    
    "posts": {
      "name": "المنشورات",
      "date": "تاريخ التحديث",
      "image": "صورة المنشور",
      "title": "عنوان المنشور",
      "category": "الفئة",
      "delete": "حذف",
      "edit": "تعديل",
      
      "total": "إجمالي المنشورات",
      "recent": "أحدث المنشورات",
      
      "error": "خطأ في جلب المنشورات:",
      "error_more": "خطأ في جلب المزيد من المنشورات:",
      "unkown": "غير معروف",
      "delete_error": "خطأ في حذف المنشور:",
      "more": "عرض المزيد",
      "no_posts": "لا يوجد منشورات حتى الآن!",
      "delete?": "هل أنت متأكد أنك تريد حذف هذا المنشور؟",
      "sure_delete": "نعم، أنا متأكد",
      "no_cancel": "لا، إلغاء"
    },
    
    "profile": {
      "name": "الملف الشخصي",
      "updating": "جاري التحديث...",
      "update": "تحديث",
      "failed_update": "فشل التحديث.",
      "delete": "حذف الحساب",
      "signout": "تسجيل الخروج",
      "admin": "مدير",
      "user": "مستخدم"
    },
    
    "table": {
      "all": "عرض الكل",
      "error": "خطأ في جلب بيانات لوحة التحكم:"
    },
    
    "card": {
      "last": "الشهر الماضي",
      "all": "عرض الكل",
      "error": "خطأ في جلب بيانات لوحة التحكم:",
      "unkown": "غير معروف"
    }
  },
  
  "general": {
    "loading": "جاري التحميل...",
    "error": "خطأ: "
  },
  
  "verify": {
    "fill_all": "الرجاء ملء جميع الحقول المطلوبة.",
    "failed": "فشل التحقق.",
    "coclinic": "CoClinic",
    "email_confirmation_code": "الرجاء إدخال البريد الإلكتروني ورمز التأكيد الذي تلقيته للتحقق من حسابك.",
    "email": "البريد الإلكتروني",
    "email_placeholder": "you@example.com",
    "confirmation_code": "رمز التأكيد",
    "confirmation_code_placeholder": "أدخل الرمز المرسل إلى بريدك",
    "verify_email": "تحقق من البريد",
    "success": "تم التحقق من بريدك الإلكتروني. يمكنك الآن تسجيل الدخول."
  },
  
  "header": {
    "create_book": "انشاء كتاب",
    "find": "ابحث عن الأطباء والخدمات ..",
    "home": "الرئيسية",
    "ai_chat": "الذكاء الاصطناعي",
    "live_chat": "الدردشة المباشرة",
    "appointments": "المواعيد",
    "resources": "الموارد",
    "about": " من نحن",
    "co": "كو",
    "clinic": "كلينيك",
    "slogan": "رعاية رحيمة، في أي وقت",
    "my_profile": "ملفي الشخصي",
    "settings": "الإعدادات",
    "account_settings": "إعدادات الحساب",
    "sign_out": "تسجيل الخروج",
    "sign_up": "إنشاء حساب",
    "sign_in": "تسجيل الدخول",
    "dashboard": "لوحة التحكم"
  },
  
  "home": {
    "patient_served": "500 ألف+ مريض تم خدمتهم",
    "join_growing": "انضم إلى مجتمعنا المتنامي",
    
    "headline": "شريكك الموثوق في",
    "digital": "الرعاية الصحية الرقمية",
    "description": "جرب رعاية رحيمة من خلال منصتنا المتكاملة التي توفر اتصالًا مباشرًا مع الأطباء، واستشارات مدعومة بالذكاء الاصطناعي، وإدارة سلسة للرعاية الصحية.",
    "get_started": "ابدأ الآن",
    "learn_more": "تعلم المزيد",
    "hipaa": "متوافق مع HIPAA",
    "rated": "خدمة بتقييم 5 نجوم"
  },
  
  "featured": {
    "title": "دعم شامل لرحلتك نحو",
    "r_journey": " التعافي",
    "description": "مكن تعافيك مع مجموعة الأدوات والموارد المتكاملة المصممة من قبل متخصصي الرعاية الصحية.",
    
    "ai_assistant": {
      "title": "المساعد بالذكاء الاصطناعي",
      "description": "احصل على دعم على مدار الساعة مع مساعدنا الذكي وتفاعل محادثة سلسة.",
      "benefits": "عزز تجربتك مع ردود فورية ومساعدة مخصصة.",
      "cta": "تحدث مع الذكاء الاصطناعي"
    },
    
    "get_doctor": {
      "title": "احصل على طبيب",
      "description": "ابحث واحجز وقيم الأطباء للعثور على الدعم المناسب لرحلتك نحو التعافي.",
      "benefits": "احصل على خيارات علاجية مخصصة وعلاقة علاجية هادفة.",
      "cta": "ابحث عن طبيب"
    },
    
    "resources": {
      "title": "موارد تعليمية",
      "description": "احصل على مكتبة شاملة من المقالات والفيديوهات والمواد حول التعافي من الإدمان.",
      "benefits": "وسع معرفتك واحصل على رؤى لدعم رحلتك نحو التعافي."
    },
    
    "recovery": {
      "title": "تعافي مخصص",
      "description": "خصص رحلتك نحو التعافي بناءً على تقييمات واحتياجات فردية.",
      "benefits": "احصل على خطط تعافي مخصصة ودعم لتحقيق صحة طويلة الأمد.",
      "cta": "عرض خطة التعافي"
    },
    
    "tracker": {
      "title": "متتبع العادات",
      "description": "راقب العادات، حدد المحفزات، وتتبع التقدم للحفاظ على سلوكيات إيجابية.",
      "benefits": "حدد أهدافًا وشاهد تحسنًا في العادات اليومية لدعم أهداف تعافيك.",
      "cta": "عرض متتبع العادات"
    },
    
    "quotes": {
      "title": "اقتباسات ملهمة",
      "description": "\"رحلة الألف ميل تبدأ بخطوة واحدة.\"",
      "cta": "استكشف المزيد من الاقتباسات",
      "benefits": "ابحث عن التحفيز والتشجيع للبقاء قويًا في رحلتك نحو التعافي."
    },
    
    "coming_soon": {
      "title": "قريبًا: ميزات دعم محسنة",
      "description": "نحن نتطور باستمرار لخدمة احتياجات تعافيك بشكل أفضل",
      
      "dashboard": {
        "title": "لوحة التحكم",
        "description": "تابع تقدمك، حدد أهدافًا، وتصور البيانات للتحسن المستمر.",
        "benefits": "راقب الاتجاهات واحتفل بالإنجازات في رحلتك نحو التعافي.",
        "cta": "عرض لوحة التحكم",
        "soon": "قريبًا"
      },
      
      "community": {
        "title": "دعم المجتمع",
        "description": "تواصل مع آخرين في رحلة مماثلة، شارك التجارب، وابحث عن التشجيع.",
        "benefits": "ابن شبكة دعم واحصل على موارد تلهم النمو والتعافي.",
        "cta": "انضم إلى المجتمع"
      },
      
      "crisis": {
        "title": "دعم الأزمات",
        "description": "احصل على خيارات اتصال طارئة ودردشة فورية مع مستشارين مرخصين.",
        "benefits": "احصل على مساعدة رحيمة وإرشادات خلال الأوقات الحرجة.",
        "cta": "اتصل بدعم الأزمات"
      }
    }
  },
  
  "appointment": {

    "empty": {
    "patient_title": "لا توجد مواعيد حالياً",
    "patient_description": "لم تقم بحجز أي استشارات بعد. عند الحجز، ستظهر هنا.",
    "doctor_title": "لا توجد استشارات مجدولة",
    "doctor_description": "لم يقم أي مريض بحجز موعد معك بعد. ترقب!",
  },

    "confirmation": {
      "status_updated": "تم تحديث الحالة بنجاح",
      "status_failed": "فشل تحديث الحالة",
      "app_cancelled": "تم إلغاء الموعد",
      "app_failed": "فشل الموعد",
      "loading": "جاري تحميل المواعيد...",
      "upcoming": "المواعيد القادمة",
      "no_appointments": "لا توجد مواعيد",
      "time": "30 دقيقة",
      "my": "مواعيدي",
      "your": "مواعيدك",
      "cancel": "إلغاء",
      "confirm": "تأكيد",
      "decline": "رفض",
      
      "success": "تم تحميل الموعد بنجاح",
      "not_found": "لم يتم العثور على الموعد",
      "failed": "فشل جلب الموعد",
      "title": "تم تأكيد الموعد!",
      "with": "موعدك مع",
      "date": "التاريخ والوقت",
      "duration": "المدة",
      "notes": "ملاحظات",
      "status": "الحالة",
      "view_appointments": "عرض جميع المواعيد"
    },
    
    "form": {
      "success": "تم حجز الموعد بنجاح!",
      "failed": "فشل الحجز",
      "sucess_update": "تم تحديث الحالة بنجاح",
      "cancelled": "ملغى",
      "loading": "جاري تحميل المواعيد...",
      "new": "حجز موعد جديد",
      "doctor": "طبيب",
      "date&time": "التاريخ والوقت",
      "notes": "ملاحظات",
      "confirm": "تأكيد الحجز",
      "upcoming": "المواعيد القادمة",
      "no_appointments": "لا توجد مواعيد",
      "cancel": "إلغاء",
      "single_confirm": "تأكيد",
      "decline": "رفض",
      "hide": "إخفاء نموذج الحجز",
      "book": "حجز موعد جديد"
    },
    
    "general": {
      "date": "التاريخ:",
      "from": "من:",
      "note": "ملاحظة:",
      "to": "إلى:",
      "mine": "مواعيدي"
    },
    
    "status": {
      "completed": "مكتمل",
      "confirmed": "مؤكد",
      "cancelled": "ملغى",
      "pending": "قيد الانتظار"
    },
    
    "patient": {
      "cancel_consultaion": "إلغاء الاستشارة",
      "consultation": "استشارة المريض"
    },
    
    "book": {
      "form": "حجز موعد جديد",
      "hide_form": "إخفاء نموذج الحجز",
      "appointment_1": "حجز موعد",
      "select_doctor": "اختر طبيبًا",
      "loading": "جاري تحميل الأطباء...",
      "please_select": "الرجاء اختيار طبيب",
      "date_time": "التاريخ والوقت",
      "notes": "ملاحظات",
      "appointment_2": "حجز الموعد",
      "processing": "جاري حجز موعد ..."
    }
  },
  
  "book": {
  "loading": "جارٍ التحميل...",
  "wrong": "حدث خطأ ما!",
  "copied": "تم نسخ الرابط!",
  "off": "خصم",
  "description": "الوصف",

  "title": "العنوان",
  "author": "المؤلف",
  "offer": "عرض",
  "edit": "تعديل الكتاب",
  "regular_price": "السعر الأساسي",
  "discounted_price": "السعر بعد الخصم",
  "current_images": "الصور الحالية",
  "image_urls": "روابط الصور",
  "image_placeholder": "أدخل روابط الصور",
  "add_image": "إضافة صورة",
  "saving": "جارٍ الحفظ...",
  "save_changes": "حفظ التعديلات",
  "book_images": "صور الكتاب"
}
,
  
  "books": {
    "post_book": "نشر كتاب",
    "add_image": "إضافة صورة",
    "discount_price": "سعر الخصم",
    
    "allowed_only": "يُسمح فقط بملفات JPEG أو JPG أو PNG أو GIF بحجم يصل إلى 5MB",
    "number_of_allowed": "يمكنك تحميل ما يصل إلى 5 صور لكل قائمة",
    "at_least": "يجب تحميل صورة واحدة على الأقل",
    "lower_or_equal": "يجب أن يكون سعر الخصم أقل من السعر العادي",
    "created": "تم إنشاء الكتاب بنجاح",
    "failed_to_create": "فشل إنشاء الكتاب. الرجاء المحاولة مرة أخرى.",
    
    "create": "نشر كتاب",
    "title": "العنوان",
    "description": "الوصف",
    "author": "المؤلف",
    "offer": "عرض",
    "regular_price": "السعر العادي",
    "discounted_price": "سعر الخصم",
    "images": "الصور:",
    "first_image": "ستكون الصورة الأولى هي الغلاف",
    "uploaded_images": "الصور المرفوعة:",
    "delete": "حذف",
    "select_images": "الصور المحددة:",
    "remove": "إزالة",
    "creating": "جاري الإنشاء...",
    
    "explore": "استكشف مجموعتنا من الكتب",
    "discover": "اكتشف عناوين مختارة بعناية بصفقات لا تُقاوم. سواء كنت تبحث عن إلهام أو مغامرة، ستجد كتابك المفضل التالي هنا.",
    "browse": "ابدأ التصفح",
    "today_offer": "العروض الخاصة اليوم",
    "loading": "جاري تحميل العروض...",
    "featured": "كتب مميزة",
    "more": "عرض المزيد",
    "join_community": "انضم إلى مجتمع القراءة لدينا",
    "subscribe_benefits": "اشترك للحصول على تحديثات حول الوافدين الجدد، محادثات المؤلفين، وخصومات حصرية.",
    "subscribe_now": "اشترك الآن",
    "failed": "فشل نشر التعليق.",
    "error": "حدث خطأ أثناء نشر التعليق.",
    
    "comment": {
      "failed": "فشل جلب التعليقات:",
      "error": "خطأ في جلب التعليقات:",
      "length": "يجب أن يكون طول التعليق بين 1 و200 حرف.",
      "name": "التعليقات",
      "as": "مسجل الدخول كـ:",
      "must": "يجب تسجيل الدخول لإضافة تعليق.",
      "sign": "تسجيل الدخول",
      "no_comments": "لا توجد تعليقات بعد!",
      "sure": "هل أنت متأكد أنك تريد حذف هذا التعليق؟",
      "yes": "نعم، أنا متأكد",
      "no": "لا، إلغاء",
      "error_like": "خطأ في الإعجاب بالتعليق:",
      "error_delete": "خطأ في حذف التعليق:",
      "submit": "إرسال",
      "submitting": "جاري الإرسال",
      "unkown": "غير معروف",
      "chars_remaining": "حرف متبقي"
    }
  },
  
  "live_chat": {
    "live": "الدردشة المباشرة",
    "explore": "استكشف المستخدمين لبدء محادثة معهم.",
    "image": "صورة",
    "video": "فيديو",
    "add": "إضافة صديق",
    "chat": "دردشة",
    "loading": "جاري التحميل...",
    "online": "متصل",
    "offline": "غير متصل",
    "no_user": "لم يتم العثور على مستخدم!",
    "search": "ابحث عن مستخدم بالاسم، البريد الإلكتروني....",
    "type_here": "اكتب رسالتك هنا..."
  },
  
  "profile": {
    "profile": "الملف الشخصي",
    "username": "اسم المستخدم",
    "email": "البريد الإلكتروني",
    "password": "كلمة المرور",
    "update": "تحديث",
    "delete": "حذف الحساب",
    "signout": "تسجيل الخروج",
    "please_select": "الرجاء اختيار ملف صورة صالح.",
    "update_fialed": "فشل التحديث.",
    "loading": "جاري التحميل..."
  },
  
  "about": {
  "co": "عن CoClinic",
  "description1": "CoClinic هي منصة رعاية صحية عن بُعد مبتكرة مصممة لتقديم خدمات رعاية صحية سلسة من خلال استشارات مباشرة ودعم تفاعلي بالذكاء الاصطناعي. نركز على تعزيز تجربة المريض من خلال تقديم طرق متعددة للتفاعل، بما في ذلك التواصل المباشر مع الأطباء وروبوتات الدردشة بالذكاء الاصطناعي للاستشارات الأولية.",
  "description2": "مهمتنا هي سد الفجوة بين المرضى ومقدمي الرعاية الصحية، وجعل الرعاية الصحية في متناول الجميع ومريحة. سواء كنت بحاجة إلى استشارة سريعة أو مشورة طبية متعمقة، CoClinic هنا لدعمك في كل خطوة.",
  
  "our_mission": "مهمتنا",
  "our_mission_content": "جعل الرعاية الصحية الجيدة في متناول الجميع في كل مكان من خلال التكنولوجيا المبتكرة والرعاية الرحيمة.",
  "accessibility": "سهولة الوصول",
  "accessibility_desc": "كسر الحواجز لضمان توفر الرعاية الصحية للجميع، بغض النظر عن الموقع أو الظروف",
  "quality": "رعاية عالية الجودة",
  "quality_desc": "توفير أعلى مستوى من الخبرة الطبية مع اهتمام شخصي",
  
  "our_values": "قيمنا",
  "our_values_desc": "المبادئ التي توجه كل قرار نتخذه",
  "patient_first": "المريض أولاً",
  "innovation": "الابتكار المستمر",
  "accessibility": "إمكانية الوصول العالمية",
  "transparency": "الشفافية الجذرية",
  
  "our_services": "خدماتنا الشاملة",
  "our_services_desc": "جرب الرعاية الصحية التي تأتي إليك، أينما كنت",
  "live_consultations": "استشارات طبية مباشرة",
  "live_consultations_desc": "تواصل مع أطباء معتمدين في الوقت الفعلي للتشخيص والعلاج",
  "ai_assistant": "مساعد صحي بالذكاء الاصطناعي",
  "ai_assistant_desc": "وصول 24/7 إلى روبوت المحادثات الذكي للتحقق من الأعراض والمعلومات الصحية",
  "mobile_app": "الرعاية الصحية عبر الهاتف المحمول",
  "mobile_app_desc": "إدارة كاملة للرعاية الصحية من خلال تطبيقنا الجوال البديهي",
  "secure_messaging": "المراسلة الآمنة",
  "secure_messaging_desc": "تواصل خاص مع مقدمي الرعاية الصحية بين الزيارات",
  "global_access": "الوصول العالمي",
  "global_access_desc": "تواصل مع المتخصصين في جميع أنحاء العالم دون قيود جغرافية",
  "mental_health": "دعم الصحة النفسية",
  "mental_health_desc": "جلسات إرشاد وعلاج سرية مع محترفين مرخصين",
  
  "patient_satisfaction": "رضا المرضى",
  "availability": "توافر الخدمة",
  "patients_served": "المرضى المخدومين",
  "medical_professionals": "المحترفون الطبيون",
  
  "our_team": "تعرف على فريق القيادة لدينا",
  "our_team_desc": "خبراء في الطب والتكنولوجيا وتجربة المريض",
  "dr_sarah": "الدكتورة سارة جونسون",
  "medical_director": "المديرة الطبية",
  "dr_ahmed": "الدكتور أحمد حسن",
  "tech_lead": "مدير التكنولوجيا",
  "dr_emma": "الدكتورة إيما رودريغيز",
  "patient_experience": "مديرة تجربة المريض",
  "dr_mohammed": "الدكتور محمد علي",
  "ai_research": "رئيس أبحاث الذكاء الاصطناعي",
  
  "join_us_today": "انضم إلى ثورة الرعاية الصحية",
  "cta_description": "جرب مستقبل الرعاية الصحية اليوم. سجل مجانًا وكن مسيطرًا على رحلتك الصحية.",
  "sign_up_free": "سجل مجانًا",
  "learn_more": "تعلم المزيد"
},
  
  "signin": {
    "fields_error": "جميع الحقول مطلوبة!",
    "email_error": "الرجاء إدخال عنوان بريد إلكتروني صالح!",
    "password_length": "يجب أن تكون كلمة المرور 8 أحرف على الأقل!",
    "login_falied": "فشل تسجيل الدخول.",
    "singin_sucess": "تم تسجيل الدخول بنجاح!",
    "something_wrong": "حدث خطأ ما.",
    
    "coclinic": "CoClinic",
    "headline": "مرحبًا بعودتك! الرجاء تسجيل الدخول للوصول إلى حسابك.",
    "email": "البريد الإلكتروني",
    "email_placeholder": "name@example.com",
    "password": "كلمة المرور",
    "password_placeholder": "أدخل كلمة المرور الخاصة بك",
    "button": "تسجيل الدخول",
    
    "loading": "جاري تسجيل الدخول ...",
    "no_account": "ليس لديك حساب؟",
    "here": "سجل هنا"
  },
  
  "signup": {
    "fill_all1": "الرجاء ملء جميع الحقول قبل الإرسال.",
    "fill_all2": "الرجاء ملء جميع الحقول المطلوبة.",
    "loading": "جاري التسجيل ...",
    "registering_error": "فشل التسجيل.",
    "registering_sucess": "تم التسجيل بنجاح! الرجاء التحقق من بريدك الإلكتروني.",
    "specialization": "التخصص",
    "specialization_description": "أدخل تخصصك الطبي.",
    
    "admin_code": "رمز المدير",
    "admin_code_description": "أدخل رمز التحقق للمدير.",
    "name_description": "ما هو اسمك الكامل؟",
    "password_description": "أدخل كلمة مرور قوية لتأمين حسابك.",
    "birthdate_description": "حدد تاريخ ميلادك.",
    "gender_description": "ما هو جنسك؟",
    "gender": "الجنس",
    "select": "اختر",
    "go_login": "انتقل إلى تسجيل الدخول",
    
    "gender_options": {
      "male": "ذكر",
      "female": "أنثى"
    },
    
    "coclinic": "CoClinic",
    "headline": "انطلق في رحلة تحويلية مع خططنا المخصصة للتعافي المدعومة بالذكاء الاصطناعي واستراتيجيات بناء العادات.",
    "select_role": "اختر الدور",
    "role": {
      "patient": "مريض",
      "doctor": "طبيب",
      "admin": "مدير"
    },
    "username": "اسم المستخدم",
    "username_description": "الرجاء إدخال اسم مستخدم فريد لحسابك.",
    "email": "البريد الإلكتروني",
    "email_description": "الرجاء إدخال عنوان بريد إلكتروني صالح، مثل name@domain.com.",
    "name": "الاسم",
    "password": "كلمة المرور",
    "birthdate": "تاريخ الميلاد",
    "select_b_date": "حدد تاريخ الميلاد",
    "button": "إنشاء حساب"
  },
  
  "search": {
    "options": "خيارات البحث",
    "title": "بحث",
    "term": "كلمة البحث:",
    "placeholder": "ابحث...",
    "type": "النوع:",
    "sale": "بيع",
    "offer": "عرض",
    "sort": "ترتيب:",
    "price_high_low": "السعر من الأعلى إلى الأدنى",
    "price_low_high": "السعر من الأدنى إلى الأعلى",
    "latest": "الأحدث",
    "oldest": "الأقدم",
    "listing_results": "نتائج القائمة:",
    "no_listing": "لم يتم العثور على قائمة!",
    "loading": "جارٍ التحميل...",
    "show_more": "عرض المزيد"
},
  "chat": {
    "medical": "المساعد الطبي",
    "expected": "كان من المتوقع أن تكون data.data مصفوفة:",
    "error_history": "خطأ في تحميل سجل الدردشة:",
    "error_parsing": "خطأ في تحليل الجزء:",
    "chat_error": "خطأ في الدردشة:",
    
    "how_to_help": "مرحبًا! كيف يمكنني مساعدتك اليوم؟",
    "here_to_answer": "أنا هنا للإجابة على استفساراتك الطبية بعناية وخبرة",
    "educational_puroses": "المعلومات المقدمة لأغراض تعليمية فقط، وليست نصيحة طبية",
    "assistant": "المساعد الطبي",
    "new": "دردشة جديدة",
    "powerd_by": "مدعوم من جيميني - إجابات طبية موثوقة",
    "type_here": "اكتب رسالتك هنا..."
  },
  
  "footer": {
    "brand": "رعاية CoClinic",
    "description": "ملتزمون بتقديم رعاية صحية رحيمة ومخصصة تضعك في المقام الأول. رحلتك نحو الصحة هي أولويتنا، في كل خطوة.",
    "services": "الخدمات",
    "your_email": "بريدك الإلكتروني",
    "appointments": "المواعيد",
    "ai_consultation": "استشارة الذكاء الاصطناعي",
    "emergency_chat": "دردشة الطوارئ",
    "recovery_plans": "خطط التعافي",
    "contact_us": "اتصل بنا",
    "address": "123 شارع الصحة، مدينة العناية، كاليفورنيا 98765",
    "phone": "(555) 123-4567",
    "email": "care@coclinic.com",
    "health_tips": "نصائح صحية",
    "subscribe_prompt": "اشترك في نشرتنا الإخبارية للحصول على نصائح صحية وتحديثات",
    "subscribe": "اشترك",
    "copyright": "© 2024 CoClinic - رعاية رحيمة للجميع",
    "privacy_policy": "سياسة الخصوصية",
    "terms_of_service": "شروط الخدمة",
    "cookies_policy": "سياسة ملفات تعريف الارتباط"
  }
}
    }
};

const savedLanguage = localStorage.getItem('lang');


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en', // fallback language in case translation is missing
    interpolation: {
      escapeValue: false, // React already does escaping
    }
  });
export default i18n;
