import { getAssessments } from '@/actions/interview'
import QuizList from './_components/quiz-list'

export default async function InterviewPage () {
  const assessments = await getAssessments()

  return (
    <div>
      <h1 className='text-6xl font-bold gradient-title mb-5'>
        Interview Preparation
      </h1>
      <QuizList assessments={assessments} />
    </div>
  )
}
