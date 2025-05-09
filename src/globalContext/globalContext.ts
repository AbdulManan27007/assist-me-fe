import { getAccessToken } from "@/lib/getAccessToken";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum Location {
  Sydney = "Sydney",
  Melbourne = "Melbourne",
  Brisbane = "Brisbane",
}

export enum SortingMethod {
  MOST_RECENT = "Most recent",
  LEAST_RECENT = "Least recent",
}

export enum UserRole {
  Household = "household",
  Tradie = "tradie",
  Admin = "admin",
}

export enum HouseholdType {
  Apartment = "Apartment",
  House = "House",
}

export enum OwnershipStatus {
  Own = "Own",
  Rent = "Rent",
}

export enum Category {
  Accounting = "Accounting",
  Admin = "Admin",
  Alterations = "Alterations",
  Appliances = "Appliances",
  Architect = "Architect",
  Assembly = "Assembly",
  AudioVisual = "Audio Visual",
  AutoElectrician = "Auto Electrician",
  Bricklayer = "Bricklayer",
  BuildingConstruction = "Building & Construction",
  Business = "Business",
  CarWash = "Car Wash",
  Carpentry = "Carpentry",
  CarpetCleaning = "Carpet Cleaning",
  Catering = "Catering",
}

export enum ServiceType {
  InPerson = "In Person",
  Remote = "Remote",
  Hire = "Hire",
}

export enum InPerson {
  Electrician = "Electrician",
  Alterations = "Alterations",
  AutoElectrician = "Auto Electrician",
  CarpetCleaning = "Carpet Cleaning",
  Catering = "Catering",
  Cleaning = "Cleaning",
  Cook = "Cook",
  Gardener = "Gardener",
  HouseKeeper = "House Keeper",
  Painter = "Painter",
  PestControl = "Pest Control",
  Plumber = "Plumber",
  Security = "Security Guard",
  Tailor = "Tailor",
}
export enum Hire {
  HireTaxi = "Hire a Taxi",
}
export enum Remote {
  VirtualAssistant = "Virtual Assistant",
  CustomerSupport = "Customer Support",
  DataEntry = "Data Entry",
  GraphicDesign = "Graphic Design",
  WebDevelopment = "Web Development",
  MobileAppDevelopment = "Mobile App Development",
  SoftwareEngineering = "Software Engineering",
  OnlineTutoring = "Online Tutoring",
  DigitalMarketing = "Digital Marketing",
  SEOExpert = "SEO Expert",
  SocialMediaManager = "Social Media Manager",
  ContentWriting = "Content Writing",
  Copywriting = "Copywriting",
  UIUXDesign = "UI/UX Design",
  ITSupport = "IT Support",
  VideoEditing = "Video Editing",
  Translation = "Translation",
  Transcription = "Transcription",
  Accounting = "Accounting",
  LegalConsultation = "Legal Consultation",
}

export enum VehicleType {
  Sedan = "Sedan",
  SUV = "SUV",
  Hatchback = "Hatchback",
  Coupe = "Coupe",
  Convertible = "Convertible",
  Minivan = "Minivan",
  PickupTruck = "Pickup Truck",
  Van = "Van",
  Bus = "Bus",
  Other = "Other",
}

export enum VehicleCompany {
  Toyota = "Toyota",
  Honda = "Honda",
  Suzuki = "Suzuki",
  Hyundai = "Hyundai",
  Kia = "Kia",
  Ford = "Ford",
  Nissan = "Nissan",
  BMW = "BMW",
  Mercedes = "Mercedes",
  Chevrolet = "Chevrolet",
  Other = "Other",
}

export enum PriceType {
  Fixed = "Fixed Rate",
  Hourly = "Hourly Rate",
}

export interface IUser {
  fullname?: string;
  profile?: string;
  bio?: string;
  email: string;
  contactnumber?: string;
  weburl?: string;
  country?: string;
  city?: string;
  address?: string;
  experiance?: string;
  certified?: string;

