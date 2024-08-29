"use server";

import { auth, signIn, signOut } from "@/auth";
import { FormData } from "@/components/MultiStepForm/StepForms/PersonalInfoForm";
import { Answers } from "@/components/shared/Quiz";
import { FormattedStudent } from "@/context/zustand";
import cloudinary from "@/lib/cloudinary";
import prismadb from "@/lib/prisma";
import { ValidationError, extractPublicId, hashPassword } from "@/lib/utils";
import Registrar from "@/models/Registrar";
import Student from "@/models/Students";
import {
  AssessmentCourses,
  Assessments,
  Question,
  students,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function SignInSVA() {
  await signIn();
}
export async function SignOutSVA() {
  await signOut();
}

export const CHECKPHONE = async (phone: string) => {
  try {
    const existingPhone = await prismadb.students.findFirst({
      where: {
        phone,
      },
    });

    let error;

    if (existingPhone) {
      error = "Phone number already exists";
      return { error };
    }
    return {
      message: "Phone number is available",
    };
  } catch (error: any) {
    if (error instanceof ValidationError) {
      console.log(`Validation error: ${error.message}`);
      throw error; // Re-throw the validation error to be handled by the frontend
    } else {
      console.log(`Internal server error: ${error.message}`);
      throw new Error("Internal server error"); // Throw a generic error to avoid exposing internal details
    }
  }
};

export const CHECKMATRICNUMBER = async (matricNumber: string) => {
  try {
    const existingMatricNumber = await prismadb.students.findUnique({
      where: {
        matricNumber,
      },
    });
    console.log(existingMatricNumber);
    let error;
    if (existingMatricNumber) {
      error = "Matric number already exists";
      return { error };
    }
    return {
      message: "Matric number is available",
    };
  } catch (error: any) {
    console.log(`Internal server error: ${error.message}`);
    throw new Error("Internal server error"); // Throw a generic error to avoid exposing internal details
  }
};

export const SIGNUP = async (data: { username: string; password: string }) => {
  const { username, password } = data;
  try {
    if (!username || !password) {
      throw new ValidationError("Username and Password is required.");
    }

    const user = await prismadb.registrars.findUnique({
      where: {
        name: username,
      },
    });
    if (user) {
      throw new ValidationError("Username already exist.");
    }
    const hashedPassword = await hashPassword({ password });
    const newUser = await prismadb.registrars.create({
      data: {
        name: username,
        password: hashedPassword,
      },
    });
    return newUser;
  } catch (error: any) {
    if (error instanceof ValidationError) {
      console.log(`Validation error: ${error.message}`);
      throw error; // Re-throw the validation error to be handled by the frontend
    } else {
      console.log(`Internal server error: ${error.message}`);
      throw new Error("Internal server error"); // Throw a generic error to avoid exposing internal details
    }
  }
};

export const CHECKEXISTENCE = async (matricNumber: string) => {
  try {
    if (!matricNumber) {
      throw new ValidationError("Matric number must be provided.");
    }

    const existingStudent = await prismadb.students.findFirst({
      where: {
        matricNumber,
      },
    });
    if (existingStudent) {
      throw new ValidationError(
        "Student already exists with provided matric number."
      );
    }

    return {
      message: "Student does not exist",
    };
  } catch (error: any) {
    if (error instanceof ValidationError) {
      console.log(`Validation error: ${error.message}`);
      throw error;
    } else {
      console.log(`Internal server error: ${error.message}`);
      throw new Error("Internal server error");
    }
  }
};

export const CLOUDINARYUPLOAD = async (data: string) => {
  try {
    const result = await cloudinary.cloudinary.uploader.upload(
      data,
      { folder: "gst" },
      function (err, result) {
        if (err) {
          console.log(err);
        }
      }
    );
    if (result) {
      return { message: "Image uploaded", data: result };
    }
  } catch (error: any) {
    console.log("Error Uploading thro cloudinary => ", error);
    throw new ValidationError("Something went wrong");
  }
};

export const CLOUDINARYDELETE = async (data: string) => {
  try {
    const result = await cloudinary.cloudinary.uploader.destroy(data, {
      type: "upload",
      resource_type: "image",
    });
    if (result) {
      console.log(`${data} deleted from cloudinary...`);
      return { message: "Image deleted", data: result };
    }
  } catch (error: any) {
    console.log("Error Uploading thro cloudinary => ", error);
    throw new ValidationError("Something went wrong");
  }
};

export const CREATESTUDENT = async ({
  data,
  userId,
}: {
  data: students;
  userId: string;
}) => {
  try {
    // Check if matric number already exists
    const existingMatricNumber = await prismadb.students.findUnique({
      where: { matricNumber: data.matricNumber },
    });
    let error = "";
    // throw new ValidationError("Matric number already exists");
    if (existingMatricNumber) {
      error = "Matric number already exists";
      return {
        error,
      };
    }

    // Find registrar by userId
    const registrar = await prismadb.registrars.findUnique({
      where: { id: userId },
    });
    if (!registrar) {
      error = "Registrar user not found";
      return {
        error,
      };
    }

    // Create a new student
    const student = await prismadb.students.create({
      data: {
        ...data,
        fingerPrint: null,
        registrar: userId,
        email: data.email?.toLocaleLowerCase(),
      },
    });
    revalidatePath("/dashboard");
    return {
      student,
    };
  } catch (error: any) {
    if (error instanceof ValidationError) {
      console.log(`Validation error: ${error.message}`);
      throw error;
    } else {
      console.log(`Internal server error: ${error.message}`);
      throw new Error("Internal server error");
    }
  }
};

export const GETSTUDENTBYID = async (id: string) => {
  try {
    const student = await prismadb.students.findUnique({
      where: {
        id,
      },
    });
    return JSON.parse(JSON.stringify(student));
  } catch (error: any) {
    console.log("ERROR GETTING STUDENT ==> ", error);
    return null;
  }
};

export const GETSTUDENT = async (matricNumber: string) => {
  try {
    const session = await auth();

    const isAdmin = process.env.ADMIN_NAME === session?.user?.name;

    const student = isAdmin
      ? await prismadb.students.findUnique({
          where: { matricNumber },
          include: {
            registrarRel: true,
          },
        })
      : await prismadb.students.findUnique({
          where: { matricNumber },
        });
    let studentsCount;
    if (student?.registrar) {
      const registrar = await prismadb.students.findMany({
        where: {
          registrar: student.registrar,
        },
      });
      studentsCount = registrar.length;
    }

    const formattedStudent: FormattedStudent = {
      student,
      studentsCount,
    };

    return JSON.parse(JSON.stringify(formattedStudent));
  } catch (error) {
    console.error("Failed to fetch student data:", error);
    return null;
  }
};

export const DELETESTUDENT = async (matricNumber: string) => {
  try {
    const student = await prismadb.students.delete({
      where: { matricNumber },
    });
    const publicId = extractPublicId(student.image);
    const deletedImage = await CLOUDINARYDELETE(publicId as string);
    console.log("Image deleted => ", deletedImage?.message);
    revalidatePath("/dashboard");
  } catch (error: any) {
    console.log("Could not delete Student", error);
    throw error;
  }
};

export const UPDATESTUDENT = async ({
  id,
  updatedStudent,
}: {
  id: string;
  updatedStudent: Partial<students>;
}) => {
  try {
    const updated = await prismadb.students.update({
      where: { id },
      data: updatedStudent,
    });
    revalidatePath("/dashboard");
    return JSON.parse(JSON.stringify(updated));
  } catch (error: any) {
    console.log("Could not update Student", error);
    throw error;
  }
};

export const CREATEASSESSMENT = async (data1: Partial<Assessments>) => {
  try {
    // @ts-ignore
    const chm121Id = data1.chm121 ? "66cf8a72ace84cb73667f401" : null;
    // @ts-ignore
    delete data1.chm121;
    // @ts-ignore
    const chm128Id = data1.chm128 ? "66cf8c8eace84cb73667f403" : null;
    // @ts-ignore
    delete data1.chm128;
    // @ts-ignore
    const name = data1.assessmentname;
    // @ts-ignore
    delete data1.assessmentname;
    const formatted = {
      ...data1,
      name,
      children: {
        connect: [{ id: chm121Id }, { id: chm128Id }],
      },
    };
    const response = await prismadb.assessments.create({
      // @ts-ignore
      data: formatted,
    });
    revalidatePath("/dashboard/assessments/");
    console.log(response);
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    console.log("Could not update Student", error);
    throw error;
  }
};
export const CREATECOURSE = async (data: Partial<AssessmentCourses>) => {
  try {
    const course = await prismadb.assessmentCourses.create({
      data: {
        name: data.name as string,
      },
    });
    return JSON.parse(JSON.stringify(course));
  } catch (error: any) {
    console.log("Could not Create Course", error);
    throw error;
  }
};

export const GETALLASST = async () => {
  try {
    const assessments = await prismadb.assessments.findMany({
      include: {
        children: true,
      },
    });
    return JSON.parse(JSON.stringify(assessments));
  } catch (error: any) {
    console.log("Could not get all assessments", error);
    throw error;
  }
};
export const GETCOURSEANDPARTICIPANT = async (id: string) => {
  try {
    const course = await prismadb.assessmentCourses.findUnique({
      where: {
        id,
      },
      include: {
        participants: true,
      },
    });
    return course;
    // return JSON.parse(JSON.stringify(course));
  } catch (error: any) {
    console.log("Could not get all assessments", error);
    throw error;
  }
};

export const ADDTOSCHEDULE = async (
  sudentId: string,
  courseId: string,
  assessmentPassword: string
) => {
  try {
    const updateStudent = await prismadb.students.update({
      where: {
        id: sudentId,
      },
      data: {
        assessmentPassword,
      },
    });
    const courses = await prismadb.assessmentCourses.findFirst({
      where: {
        id:  courseId,

      },
      include: {
        participants: true
      }
    })

    const pIds = courses?.participants.map(value => ({id:  value.id}))
    // @ts-ignore
    const updatedList = [...pIds, {id: sudentId}]

    
    const data = await prismadb.assessmentCourses.update({
      where: {
        id: courseId,
      },
      data: {
        participants: {
          connect: updatedList.map(value => ({...value}))
        },
      },
    });
    revalidatePath("/dashboard/assessments/");
    return data;
  } catch (error: any) {
    console.log("Could not add to schedule", error);
    throw error;
  }
};

export const ADDQUESTIONTOCOURSE = async (
  question: Partial<Question>,
  courseId: string
) => {
  try {
    const res = await prismadb.question.create({
      data: {
        ...question,
        question: question.question as string,
        answer: question.answer as string,
        assessmentCoursesId: courseId,
      },
    });
    // update the assessment course
    const data = await prismadb.assessmentCourses.update({
      where: {
        id: courseId,
      },
      data: {
        Questions: {
          connect: {
            id: res.id,
          },
        },
      },
    });
    return res;
  } catch (error: any) {
    console.log("Could not add question to course", error);
    throw error;
  }
};

export const LOGINCANDIDATE = async (
  matricNumber: string,
  password: string
) => {
  try {
    const student = await prismadb.students.findUnique({
      where: {
        matricNumber,
      },
    });

    if (!student) {
      return {
        error: "No record found",
      };
    }

    const isPassValid = student.assessmentPassword === password;
    if (!isPassValid) {
      return {
        error: "Invalid credentials",
      };
    }

    const isStudentInAssessment = await prismadb.assessmentCourses.findFirst({
      where: {
        participants: {
          some: {
            id: student.id,
          },
        },
      },
    });

    if (!isStudentInAssessment) {
      return {
        error: "No assessment",
      };
    }

    await prismadb.students.update({
      where: {
        id: student.id,
      },
      data: {
        isLoggedin: true,
      },
    });

    return {
      student: student,
    };
  } catch (error: any) {
    console.log("Could not login candidate", error);
    throw error;
  }
};

export const CHECKLOGINSTATE = async (id: string) => {
  try {
    const state = await prismadb.students.findFirst({
      where: {
        id,
      },
      select: {
        isLoggedin: true,
      },
    });

    return state?.isLoggedin;
  } catch (error: any) {
    console.log("Could not check login state", error);
    throw error;
  }
};

export const GETSERVERQS = async (id: string) => {
  try {
   
    const  questions = await prismadb.assessmentCourses.findMany({
      where: {
        participants: {
          some: {
            id,
          }
        }
      },
      include: {
        Questions: true
      }
    })
    return questions;
  } catch (error: any) {
    console.log("Could not get server questions", error);
    throw  error;

  }
}
export const GETQUESTBYID = async (id: string, ptd:string) => {
  try {
  
    const  assessment = await prismadb.assessmentCourses.findFirst({
      where: {
        id,
        participants: {
          some: {
            id: ptd,
          }
        }
      },
      include: {
        Questions: true
      }
    })
    const randomizedQuestions = assessment?.Questions.sort(() => Math.random() - 0.5);

    return {
      ...assessment,
      Questions: randomizedQuestions
    };
  } catch (error: any) {
    console.log("Could not get server questions", error);
    throw  error;

  }
}

export const SUBMITTEST = async (answers: Answers, courseCode: string, studentId: string) => {
  try {
    const questions = await prismadb.question.findMany()
    let score = 0;

    questions.forEach((question) =>{
      // @ts-ignore
      const  answer = answers[question.id];
      if (answer === question.answer) {
        score += 1
      }
    })
    
    const chm121 = courseCode === "CHM 121"
    const chm128 = courseCode === "CHM 128"

    const  student = await prismadb.students.update({
      where: {
        id:  studentId
      },
      data: {
        score121: chm121 ? score : 0,
        score128: chm121 ? score : 0,
        isCHM121Done:chm121,
        isCHM128Done:chm128
      }
    })
    return student;
  } catch (error: any) {
    console.log("Could not submit test", error);
    throw error;
  }
}





// export  async function handler() {

//     try {
//       // Here, you'd process the answers, e.g., check correctness, calculate score
//       // Assuming you have a questions table in your database

//       const questions = await prismadb.questions.findMany();
//       let score = 0;

//       questions.forEach((question) => {
//         const userAnswer = answers[question.id];
//         if (userAnswer === question.correctAnswer) {
//           score += 1;
//         }
//       });

//       // Optionally, save the result in the database
//       await prismadb.results.create({
//         data: {
//           score,
//           // Other data like userId, quizId, etc.
//         },
//       });

//     } catch (error) {
//       console.error('Error processing quiz submission:', error);
//     }
// }
