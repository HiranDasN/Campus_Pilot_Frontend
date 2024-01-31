import React, { createContext, useState } from 'react'

  export const editTeacherResponseContext = createContext()

  export const editStudentResponseContext = createContext()

  export const editClassResponseContext = createContext()

  export const editInstituteResponseContext = createContext()

  export const editAdminLogResponseContext = createContext()

  export const isAuthTokenContext = createContext()

  export const isAdminDeletedContext = createContext()

  export const AdminDashboardShareContext = createContext()

  export const AdminHeaderContentContext = createContext()

  export const TeacherHeaderContentContext = createContext()

  export const isTeacherAuthTokenContext = createContext()

  export const tchrLogEditContext = createContext()

  export const StudentHeaderContentContext = createContext()

  export const isStudentAuthTokenContext = createContext()

  export const studLogEditContext = createContext()





function ContextShare({children}) {

    const [editTeacherResponse,setEditTeacherResponse] = useState({})
    const [editStudentResponse,setEditStudentResponse] = useState({})
    const [editClassResponse,setEditClassResponse] = useState({})
    const [editInstituteResponse,setEditInstituteResponse] = useState({})
    const [editAdminLogResponse,setEditAdminLogResponse] = useState({})
    const [isAuthToken,setIsAuthToken] = useState(true)
    const [newAdmissionDashboard,setNewAdmissionDashboard] = useState({})
    const [adminHeadercontent,setAdminHeaderContent] = useState(false)
    const [TeacherHeadercontent,setTeacherHeaderContent] = useState(false)
    const [isTeacherAuthToken,setIsteacherAuthToken] = useState(false)
    const [tchrLogEdit,setTchrLogEdit] = useState({})
    const [studentHeadercontent,setStudentHeaderContent] = useState(false)
    const [isStudentAuthToken,setIsStudentAuthToken] = useState(false)
    const [studLogEdit,setStudLogEdit] = useState({})






  



  return (
    <>
    <editTeacherResponseContext.Provider value={{editTeacherResponse,setEditTeacherResponse}}>
       <editStudentResponseContext.Provider value={{editStudentResponse,setEditStudentResponse}}> 
       <editClassResponseContext.Provider value={{editClassResponse,setEditClassResponse}}> 
          <editInstituteResponseContext.Provider value={{editInstituteResponse,setEditInstituteResponse}}>
            <editAdminLogResponseContext.Provider value={{editAdminLogResponse,setEditAdminLogResponse}}>
               <isAuthTokenContext.Provider value={{isAuthToken,setIsAuthToken}}>
                      <AdminDashboardShareContext.Provider value={{newAdmissionDashboard,setNewAdmissionDashboard}}> 
                       <AdminHeaderContentContext.Provider value={{adminHeadercontent,setAdminHeaderContent}}> 

                        <TeacherHeaderContentContext.Provider value={{TeacherHeadercontent,setTeacherHeaderContent}}>  
                        <isTeacherAuthTokenContext.Provider value={{isTeacherAuthToken,setIsteacherAuthToken}}>
                           <tchrLogEditContext.Provider value={{tchrLogEdit,setTchrLogEdit}}>
                             
                             
                              <StudentHeaderContentContext.Provider value={{studentHeadercontent,setStudentHeaderContent}}>
                               <isStudentAuthTokenContext.Provider value={{isStudentAuthToken,setIsStudentAuthToken}}>
                               <studLogEditContext.Provider value={{studLogEdit,setStudLogEdit}}>
                                 {children}
                                 </studLogEditContext.Provider>
                                </isStudentAuthTokenContext.Provider>
                              </StudentHeaderContentContext.Provider>                             
                              
                              
                              </tchrLogEditContext.Provider>
                          </isTeacherAuthTokenContext.Provider>
                        </TeacherHeaderContentContext.Provider>

                       </AdminHeaderContentContext.Provider>
                      </AdminDashboardShareContext.Provider>
               </isAuthTokenContext.Provider>
              </editAdminLogResponseContext.Provider>
          </editInstituteResponseContext.Provider>
        </editClassResponseContext.Provider>
       </editStudentResponseContext.Provider>
    </editTeacherResponseContext.Provider>
    
    </>
  )
}

export default ContextShare