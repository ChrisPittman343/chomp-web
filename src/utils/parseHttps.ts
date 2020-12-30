import { AxiosResponse } from "axios";
import { HTTPSCourseInfo, Roster, UserInfo } from "../types/httpsTypes";

export function parseCourseInfo(res: AxiosResponse<any>): HTTPSCourseInfo[] {
  const courses: HTTPSCourseInfo[] = [];
  res.data.courses.forEach((course: any) => {
    const courseInfo: HTTPSCourseInfo = {
      name: course.name,
      section: course.section,
      description: course.description,
      link: course.alternateLink,
    };
    courses.push(courseInfo);
  });
  return courses;
}

export function parseRoster(res: AxiosResponse<any>): Roster {
  const roster: Roster = { students: [], teachers: [] };
  return roster;
}

export function parseStudents(res: AxiosResponse<any>): UserInfo[] {
  const students: UserInfo[] = [];
  res.data.students.foreach((student: any) => {
    const studentInfo: UserInfo = {
      name: {
        givenName: student.name.givenName,
        familyName: student.name.familyName,
        fullName: student.name.fullName,
      },
      email: student.email,
      photoUrl: student.photoUrl,
    };
    students.push(studentInfo);
  });

  return students;
}