  category?: string;
  title?: string;
  description?: string;
  price?: string;
  price_description?: string;
  price_type?: string;
  id: number;
  name: string;
  lastName?: string;
  tag?: string;
  badgeText?: string;
  badgeColor?: string;
  avatar: string;
  role: UserRole;
  created_at: string; // Stores the date and time when the user is created
  tradieExperience?: string;
  notifications: {
    id: number;
    title: string;
    description: string;
    date: string;
    read: boolean;
  }[];
  categoriesHired: {
    id: number;
    title: string;
  }[];
  location: string;
  tradieReviews: {
    id: number;
    rating: number;
    date: string;
    reviewer: Pick<IUser, "name" | "avatar" | "tag" | "role">;
    description: string;
  }[];
  householdsReviews: {
    id: number;
    rating: number;
    date: string;
    reviewer: Pick<IUser, "name" | "avatar" | "tag" | "role">;
    description: string;
  }[];
  type: HouseholdType;
  ownershipStatus: OwnershipStatus;
  listings: {
    fullname?: string;
    profile?: string;
    bio?: string;
    latitude?: number;
    longitude?: number;
    contactnumber?: string;
    weburl?: string;
    country?: string;
    city?: string;
    address?: string;
    experience?: number;
    certified?: string;

    id: number;
    title: string;
    email: string;
    phone: string;
    category: string;
    price_type: string;
    description: string;
    price_description: string;
    price: number;
    images: string[];
    priceType: string;
    start_date: string;
    end_date: string;
    duration: string;
    badgeText: string;
    badgeColor: string;
    status: string;
    hiredTradie: Partial<IUser>;
    location: string;
    completed: boolean;
    nextTask: IUser["tasks"][number];
    keywords: string[];
    tasks: Partial<IUser["tasks"][number]>[];
  }[];
  services: {
    id: number;
    title: string;
    category: string;
    service_type: string;
    tags: string[];
    images: string[];
    vehicles: string[];

    email: string;
    phone: string;
    price_type: string;
    description: string;
    price_description: string;
    price: number;
    priceType: string;
    start_date: string;
    end_date: string;
    duration: string;
    status: string;
    hiredTradie: Partial<IUser>;
    location: string;
    completed: boolean;
    nextTask: IUser["tasks"][number];
    keywords: string[];
    tasks: Partial<IUser["tasks"][number]>[];
  }[];
  orders: {
    id: number;
    title: string;
    category: string;
    description: string;
    price: number;
    priceType: string;
    start_date: string;
    end_date: string;
    location: string;
    completed: boolean;
  }[];
  tasks: {
    id: number;
    title: string;
    description: string;
    status: string;
    date: string;
    category: string;
    color: string;
  }[];
  messages: {
    id: number;
    title: string;
    date: string;
  }[];
  activities: {
    name: string;
    date: string;
  }[];
  notificationSettings: {
    title: string;
    email: boolean;
    push: boolean;
  }[];
  privacySettings: {
    title: string;
    isActive: boolean;
  }[];
}

const notificationSettings = [
  {
    title: "Notification Setting 1",
    email: false,
    push: true,
  },
  {
    title: "Notification Setting 2",
    email: true,
    push: false,
  },
  {
    title: "Notification Setting 3",
    email: true,
    push: true,
  },
  {
    title: "Notification Setting 4",
    email: false,
    push: true,
  },
];

