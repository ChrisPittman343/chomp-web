export interface HTTPSCourseInfo {
  name: string;
  section: string;
  description: string;
  link: string;
  roster?: Roster;
}

export interface UserInfo {
  name: {
    givenName: string;
    familyName: string;
    fullName: string;
  };
  email: string;
  photoUrl: string;
}

export interface Roster {
  teachers: UserInfo[];
  students: UserInfo[];
}
