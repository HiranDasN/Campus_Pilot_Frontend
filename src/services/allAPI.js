import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"

//registerAPI
export const registerAPI = async(admin)=>{
   return await commonAPI('POST',`${BASE_URL}/admin/register`,admin,"")
}

//loginAPI
export const loginAPI = async(admin)=>{
   return await commonAPI('POST',`${BASE_URL}/admin/login`,admin,"")
}

//registerTeacher
export const registerTeacherAPI = async(reqBody,reqHeader)=>{
   return await commonAPI('POST',`${BASE_URL}/teachers/register`,reqBody,reqHeader)
}

//getAllTeachers
export const allTeachersAPI = async(teacherSearchKey,reqHeader)=>{
   return await commonAPI('GET',`${BASE_URL}/teachers/all-teachers?search=${teacherSearchKey}`,'',reqHeader)
}

//addClass
export const registerClassAPI = async(reqBody,reqHeader)=>{
   return await commonAPI('POST',`${BASE_URL}/classes/add-classes`,reqBody,reqHeader)
}

//getAllClass
export const allClassesAPI = async(classSearchKey,reqHeader)=>{
   return await commonAPI('GET',`${BASE_URL}/classes/all-classes?searchclass=${classSearchKey}`,"",reqHeader)
}

//registerStudent
export const registerStudentAPI = async(reqBody,reqHeader)=>{
   return await commonAPI('POST',`${BASE_URL}/students/register`,reqBody,reqHeader)
}

//getAllStudents
export const allStudentsAPI = async(studentSearchKey,reqHeader)=>{
   return await commonAPI('GET',`${BASE_URL}/students/all-students?studentsearch=${studentSearchKey}`,'',reqHeader)
}

//edit Teacher
export const editTeacherAPI = async(teacherId,reqBody,reqHeader)=>{
  
   return await commonAPI('PUT',`${BASE_URL}/teachers/editTeacher/${teacherId}`,reqBody,reqHeader)
}

//edit Student
export const editStudentAPI = async(studentId,reqBody,reqHeader)=>{
  
   return await commonAPI('PUT',`${BASE_URL}/students/editStudent/${studentId}`,reqBody,reqHeader)
}

//edit Class
export const editClassAPI = async(classId,reqBody,reqHeader)=>{
  
   return await commonAPI('PUT',`${BASE_URL}/classes/editClass/${classId}`,reqBody,reqHeader)
}

// edit Institute Profile
export const updateProfileAPI = async(reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${BASE_URL}/admin/UpdateInstituteProf`,reqBody,reqHeader)
}

//edit admin login data
export const editAdminLoginAPI  = async(reqBody,reqHeader)=>{
  
   return await commonAPI('PUT',`${BASE_URL}/admin/UpdateAdminInfo`,reqBody,reqHeader)
}

// Delete Teachers
export const deleteTeacherAPI = async(teacherId,reqHeader)=>{
   return await commonAPI('DELETE',`${BASE_URL}/teachers/deleteTeacher/${teacherId}`,{},reqHeader)
}

// Delete Students
export const deleteStudentAPI = async(studentId,reqHeader)=>{
   return await commonAPI('DELETE',`${BASE_URL}/students/deleteStudent/${studentId}`,{},reqHeader)
}

// Delete Teachers
export const deleteClassAPI = async(classId,reqHeader)=>{
   return await commonAPI('DELETE',`${BASE_URL}/classes/deleteClass/${classId}`,{},reqHeader)
}

// Delete Admin Account
export const deleteAdminAPI = async(adminId,reqHeader)=>{
   return await commonAPI('DELETE',`${BASE_URL}/admin/deleteAdmin/${adminId}`,{},reqHeader)
}

//Teacher login API
export const TeacherLoginAPI = async(teachers)=>{
   return await commonAPI('POST',`${BASE_URL}/teacher/login`,teachers,"")
}


//get Admin detail
export const getAdminDetils = async(reqHeader)=>{
   return await commonAPI('GET',`${BASE_URL}/admin/all-admin`,'',reqHeader)
}

//edit teacher login info
export const editTeacherLoginAPI  = async(teacherId,reqBody,reqHeader)=>{
  
   return await commonAPI('PUT',`${BASE_URL}/teacher/UpdateTeacherInfo/${teacherId}`,reqBody,reqHeader)
}


//Student login API
export const StudentLoginAPI = async(students)=>{
   return await commonAPI('POST',`${BASE_URL}/student/login`,students,"")
}


//edit Student login info
export const editStdLoginAPI  = async(studentId,reqBody,reqHeader)=>{
   return await commonAPI('PUT',`${BASE_URL}/student/UpdateStudentInfo/${studentId}`,reqBody,reqHeader)
}