const tasks: IUser["tasks"] = ["#202125", "#FF7125", "#DC3545"].map(
  (color, id) => ({
    id,
    title: `Task ${id + 1}`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sem leo, suscipit eget elit porttitor, volutpat consequat turpis. In interdum mauris et urna maximus, sed tincidunt nulla porta. Maecenas congue risus enim. Quisque egestas augue sem, nec egestas leo mattis ut. Phasellus non sem eu massa finibus volutpat. Vestibulum condimentum augue odio, in dapibus erat vehicula ut. Praesent ac massa at urna dignissim iaculis egestas ut felis. Nullam pharetra, lorem non congue fringilla, nisl ex ullamcorper nibh, nec vehicula nulla libero id dui. Pellentesque bibendum pulvinar tempor. Fusce sodales tincidunt ex, non aliquet arcu consectetur posuere. Mauris suscipit auctor tempor. Phasellus a finibus felis, vel porta nibh. Ut laoreet purus sed enim feugiat, non bibendum nunc semper. Cras aliquam velit in tincidunt pulvinar. Morbi vitae dictum nibh. Sed viverra nunc sit amet libero tincidunt euismod.`,
    status: "open",
    date: new Date(Date.now() + id * 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Accounting",
    color,
  })
);

const listings: IUser["listings"] = Array.from({ length: 12 }, (_, id) => ({
  id,
  title: "New Listing",
  email: "john.doe@example.com",
  phone: "0400000000",
  price_type: "Default Package",
  price_description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sem leo, suscipit eget elit porttitor, volutpat consequat turpis. In interdum mauris et urna maximus, sed tincidunt nulla porta. Maecenas congue risus enim. Quisque egestas augue sem, nec egestas leo mattis ut...",
  category: "Accounting",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sem leo, suscipit eget elit porttitor, volutpat consequat turpis. In interdum mauris et urna maximus, sed tincidunt nulla porta...",
  price: 50,
  images: [
    "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
  ],
  priceType: "Fixed", // Ensure it's a string if required
  start_date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  duration: "10 days",
  status: "open",
  hiredTradie: {
    name: "Jane Doe",
    avatar:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    tag: "janedoe",
  },
  location: "Sydney",
  completed: id > 1,
  nextTask: tasks[0],
  keywords: ["Accounting", "Finance", "Tax"],
  tasks, // Ensure correct type
  badgeText: "New", // Add required property
  badgeColor: "blue", // Add required property
}));

const tradieReviews: IUser["tradieReviews"] = Array.from(
  { length: 10 },
  (_, id) => ({
    id,
    rating: 5,
    date: new Date(Date.now() - id * 24 * 60 * 60 * 1000).toISOString(),
    reviewer: {
      name: "Jane Doe",
      avatar:
        "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      tag: "janedoe",
      role: UserRole.Tradie,
    },
    description: "Great guy and amazing client to work with!",
  })
);

const householdsReviews: IUser["householdsReviews"] = Array.from(
  { length: 10 },
  (_, id) => ({
    id,
    rating: 5,
    date: new Date(Date.now() - id * 24 * 60 * 60 * 1000).toISOString(),
    reviewer: {
      name: "Jane Doe",
      avatar:
        "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      tag: "janedoe",
      role: UserRole.Tradie,
    },
    description: "Great guy and amazing client to work with!",
  })
);

const messages: IUser["messages"] = Array.from({ length: 10 }, (_, id) => ({
  id,
  title: "New Message",
  date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
}));

const categoriesHired: IUser["categoriesHired"] = Object.values(Category).map(
  (title, id) => ({ id, title })
);

const notifications: IUser["notifications"] = Array.from({
  length: 3,
}).map((_, id) => ({
  id,
  title: "Notification Title",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sem leo, suscipit eget elit porttitor, volutpat consequat turpis.",
  date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  read: false,
}));

const activities: IUser["activities"] = [
  {
    name: "Login on Chrome",
    date: "01.01.2024 09:00:00",
  },
  {
    name: "Applied for listing",
    date: "01.01.2024 09:00:00",
  },
  {
    name: "Login on Chrome",
    date: "01.01.2024 09:00:00",
  },
];

const privacySettings: IUser["privacySettings"] = [
  {
    title: "Privacy Setting 1",
    isActive: true,
  },
  {
    title: "Privacy Setting 2",
    isActive: true,
  },
  {
    title: "Privacy Setting 3",
    isActive: true,
  },
];

const orders = Array.from({ length: 18 }, (_, id) => ({
  id,
  title: "New Order",
  category: "Accounting",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sem leo, suscipit eget elit porttitor, volutpat consequat turpis. In interdum mauris et urna maximus, sed tincidunt nulla porta. Maecenas congue risus enim. Quisque egestas augue sem, nec egestas leo mattis ut. Phasellus non sem eu massa finibus volutpat. Vestibulum condimentum augue odio, in dapibus erat vehicula ut.  Praesent ac massa at urna dignissim iaculis egestas ut felis. Nullam pharetra, lorem non congue fringilla, nisl ex ullamcorper nibh, nec vehicula nulla libero id dui. Pellentesque bibendum pulvinar tempor. Fusce sodales tincidunt ex, non aliquet arcu consectetur posuere. Mauris suscipit auctor tempor. Phasellus a finibus felis, vel porta nibh. Ut laoreet purus sed enim feugiat, non bibendum nunc semper. Cras aliquam velit in tincidunt pulvinar. Morbi vitae dictum nibh.  Sed viverra nunc sit amet libero tincidunt euismod.",
  price: 50,
  priceType: "Fixed Rate",
  start_date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  location: "Sydney",
  completed: id > 2,
}));

export const MOCK_USER: IUser = {
  id: 0,
  name: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  avatar:
    "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
  tag: "johndoe",
  tradieExperience:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sem leo, suscipit eget elit porttitor, volutpat consequat turpis. In interdum mauris et urna maximus, sed tincidunt nulla porta. Maecenas congue risus enim. Quisque egestas augue sem, nec egestas leo mattis ut. Phasellus non sem eu massa finibus volutpat. Vestibulum condimentum augue odio, in dapibus erat vehicula ut. \n\nPraesent ac massa at urna dignissim iaculis egestas ut felis. Nullam pharetra, lorem non congue fringilla, nisl ex ullamcorper nibh, nec vehicula nulla libero id dui. Pellentesque bibendum pulvinar tempor. Fusce sodales tincidunt ex, non aliquet arcu consectetur posuere. Mauris suscipit auctor tempor. Phasellus a finibus felis, vel porta nibh. Ut laoreet purus sed enim feugiat, non bibendum nunc semper. Cras aliquam velit in tincidunt pulvinar. Morbi vitae dictum nibh. \n\nSed viverra nunc sit amet libero tincidunt euismod.",
  role: UserRole.Tradie,
  // role: UserRole.Household,
  created_at: "null", // Stores the date and time when the user is created
  notifications,
  categoriesHired,
  location: "Sydney",
  tradieReviews,
  householdsReviews,
  type: HouseholdType.Apartment,
  ownershipStatus: OwnershipStatus.Own,
  listings,
  orders,
  tasks,
  messages,
  activities,
  notificationSettings,
  privacySettings,
  services: [],
};

export const MOCK_TRADIES = Array.from(
  { length: 500 },
  (_, index) => MOCK_USER
);

export const MOCK_LISTINGS: IUser["listings"] = Array.from(
  { length: 500 },
  (_, index) => ({
    id: index + 1,
    title: `Listing ${index + 1}`,
    email: `janedoe${index + 1}@example.com`,
    phone: `+1234567890${index}`,
    price_type: "Default Package",
    category:
      Object.values(Category)[
        Math.floor(Math.random() * Object.values(Category).length)
      ],
    price_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: Math.floor(Math.random() * 901) + 100,
    s_price: Math.floor(Math.random() * 901) + 100,
    images: [
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    ],
    priceType: Math.random() > 0.5 ? "Fixed Rate" : "Hourly Rate",
    start_date: new Date(
      Date.now() - Math.floor(Math.random() * 5 + 1) * 24 * 60 * 60 * 1000
    ).toISOString(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    duration: "1 week",
    location:
      Object.values(Location)[
        Math.floor(Math.random() * Object.values(Location).length)
      ],
    status: "Open",
    completed: false,
    nextTask: tasks[0],
    keywords: ["keyword1", "keyword2"],
    hiredTradie: MOCK_USER,
    tasks,
    rating: Array.from({ length: 10 }, () => 5),
    avatar:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    badgeText: "New", // Add required property
    badgeColor: "blue", // Add required property
  })
);

export interface IUserData {
  name: string;
  id: number;
  tag: string;
  email: string;
  picture: string;
  city: string;
  type: string | null;
  login: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  is_online: boolean;
  username: string;
  phone: string;
  address: string;
  status: string | null;
  role: UserRole;
  notifications: [];
  messages: [];
}

export interface IServiceData {
  id: number;
  user_id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  images: string[];
  price_type: string;
  start_date: string;
  end_date: string;
  status: string;
  hired_tradie_id: number;
  location: string;
  completed: boolean;
  tasks: ITaskData[];
}
export interface IListingData {
  id: number;
  user_id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  images: string[];
  price_type: string;
  start_date: string;
  end_date: string;
  status: string;
  hired_tradie_id: number;
  location: string;
  completed: boolean;
  tasks: ITaskData[];
}

export interface IReviewData {
  id: number;
  user_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface ITaskData {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: string;
  date: string;
  category: string;
  color: string;
  images: string[];
  tradie_id: number;
  household_id: number;
  listing_id: number;
}

export interface IHouseholdData {
  id: number;
  userId: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  totalSpent: string;
  totalTradiesHired: number;
  averageTaskRating: string;
  typeOfHouse: null;
  isOwned: boolean;
  ownershipType: null;
  additionalInfo: null;
  listings: IListingData[];
  reviews: IReviewData[];
}

export interface ITradieData {
  id: number;
  userId: number;
  phoneNumber: string;
  address: string;
  bio: string;
  tradiePicture: string;
  experience: string;
  categories: string[];
  categoriesHired: string[];
  reviews: IReviewData[];
  listings: IListingData[];
  createdAt: string;
  updatedAt: string;
}

export const useGlobalContext = create(
  persist<{
    user: IUser | null;
    userData?: Partial<IUserData>;
    householdData?: Partial<IHouseholdData>;
    tradieData?: Partial<ITradieData>;
    setUser: (user: IUser | null) => void;
    readNotification: (id: number) => void;
    updateNotificationSettings: (
      setting: (typeof notificationSettings)[number],
      type: "email" | "push"
    ) => void;
    changeRole: (role: UserRole) => void;
    updatePrivacySettings: (setting: (typeof privacySettings)[number]) => void;
    fetchUserData: () => Promise<void>;
  }>(
    (set) => ({
      // user: MOCK_USER,
      user: null,
      setUser: (user: IUser | null) => set({ user }),
      readNotification: (id: number) =>
        set((state) =>
          !state.user
            ? state
            : {
                user: {
                  ...state.user,
                  notifications: state.user.notifications.map((notification) =>
                    notification.id === id && !notification.read
                      ? { ...notification, read: true }
                      : notification
                  ),
                },
              }
        ),
      updateNotificationSettings: (
        setting: (typeof notificationSettings)[number],
        type: "email" | "push"
      ) =>
        set((state) =>
          !state.user
            ? state
            : {
                user: {
                  ...state.user,
                  notificationSettings: state.user.notificationSettings.map(
                    (item) =>
                      item.title === setting.title
                        ? { ...item, [type]: !item[type] }
                        : item
                  ),
                },
              }
        ),
      updatePrivacySettings: (setting: (typeof privacySettings)[number]) =>
        set((state) =>
          !state.user
            ? state
            : {
                user: {
                  ...state.user,
                  privacySettings: state.user.privacySettings.map((item) =>
                    item.title === setting.title
                      ? { ...item, isActive: !item.isActive }
                      : item
                  ),
                },
              }
        ),
      changeRole: (role: UserRole) =>
        set((state) => ({ ...state, userData: { ...state.userData, role } })),

      fetchUserData: async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}api/user/data`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${getAccessToken()}`,
              },
            }
          );

          // const responseHousehold = await fetch(
          //   `${process.env.NEXT_PUBLIC_API_URL}api/household/9`,
          //   {
          //     method: "GET",
          //     headers: {
          //       Authorization: `Bearer ${getAccessToken()}`,
          //     },
          //   }
          // );

          // const responseTradie = await fetch(
          //   `${process.env.NEXT_PUBLIC_API_URL}api/tradie/4`,
          //   {
          //     method: "GET",
          //     headers: {
          //       Authorization: `Bearer ${getAccessToken()}`,
          //     },
          //   }
          // );

          // if (!response.ok || !responseHousehold.ok || !responseTradie.ok) {
          //   throw new Error("Failed to fetch user data");
          // }

          // const userData: IUserData = await response.json();
          // const householdData: IHouseholdData = await responseHousehold.json();
          // const tradieData: ITradieData = await responseTradie.json();

          // console.log({ userData, householdData, tradieData });
          // set({ userData, householdData, tradieData });
          const res = await response.json();
          set({ user: res.userData });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      },
    }),
    {
      name: "global-store", // Unique name for the persisted store
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null; // Properly parse the value
        },
        setItem: (name, value: any) => {
          localStorage.setItem(name, JSON.stringify(value)); // Serialize the value
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
      partialize: (state) => ({
        user: state.user,
        userData: undefined, // Mark other fields as undefined
        householdData: undefined,
        tradieData: undefined,
        setUser: () => {}, // Include all actions (even if they're empty functions)
        readNotification: () => {},
        updateNotificationSettings: () => {},
        changeRole: () => {},
        updatePrivacySettings: () => {},
        fetchUserData: async () => {},
      }),
    }
  )
);

// To avoid an infinite loop, we'll use a flag to prevent recursive calls
let isFetching = false;

useGlobalContext.subscribe((state) => {
  const currentRole = state.userData?.role;
  if (
    !isFetching &&
    currentRole !== useGlobalContext.getState().userData?.role
  ) {
    isFetching = true;
    useGlobalContext
      .getState()
      .fetchUserData()
      .finally(() => {
        isFetching = false;
      });
  }
});

// Fetch user data on initial load
// useGlobalContext.getState().fetchUserData();
